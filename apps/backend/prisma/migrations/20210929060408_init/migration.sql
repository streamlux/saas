/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "TwitchAccount" (
    "id" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "accessTokenExpires" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Preferences" (
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "theme" TEXT NOT NULL,
    "userId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TwitchAccount_id_key" ON "TwitchAccount"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TwitchAccount_userId_key" ON "TwitchAccount"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Preferences_userId_key" ON "Preferences"("userId");

-- AddForeignKey
ALTER TABLE "TwitchAccount" ADD CONSTRAINT "TwitchAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preferences" ADD CONSTRAINT "Preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
