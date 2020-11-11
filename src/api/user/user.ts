import {
  Column,
  Entity,
  getRepository,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { InvalidPropertyError } from "../../helpers/errors";
import isValidEmail from "../../helpers/is-valid-email";
import {
  encrypt,
  generateActivationToken,
} from "../../helpers/passwords-helper";
import requiredParam from "../../helpers/required-param";
import { Restaurant } from "../restaurant/restaurant";
import { makeRestaurantDataAccessor } from "../restaurant/restaurant-data-access";
import { UserRoles } from "./user-roles";
import { makeUserRoleDataAccessor } from "./user-roles-data-access";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "first_name" })
  firstName: string;

  @Column({ name: "last_name" })
  lastName: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  created: Date;

  @Column({ name: "is_active" })
  isActive: string;

  @Column({ name: "activation_token" })
  activationToken: string;

  @ManyToOne(() => Restaurant)
  @JoinColumn({ name: "restaurants_id" })
  restaurant: Restaurant;

  @OneToOne(() => UserRoles)
  @JoinColumn({ name: "user_roles_id" })
  role: UserRoles;
}

export const makeUser = async (userInfo: any) => {
  const validUser = await validateUser(userInfo);
  return validUser;
};

const validateUser = async ({
  firstName = requiredParam("firstName"),
  lastName = requiredParam("lastName"),
  email = requiredParam("email"),
  phone = requiredParam("phone"),
  password = requiredParam("password"),
  restaurantId = requiredParam("restaurantId"),
}) => {
  validateName("First name", firstName);
  validateName("Last name", lastName);
  validateEmail(email);
  return getRepository(User).create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    password: await encrypt(password),
    created: new Date(),
    isActive: "N",
    activationToken: await generateActivationToken(),
    restaurant: await makeRestaurantDataAccessor().findOne(
      (restaurantId as unknown) as number
    ),
    role: await makeUserRoleDataAccessor().findOne("USER"),
  });
};

const validateName = (label: string, name: string) => {
  if (name.length < 2) {
    throw new InvalidPropertyError(
      `A contact's ${label} must be at least 2 characters long.`
    );
  }
};

function validateEmail(emailAddress: string) {
  if (!isValidEmail(emailAddress)) {
    throw new InvalidPropertyError("Invalid email address.");
  }
}
