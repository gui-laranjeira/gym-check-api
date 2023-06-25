import { IUsersRepository } from "@/repositories/interface/user-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateServiceRequestModel {
  email: string;
  password: string;
}

interface AuthenticateServiceResponseModel {
  user: User;
}

export class AuthenticateService {
  constructor(private userRepository: IUsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceRequestModel): Promise<AuthenticateServiceResponseModel> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
