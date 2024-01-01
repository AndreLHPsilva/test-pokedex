import { CreateController } from "@modules/Team/usecases/Create/CreateController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import express from "express";
import { AddPokemonController } from "@modules/Team/usecases/AddPokemon/AddPokemonController";
import { FindController } from "@modules/Team/usecases/Find/FindController";
import { FindByUserController } from "@modules/Team/usecases/FindByUser/FindByUserController";
import { RemovePokemonController } from "@modules/Team/usecases/RemovePokemon/RemovePokemonController";

export const teamRoutes = express.Router();
const authMiddleware = new AuthMiddleware();

const findController = new FindController();
const findByUserController = new FindByUserController();
const createController = new CreateController();
const addPokemonController = new AddPokemonController();
const removePokemonController = new RemovePokemonController();

teamRoutes.get("/by-auth", authMiddleware.auth, async (req, res) => {
  return await findByUserController.handle(req, res);
});

teamRoutes.get("/:team_id", authMiddleware.auth, async (req, res) => {
  return await findController.handle(req, res);
});

teamRoutes.post("/", authMiddleware.auth, async (req, res) => {
  return await createController.handle(req, res);
});

teamRoutes.post("/add-pokemon", authMiddleware.auth, async (req, res) => {
  return await addPokemonController.handle(req, res);
});

teamRoutes.delete("/:team_id/remove-pokemon/:pokemon_id", authMiddleware.auth, async (req, res) => {
  return await removePokemonController.handle(req, res);
});
