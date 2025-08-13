/*
  Warnings:

  - A unique constraint covering the columns `[name,location]` on the table `Base` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Base_name_location_key" ON "public"."Base"("name", "location");
