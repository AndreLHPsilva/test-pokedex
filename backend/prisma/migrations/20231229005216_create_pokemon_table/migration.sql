-- CreateTable
CREATE TABLE "pokemon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "external_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pokemon_external_id_key" ON "pokemon"("external_id");
