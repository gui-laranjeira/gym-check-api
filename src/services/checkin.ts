import { CheckIn } from "@prisma/client";
import { ICheckinsRepository } from "@/repositories/interface/checkins-repository";

interface CheckinServiceRequestModel {
  userId: string;
  gymId: string;
}

interface CheckinServiceResponseModel {
  checkIn: CheckIn;
}

export class CheckineService {
  constructor(private checkinRepository: ICheckinsRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckinServiceRequestModel): Promise<CheckinServiceResponseModel> {
    const checkIn = await this.checkinRepository.create({
      user_id: userId,
      gym_id: gymId,
    });
    return {
      checkIn,
    };
  }
}
