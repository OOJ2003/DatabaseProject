/*
  Warnings:

  - You are about to drop the column `inventory` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `sums` on the `Book` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Inventory" (
    "isbn" TEXT NOT NULL PRIMARY KEY,
    "sums" INTEGER NOT NULL DEFAULT 0,
    "rest" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Inventory_isbn_fkey" FOREIGN KEY ("isbn") REFERENCES "Book" ("isbn") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "isbn" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL DEFAULT 0,
    "views" INTEGER NOT NULL DEFAULT 0,
    "type" INTEGER NOT NULL,
    CONSTRAINT "Book_type_fkey" FOREIGN KEY ("type") REFERENCES "BookType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("author", "description", "isbn", "name", "price", "type", "views") SELECT "author", "description", "isbn", "name", "price", "type", "views" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE UNIQUE INDEX "Book_isbn_key" ON "Book"("isbn");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_isbn_key" ON "Inventory"("isbn");
