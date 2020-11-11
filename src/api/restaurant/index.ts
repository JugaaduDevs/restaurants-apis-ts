import { makeRestaurantDataAccessor } from "./restaurant-data-access";
import { makeRestaurantEndpointHandler } from "./restaurant-service";

const dataAccessor = makeRestaurantDataAccessor();
const restaurantEndpointHandler = makeRestaurantEndpointHandler(dataAccessor);

export default restaurantEndpointHandler;
