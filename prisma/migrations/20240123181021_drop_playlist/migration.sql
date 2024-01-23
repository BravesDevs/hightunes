/*
  Warnings:

  - You are about to drop the `Playlist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PlaylistToSong` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Playlist` DROP FOREIGN KEY `Playlist_userId_fkey`;

-- DropForeignKey
ALTER TABLE `_PlaylistToSong` DROP FOREIGN KEY `_PlaylistToSong_A_fkey`;

-- DropForeignKey
ALTER TABLE `_PlaylistToSong` DROP FOREIGN KEY `_PlaylistToSong_B_fkey`;

-- DropTable
DROP TABLE `Playlist`;

-- DropTable
DROP TABLE `_PlaylistToSong`;
