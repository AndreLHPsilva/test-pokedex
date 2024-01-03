/*
  Warnings:

  - You are about to drop the `TeamsOnPokemons` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TeamsOnPokemons" DROP CONSTRAINT "TeamsOnPokemons_pokemon_id_fkey";

-- DropForeignKey
ALTER TABLE "TeamsOnPokemons" DROP CONSTRAINT "TeamsOnPokemons_team_id_fkey";

-- DropTable
DROP TABLE "TeamsOnPokemons";

-- CreateTable
CREATE TABLE "teams_on_pokemons" (
    "id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "pokemon_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teams_on_pokemons_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "teams_on_pokemons" ADD CONSTRAINT "teams_on_pokemons_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams_on_pokemons" ADD CONSTRAINT "teams_on_pokemons_pokemon_id_fkey" FOREIGN KEY ("pokemon_id") REFERENCES "pokemons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
