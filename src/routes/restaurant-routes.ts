import { Router } from "express";
import restaurantEndpointHandler from "../api/restaurant";
import { adaptRequest } from "../helpers/http-adapaters";

const router = Router();

router.get("/:restaurantId", (req, res) => {
  const httpRequest = adaptRequest(req);
  restaurantEndpointHandler(httpRequest)
    .then(({ headers, statusCode, data }) => {
      res.set(headers).status(statusCode).send(data);
    })
    .catch((e) => res.send(500).send({ msg: "Something went wrong " + e }));
});

export { router as RestaurantRouter };
