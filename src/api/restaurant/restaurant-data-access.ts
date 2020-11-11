import { getRepository, Repository } from "typeorm";
import { Restaurant } from "./restaurant";

export const makeRestaurantDataAccessor = () => {
  const findOne = async (id: number) => {
    const restaurantRepository = getRepository(Restaurant);
    return restaurantRepository.findOne(id);
  };

  return Object.seal({
    findOne,
  });
};
