import { StreamableFile } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { createReadStream, createWriteStream } from 'fs';
import * as path from 'path';
const { Storage } = require('@google-cloud/storage');

export const generateId = (): number => {
  return Math.floor(Math.random() * Math.random()) + (Date.now() % 1000);
};

export const generatePasswordHash = (password: string): string => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS);
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};

export const getSongFromLocal = async (
  name: string | number,
): Promise<StreamableFile> => {
  try {
    const file = createReadStream(path.join(__dirname, `../../data/${name}`));
    return new StreamableFile(file);
  } catch (error) {
    throw error;
  }
};

export const setSongToLocal = async (
  name: number,
  file: Express.Multer.File,
): Promise<any> => {
  const filePath = path.join(__dirname, `../../data/${name}`);
  createWriteStream(filePath).write(file.buffer);
  return { name: file.originalname };
};

// export const uploadToCloudStorage = async (file: Express.Multer.File) => {
//   try {
//     const storage = new Storage({
//       keyFilename: path.join(__dirname, '../../key.json'),
//       projectId: process.env.PROJECT_ID,
//     });
//     const bucket = storage.bucket(process.env.BUCKET_NAME);
//     return new Promise((resolve, reject) => {
//       const blob = bucket.file(file.originalname);
//       const blobStream = blob.createWriteStream({
//         resumable: false,
//       });

//       blobStream.on('error', (err) => {
//         reject(err);
//       });

//       blobStream.on('finish', () => {
//         // The public URL can be used to directly access the file via HTTP.
//         const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
//         resolve({
//           data: {
//             name: file.originalname,
//             url: `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
//           },
//         });
//       });
//       blobStream.end(file.buffer);
//     });
//   } catch (error) {
//     throw error;
//   }
// };

// export const getSongFromCloudStorage = async (
//   name: string,
// ): Promise<StreamableFile> => {
//   try {
//     const storage = new Storage({
//       keyFilename: path.join(__dirname, '../../key.json'),
//       projectId: process.env.PROJECT_ID,
//     });
//     const bucket = storage.bucket(process.env.BUCKET_NAME);
//     const blob = bucket.file(name);
//     const blobStream = blob.createReadStream();
//     return new StreamableFile(blobStream);
//   } catch (error) {
//     throw error;
//   }
// };
