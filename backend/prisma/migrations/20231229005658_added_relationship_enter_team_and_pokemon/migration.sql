-- CreateTable
CREATE TABLE "TeamsOnPokemons" (
    "team_id" TEXT NOT NULL,
    "pokemon_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamsOnPokemons_pkey" PRIMARY KEY ("team_id","pokemon_id")
);

-- AddForeignKey
ALTER TABLE "TeamsOnPokemons" ADD CONSTRAINT "TeamsOnPokemons_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamsOnPokemons" ADD CONSTRAINT "TeamsOnPokemons_pokemon_id_fkey" FOREIGN KEY ("pokemon_id") REFERENCES "pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
