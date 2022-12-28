/*
  Warnings:

  - You are about to drop the column `credits` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "sex" TEXT,
    "email" TEXT NOT NULL,
    CONSTRAINT "User_id_fkey" FOREIGN KEY ("id") REFERENCES "Credit" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("email", "hash", "id", "sex", "type", "username") SELECT "email", "hash", "id", "sex", "type", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_Credit" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "credit" INTEGER NOT NULL DEFAULT 100
);
INSERT INTO "new_Credit" ("credit", "user_id") SELECT "credit", "user_id" FROM "Credit";
DROP TABLE "Credit";
ALTER TABLE "new_Credit" RENAME TO "Credit";
CREATE UNIQUE INDEX "Credit_user_id_key" ON "Credit"("user_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
