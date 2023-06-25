import { expect, describe, it, beforeEach } from "vitest";
import { RegisterService } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterService;

describe("Register Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    // sut system under test, pattern for naming the main test variable
    sut = new RegisterService(usersRepository);
  });

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "Albert Einstein",
      email: "alberteinstein@test.com",
      password: "12345678",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "Albert Einstein",
      email: "alberteinstein@test.com",
      password: "12345678",
    });

    const isPasswordHashed = await compare("12345678", user.password_hash);

    expect(isPasswordHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const email = "alberteinstein@test.com";

    await sut.execute({
      name: "Albert Einstein",
      email,
      password: "12345678",
    });

    await expect(() =>
      sut.execute({
        name: "Albert Einstein",
        email,
        password: "12345678",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
