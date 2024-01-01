import { GetController } from "@modules/Pokemon/usecases/Get/GetController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

import express from "express";
import { FindController } from "@modules/Pokemon/usecases/Find/FindController";
import { FindByTypeController } from "@modules/Pokemon/usecases/FindByType/FindByTypeController";
import { GetTypesController } from "@modules/Pokemon/usecases/GetTypes/GetTypesController";

export const pokemonRoutes = express.Router();
const authMiddleware = new AuthMiddleware();

const getController = new GetController();
const getTypesController = new GetTypesController();
const findController = new FindController();
const findByTypeController = new FindByTypeController();

pokemonRoutes.get("/", authMiddleware.auth, async (req, res) => {
  return await getController.handle(req, res);
});

pokemonRoutes.get("/types", authMiddleware.auth, async (req, res) => {
  return await getTypesController.handle(req, res);
});

pokemonRoutes.get("/find/:search", authMiddleware.auth, async (req, res) => {
  return await findController.handle(req, res);
});

pokemonRoutes.get("/:type/type", authMiddleware.auth, async (req, res) => {
  return await findByTypeController.handle(req, res);
});
