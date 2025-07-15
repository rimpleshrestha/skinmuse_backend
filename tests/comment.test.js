const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const Post = require("../model/post.model");
const Comment = require("../model/comment.model");
const { encryptPassword } = require("../utils/bcrypt");
const app = require("../index");

let token;
let userId;
let postId;
let commentId;

beforeAll(async () => {
  await mongoose.connect(
    process.env.MONGO_URL || "mongodb://localhost:27017/skinmuse_test"
  );
  await User.deleteMany({});
  await Post.deleteMany({});
  await Comment.deleteMany({});

  const hashedPass = await encryptPassword("testpass123");
  const user = await User.create({
    email: "testuser@example.com",
    password: hashedPass,
  });
  userId = user._id;
  token = jwt.sign({ id: userId }, process.env.JWT_SECRET || "secret");

  // Create a post to comment on
  const post = await Post.create({
    title: "Test Post",
    description: "Test description",
    image: "test-image.jpg",
    skin_type: "oily",
    user: userId,
  });
  postId = post._id;
});

afterAll(async () => {
  await User.deleteMany({});
  await Post.deleteMany({});
  await Comment.deleteMany({});
  await mongoose.connection.close();
});

describe("Comment Controller Tests", () => {
  it("should create a comment for a post", async () => {
    const res = await request(app)
      .post(`/api/comments/${postId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ comment: "This is a test comment" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.comment).toBe("This is a test comment");
    commentId = res.body._id;
  });

  it("should get all comments for the authenticated user", async () => {
    const res = await request(app)
      .get("/api/comments")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should get a comment by ID", async () => {
    const res = await request(app)
      .get(`/api/comments/${commentId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id", commentId);
  });

  it("should update a comment by ID", async () => {
    const res = await request(app)
      .put(`/api/comments/${commentId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ comment: "Updated comment" });
    expect(res.statusCode).toBe(200);
    expect(res.body.comment).toBe("Updated comment");
  });

  it("should delete a comment by ID", async () => {
    const res = await request(app)
      .delete(`/api/comments/${commentId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Comment deleted successfully");
  });
});
