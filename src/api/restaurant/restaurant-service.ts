import { HttpRequest } from "../../helpers/http-adapaters";
import makeHttpError, { HttpError } from "../../helpers/http-error";
import makeHttpSuccesss, { HttpSuccess } from "../../helpers/http-success";

export const makeRestaurantEndpointHandler = (dataAccessor: any) => {
  const getRestaurant = async (httpRequest: HttpRequest) => {
    const { pathParams } = httpRequest;
    if (!pathParams) makeHttpError(400, "Please provide restaurant ID");
    try {
      const restaurant = await dataAccessor.findOne(pathParams["restaurantId"]);
      return makeHttpSuccesss(200, restaurant);
    } catch (err) {
      return makeHttpError(500, "Something went wrong. " + err);
    }
  };

  return async function handle(httpRequest: HttpRequest) {
    switch (httpRequest.method) {
      case "GET":
        return await getRestaurant(httpRequest);
      default:
        return makeHttpError(405, "The provided endpoint is not allowed");
    }
  };
};
