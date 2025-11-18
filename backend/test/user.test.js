const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/userModel");

beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/jest-testing");
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

beforeEach(async () => {
  await User.deleteMany({});
});

describe("User CRUD API", () => {

  test("Create a new user list (POST /api/user)", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({
        first_name: "Nikhil",
        last_name: "Kumar",
        email: "nikhil@test.com",
        gender: "male"
      });

    expect(res.status).toBe(201);
    expect(res.body.first_name).toBe("Nikhil");
  });

  test("Get all users (GET /api/user)", async () => {
    await User.create({
      first_name: "Sam",
      last_name: "Roy",
      email: "sam@test.com",
      gender: "male"
    });

    const res = await request(app).get("/api/users");

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  

   test("Update user (PATCH /api/users/:id)", async () => {
    const user = await User.create({
      first_name: "Amit",
      last_name: "Singh",
      email: "amit@test.com",
      gender: "male"
    });

    const res = await request(app)
      .patch(`/api/users/${user._id}`)
      .send({ gender: "female" });

    expect(res.status).toBe(200);
    expect(res.body.gender).toBe("female");
  });

  test("Delete user (DELETE /api/user/:id)", async () => {
    const user = await User.create({
      first_name: "Mark",
      last_name: "Paul",
      email: "mark@test.com",
      gender: "male"
    });

    const res = await request(app).delete(`/api/users/${user._id}`);

    expect(res.status).toBe(200);

    const check = await User.findById(user._id);
    expect(check).toBeNull();
  });

});
