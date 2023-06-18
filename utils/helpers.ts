import * as bcrypt from 'bcrypt';

export const generateId = (): number => {
  return Date.now() + Math.random()
};

export const generatePasswordHash = (password: string): string => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS);
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};
