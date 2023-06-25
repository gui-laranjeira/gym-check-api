import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryCheckinsRepository } from "@/repositories/in-memory/in-memory-checkins-repository";
import { CheckineService } from "./checkin";

let checkInRepository: InMemoryCheckinsRepository;
let sut: CheckineService;

describe("Check In Service", () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckinsRepository();
    // sut system under test, pattern for naming the main test variable
    sut = new CheckineService(checkInRepository);
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
