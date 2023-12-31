import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { RegisterService } from "../register";

export function makeRegisterService() {
  const usersRepository = new PrismaUsersRepository();
  const registerService = new RegisterService(usersRepository);

  return registerService;
}
