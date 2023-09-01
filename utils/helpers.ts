import * as bcrypt from 'bcrypt';
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

export const uploadToCloudStorage = async (file: Express.Multer.File) => {
  try {
    const storage = new Storage({
      keyFilename: path.join(__dirname, '../../key.json'),
      projectId: process.env.PROJECT_ID,
    });
    const bucket = storage.bucket(process.env.BUCKET_NAME);
    return new Promise((resolve, reject) => {
      const blob = bucket.file(file.originalname);
      const blobStream = blob.createWriteStream({
        resumable: false,
      });

      blobStream.on('error', (err) => {
        reject(err);
      });

      blobStream.on('finish', () => {
        // The public URL can be used to directly access the file via HTTP.
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve({
          data: {
            name: file.originalname,
            url: `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
          },
        });
      });
      blobStream.end(file.buffer);
    });
  } catch (error) {
    throw error;
  }
};
