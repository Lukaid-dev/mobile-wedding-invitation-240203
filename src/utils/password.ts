import CryptoJS, { SHA256, enc } from 'crypto-js';

const hashPassword = (password: string, salt: string): string => {
  const hashedPassword = SHA256(password + salt).toString(enc.Hex);
  return hashedPassword;
};

const generatePassword = (
  password: string,
): { hashedPassword: string; salt: string } => {
  const salt = CryptoJS.lib.WordArray.random(128 / 8).toString(enc.Hex);
  const hashedPassword = hashPassword(password, salt);
  return { hashedPassword, salt };
};

const checkPassword = (
  password: string,
  salt: string,
  hashedPassword: string,
): boolean => {
  const hashedPasswordToCheck = hashPassword(password, salt);
  return hashedPasswordToCheck === hashedPassword;
};

export { generatePassword, checkPassword };
