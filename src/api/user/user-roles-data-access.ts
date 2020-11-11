import { stringify } from "querystring";
import { getRepository, Repository } from "typeorm";
import { UserRoles } from "./user-roles";

export const makeUserRoleDataAccessor = () => {
  return Object.seal({
    findOne,
  });

  async function findOne(name: string) {
    const rolesRespository = getRepository(UserRoles);
    return await rolesRespository.findOne({ name: name.toUpperCase() });
  }
};
