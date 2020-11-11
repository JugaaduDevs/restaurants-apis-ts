import { createConnection, Connection } from "typeorm";
import { Restaurant } from "../api/restaurant/restaurant";
import { User } from "../api/user/user";
import { UserRoles } from "../api/user/user-roles";

export const connectToDb = async () => {
  const connection = await createConnection({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "password",
    database: "restaurants",
    entities: [Restaurant, User, UserRoles],
  });
};
