import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { GuestBookEntry, GBReturnCode } from './types';
import { db } from './firebase';

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
  const guestbookCollection = collection(db, 'GuestBook');
  const querySnapshot = await getDocs(guestbookCollection);
  const entries = querySnapshot.docs
    .filter((doc) => !doc.data().deletedAt)
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

  const guestbookCollection = collection(db, 'GuestBook');
  const res = await addDoc(guestbookCollection, entryWithHashedPassword);
  if (res) {
    return GBReturnCode.Success;
  } else {
    return GBReturnCode.NetworkError;
  }
};

export const deleteGuestBookEntry = async (
  id: string,
  pw: string,
): Promise<GBReturnCode> => {
  if (!id) {
    return GBReturnCode.IdEmpty;
  }

  if (!pw) {
    return GBReturnCode.PwEmpty;
  }

  if (pw.trim().length !== 4) {
    return GBReturnCode.PwInvalid;
  }

  const guestbookCollection = collection(db, 'GuestBook');
  const querySnapshot = await getDocs(guestbookCollection);
  const entries = querySnapshot.docs
    .map((doc) => doc.data() as GuestBookEntry)
    .filter((entry) => entry.salt === id);

  if (entries.length === 0) {
    return GBReturnCode.IdNotFound;
  }

  const entry = entries[0];

  if (!entry.pw || !entry.salt) {
    return GBReturnCode.PwInvalid;
  }

  const isPasswordCorrect = checkPassword(pw, entry.salt, entry.pw);

  if (!isPasswordCorrect) {
    return GBReturnCode.PwInvalid;
  }

  // soft delete
  // await setDoc(doc(db, 'GuestBook', entry.salt), {
  //   ...entry,
  //   deletedAt: new Date().toISOString(),
  // });

  const ref = doc(db, 'GuestBook', entry.salt);

  console.log(ref.firestore.toJSON);

  await deleteDoc(ref);

  // await updateDoc(doc(db, 'GuestBook', entry.salt), {
  //   deletedAt: new Date().toISOString(),
  // });

  return GBReturnCode.Success;
};
