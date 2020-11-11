import { QueryFailedError } from "typeorm";
import {
  InvalidPropertyError,
  RequiredParameterError,
  UniqueConstraintError,
} from "../../helpers/errors";
import { HttpRequest } from "../../helpers/http-adapaters";
import makeHttpError from "../../helpers/http-error";
import makeHttpSuccess from "../../helpers/http-success";
import { makeUser } from "./user";
import { compareEncryptedPasswords } from "../../helpers/passwords-helper";

export const makeUserHandler = (dataAccessor: any) => {
  return async function handle(httpRequest: HttpRequest) {
    const { method, path } = httpRequest;
    switch (method) {
      case "POST":
        return await postUser(httpRequest);
      case "GET":
        if (path.startsWith("/activate")) return await activate(httpRequest);
      default:
        return makeHttpError(405, "HTTP method not allowed");
    }
  };

  async function postUser(httpRequest: HttpRequest) {
    let userInfo: any = httpRequest.body;
    if (!userInfo) return makeHttpError(400, "Bad request. No POST body.");
    if (typeof userInfo === "string") {
      try {
        userInfo = JSON.parse(userInfo);
      } catch {
        return makeHttpError(405, "Bad request. POST body must be valid JSON.");
      }
    }

    try {
      const user = await makeUser(userInfo);
      const savedUser = await dataAccessor.add(user);
      return makeHttpSuccess(201, savedUser, [
        "id",
        "firstName",
        "lastName",
        "phone",
        "email",
        "isActive",
      ]);
    } catch (err) {
      console.log(err);
      const statusCode =
        err instanceof UniqueConstraintError ||
        (err instanceof QueryFailedError && (err as any).code == "ER_DUP_ENTRY")
          ? 409
          : err instanceof InvalidPropertyError ||
            err instanceof RequiredParameterError
          ? 400
          : 500;
      return makeHttpError(statusCode, err.message);
    }
  }

  async function activate(httpRequest: HttpRequest) {
    const { pathParams } = httpRequest;
    const userId = pathParams["userId"];
    const activationToken = pathParams["activationToken"];
    try {
      const user = await dataAccessor.findOne(userId);
      if (!user) {
        throw new InvalidPropertyError(
          "User not found. Please check the provided userId"
        );
      }
      if (activationToken === user.activationToken) {
        user.activationToken = null;
        user.isActive = "Y";
        dataAccessor.add(user);
      } else {
        throw new InvalidPropertyError("Invalid activation token");
      }
      return makeHttpSuccess(200, "User activated successfully", [], {
        Authorization: "The JWT token",
      });
    } catch (err) {
      const statusCode = err instanceof InvalidPropertyError ? 400 : 500;
      return makeHttpError(statusCode, err.message);
    }
  }

  async function login(httpRequest: HttpRequest) {
    let loginInfo: any = httpRequest.body;
    try {
      if (!loginInfo) throw new InvalidPropertyError("Missing body");
      if (typeof loginInfo === "string") {
        try {
          loginInfo = JSON.parse(loginInfo);
        } catch {
          return makeHttpError(
            405,
            "Bad request. POST body must be valid JSON."
          );
        }
      }
      if (!loginInfo.email) return makeHttpError(400, "Please send email ID");
      if (!loginInfo.password)
        return makeHttpError(400, "Please send password for login");
      const user = await dataAccessor.findByEmail(loginInfo.email);
      if (!user) return makeHttpError(401, "Provide user does not exist");
      if (await compareEncryptedPasswords(loginInfo.password, user.password)) {
        return makeHttpSuccess(200, "Login Successful");
      }
      return makeHttpError(401, "Unauthorized");
    } catch (err) {
      return makeHttpError(500, "Something went wrong");
    }
  }

  async function updateUser(httpRequest: HttpRequest) {}

  async function logout(httpRequest: HttpRequest) {}
};
