import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { GuestBookEntry, GuestBookEntryWithSalt, GBReturnCode } from './types';

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

export const getGuestBookEntries = async (): Promise<GuestBookEntry[]> => {
  const db = getFirestore();
  const guestbookCollection = collection(db, 'GuestBook');
  const querySnapshot = await getDocs(guestbookCollection);
  const entries = querySnapshot.docs.map((doc) => doc.data() as GuestBookEntry);
  return entries;
};

export const postGuestBookEntry = async (
  entry: GuestBookEntry,
): Promise<GBReturnCode> => {
  if (!entry.name) {
    return GBReturnCode.NameEmpty;
  }

  if (!entry.pw) {
    return GBReturnCode.PwEmpty;
  }

  if (!entry.text) {
    return GBReturnCode.TextEmpty;
  }

  if (entry.pw.length < 4) {
    return GBReturnCode.PwInvalid;
  }

  const { hashedPassword, salt } = generatePassword(entry.pw);

  const entryWithHashedPassword: GuestBookEntryWithSalt = {
    ...entry,
    pw: hashedPassword,
    salt,
  };

  const db = getFirestore();
  const guestbookCollection = collection(db, 'GuestBook');
  const res = await addDoc(guestbookCollection, entryWithHashedPassword);
  if (res) {
    return GBReturnCode.Success;
  } else {
    return GBReturnCode.NetworkError;
  }
};
