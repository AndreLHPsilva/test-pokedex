import { IUserRepository } from "@database/repositories/IUserRepository";


import { UserPrismaRepository } from "@database/repositories/prisma/UserPrismaRepository";
import { container } from "tsyringe";
import { PokemonExternalRepository } from "@database/repositories/externalApi/PokemonExternalRepository";
import { IPokemonExternalApiRepository } from "@database/repositories/IPokemonExternalApiRepository";
import { IPokemonRepository } from "@database/repositories/IPokemonRepository";
import { PokemonPrismaRepository } from "@database/repositories/prisma/PokemonPrismaRepository";
import { ITeamsOnPokemonsRepository } from "@database/repositories/ITeamsOnPokemonsRepository";
import { TeamsOnPokemonsPrismaRepository } from "@database/repositories/prisma/TeamsOnPokemonsPrismaRepository";
import { ITeamRepository } from "@database/repositories/ITeamRepository";
import { TeamPrismaRepository } from "@database/repositories/prisma/TeamPrismaRepository";

container.registerSingleton<IUserRepository>(
  "UserRepository",
  UserPrismaRepository
);

container.registerSingleton<IPokemonExternalApiRepository>(
  "PokemonExternalRepository",
  PokemonExternalRepository
);

container.registerSingleton<IPokemonRepository>(
  "PokemonRepository",
  PokemonPrismaRepository
);

container.registerSingleton<ITeamRepository>(
  "TeamRepository",
  TeamPrismaRepository
);

container.registerSingleton<ITeamsOnPokemonsRepository>(
  "TeamsOnPokemonsRepository",
  TeamsOnPokemonsPrismaRepository
);

