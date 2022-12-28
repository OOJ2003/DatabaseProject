-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "rate" INTEGER NOT NULL,
    "delete" BOOLEAN NOT NULL DEFAULT false,
    "isbn" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Post_isbn_fkey" FOREIGN KEY ("isbn") REFERENCES "Book" ("isbn") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("content", "delete", "id", "isbn", "rate", "user_id") SELECT "content", "delete", "id", "isbn", "rate", "user_id" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE UNIQUE INDEX "Post_id_key" ON "Post"("id");
CREATE TABLE "new_BookLib" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "location" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "BookLib_isbn_fkey" FOREIGN KEY ("isbn") REFERENCES "Book" ("isbn") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BookLib" ("id", "isbn", "location", "status") SELECT "id", "isbn", "location", "status" FROM "BookLib";
DROP TABLE "BookLib";
ALTER TABLE "new_BookLib" RENAME TO "BookLib";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
