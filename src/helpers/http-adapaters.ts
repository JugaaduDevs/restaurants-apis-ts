import { Request } from "express";

export interface HttpRequest {
  path: string;
  method: String;
  pathParams?: any;
  queryParams?: any;
  body?: [key: String];
}

export const adaptRequest = (req: Request) => {
  return Object.seal<HttpRequest>({
    path: req.path,
    method: req.method,
    pathParams: req.params,
    queryParams: req.query,
    body: req.body,
  });
};
