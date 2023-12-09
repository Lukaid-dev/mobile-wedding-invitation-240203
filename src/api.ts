import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { GuestBookEntry, GBReturnCode } from './types';

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  const entries = querySnapshot.docs
    .map((doc) => doc.data() as GuestBookEntry)
    .sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return b.createdAt.localeCompare(a.createdAt);
      } else {
        return 0;
      }
    });
  // sort by createdAt
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

  if (entry.pw.trim().length !== 4) {
    return GBReturnCode.PwInvalid;
  }

  if (!entry.text) {
    return GBReturnCode.TextEmpty;
  }

  const { hashedPassword, salt } = generatePassword(entry.pw);

  const entryWithHashedPassword: GuestBookEntry = {
    ...entry,
    pw: hashedPassword,
    salt,
    createdAt: new Date().toISOString(),
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
