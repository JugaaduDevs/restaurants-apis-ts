import { Request, Response, Router } from "express";
import userEndpointHandler from "../api/user";
import { adaptRequest } from "../helpers/http-adapaters";

const router = Router();

router.post("/register", controller);
router.get("/activate/:userId/:activationToken", controller);

function controller(req: Request, res: Response) {
  const httpRequest = adaptRequest(req);
  userEndpointHandler(httpRequest)
    .then(({ headers, statusCode, data }) => {
      res.set(headers).status(statusCode).send(data);
    })
    .catch((e) => res.send(500).send({ msg: "Something went wrong " + e }));
}

export { router as UserRouter };
