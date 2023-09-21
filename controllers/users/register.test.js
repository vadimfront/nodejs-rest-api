const { default: mongoose } = require("mongoose");
const request = require("supertest");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const { modelUser } = require("../../models");
const app = require("../../app");
require("dotenv").config();

const fakeUserData = {
  name: "bb",
  email: "bb@gmail.com",
  password: "123456",
};

const { DB_HOST } = process.env;

beforeAll(async () => {
  await mongoose.connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Registeration Controller", () => {
  it("should return status code 201 if registration is successful, or 409 if email already exists", async () => {
    const fakeUser = {
      ...fakeUserData,
      subscription: "free",
    };
    const createUserSpy = jest
      .spyOn(modelUser.User, "create")
      .mockResolvedValue(fakeUser);
    const bcryptHashSpy = jest
      .spyOn(bcrypt, "hash")
      .mockResolvedValue("hashedPassword");
    const gravatarUrlSpy = jest
      .spyOn(gravatar, "url")
      .mockReturnValue("fakeAvatarUrl");

    const response = await request(app).post("/api/auth/register").send({
      name: fakeUserData.name,
      email: fakeUserData.email,
      password: fakeUserData.password,
    });
    console.log(response.status);

    if (response.status === 201) {
      expect(response.status).toBe(201);
      expect(typeof response.body.email).toBe("string");
      expect(typeof response.body.subscription).toBe("string");

      expect(createUserSpy).toHaveBeenCalledWith({
        ...fakeUserData,
        password: "hashedPassword",
        avatarURL: "fakeAvatarUrl",
      });
      expect(bcryptHashSpy).toHaveBeenCalledWith(fakeUserData.password, 10);
      expect(gravatarUrlSpy).toHaveBeenCalledWith(fakeUserData.email);
    } else if (response.status === 409) {
      expect(response.status).toBe(409);
      expect(response.body.message).toMatch("Email already exist");
    } else {
      throw new Error("Unexpected response status: " + response.status);
    }
  }, 10000);
});
