import express from "express";
import dotEnv from "dotenv";
import config from "config";
import "reflect-metadata";
import { connectToDb } from "./helpers/db";
import { RestaurantRouter } from "./routes/restaurant-routes";
import { UserRouter } from "./routes/user-routes";

dotEnv.config();
const PORT = process.env.PORT || config.get("serverPort") || 5000;
const app = express();

addMiddlewares();

connectToDb()
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.log("Could not connect to database " + err));

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));

function addMiddlewares() {
  app.use(express.json());
  app.use("/api/restaurant", RestaurantRouter);
  app.use("/api/user", UserRouter);
}
