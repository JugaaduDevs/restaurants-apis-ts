import { RequiredParameterError } from "./errors";

export default function requiredParam(param: string) {
  if (param) return param;
  throw new RequiredParameterError(param);
}
