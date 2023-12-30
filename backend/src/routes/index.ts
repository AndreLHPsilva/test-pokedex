import express from "express";
import { userRoutes } from "./user.routes";
import { pokemonRoutes } from "./pokemon.routes";
import { teamRoutes } from "./team.routes";

export const routes = express.Router();

routes.use("/users", userRoutes);
routes.use("/pokemons", pokemonRoutes);
routes.use("/teams", teamRoutes);