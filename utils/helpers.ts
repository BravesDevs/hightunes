import * as bcrypt from 'bcrypt';

export const generateId = (): number => {
  return Math.floor(Math.random() * 100000);
};

export const generatePasswordHash = (password: string): string => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS);
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};
