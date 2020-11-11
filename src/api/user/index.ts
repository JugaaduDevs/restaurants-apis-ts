import { makeUserDataAccessor } from "./user-data-access";
import { makeUserHandler } from "./user-service";

const dataAccessor = makeUserDataAccessor();
const userEndpointHandler = makeUserHandler(dataAccessor);

export default userEndpointHandler;
