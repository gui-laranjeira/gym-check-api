import { IUsersRepository } from "@/repositories/interface/user-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { User } from "@prisma/client";

interface RegisterServiceRequestModel {
  name: string;
  email: string;
  password: string;
}

interface RegisterServiceResponseModel {
  user: User;
}

export class RegisterService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterServiceRequestModel): Promise<RegisterServiceResponseModel> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    // catch this in the controller
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return {
      user,
    };
  }
}
