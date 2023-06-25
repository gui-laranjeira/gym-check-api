import { IUsersRepository } from "@/repositories/interface/user-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserProfileServiceRequestModel {
  userId: string;
}

interface GetUserProfileServiceResponseModel {
  user: User;
}

export class GetUserProfileService {
  constructor(private userRepository: IUsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileServiceRequestModel): Promise<GetUserProfileServiceResponseModel> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }
}
