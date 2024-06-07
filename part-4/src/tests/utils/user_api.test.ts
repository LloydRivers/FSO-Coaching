import bcrypt from "bcrypt";
import { User } from "../../models/user";
import supertest from "supertest";
import app from "../../app";
const api = supertest(app);

beforeEach(async () => {
  // We have to clear the database before each test, otherwise the tests will fail saying we already have a user with the username "root"
  // The issue is, since the blogs are connected to the user, we can't delete the user without deleting the blogs. So you see the tests are tightly coupled.
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", passwordHash });

  await user.save();
});

test("creation succeeds with a fresh username", async () => {
  const usersAtStart = await User.find({});

  const newUser = {
    username: "jriddle",
    name: "John Riddle",
    password: "password",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await User.find({});
  expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
  expect(usersAtEnd.map((u) => u.username)).toContain(newUser.username);
});

test("creation fails with proper statuscode and message if username already taken", async () => {
  const usersAtStart = await User.find({});

  const newUser = {
    username: "root",
    name: "Superuser",
    password: "password",
  };

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  expect(result.body.message).toMatch(/duplicate key error/);

  const usersAtEnd = await User.find({});
  expect(usersAtEnd).toHaveLength(usersAtStart.length);
});

test("returns all users", async () => {
  const response = await api.get("/api/users");

  expect(response.body).toHaveLength(1);
  expect(response.body[0].username).toBe;
});
