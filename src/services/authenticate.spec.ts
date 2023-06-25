import { expect, describe, it, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateService } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateService;

describe("Authenticate Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    // sut system under test, pattern for naming the main test variable
    sut = new AuthenticateService(usersRepository);
  });

  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "",
      email: "alberteinstein@test.com",
      password_hash: await hash("12345678", 6),
    });
    const { user } = await sut.execute({
      email: "alberteinstein@test.com",
      password: "12345678",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "wrongemail@test.com",
        password: "12345678",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await expect(() =>
      sut.execute({
        email: "alberteinstein@test.com",
        password: "wrong",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
