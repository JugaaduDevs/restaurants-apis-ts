import * as bcrypt from "bcryptjs";
import { InvalidPropertyError } from "./errors";
import * as crypto from "crypto";

export const encrypt = async (plainText: string) => {
  try {
    return await bcrypt.hash(plainText, 10);
  } catch (err) {
    throw new InvalidPropertyError("Password encryption failed");
  }
};

export const generateActivationToken = async () => {
  const buffer = await crypto.randomBytes(20);
  return buffer.toString("hex");
};

export const compareEncryptedPasswords = async (
  plainTextPassword: string,
  encryptedPassword: string
) => {
  return await bcrypt.compare(plainTextPassword, encryptedPassword);
};
