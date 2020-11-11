import { userInfo } from "os";
import { getRepository, Repository } from "typeorm";
import { User } from "./user";

export const makeUserDataAccessor = () => {
  return Object.seal({
    findOne,
    add,
    findByEmail,
  });

  async function findOne(id: number) {
    const userRepository = getRepository(User);
    return await userRepository.findOne(id);
  }

  async function add(user: User) {
    const userRepository = getRepository(User);
    return await userRepository.save(user);
  }

  async function findByEmail(email: string) {
    const userRepository = getRepository(User);
    return await userRepository.findOne({ email });
  }
};
