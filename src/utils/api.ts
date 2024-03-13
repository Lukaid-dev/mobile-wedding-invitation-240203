import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import { GuestBookEntry, GBReturnCode } from './types';
import { checkPassword, generatePassword } from './password';

// GET
export const getGuestBookEntries = async (): Promise<GuestBookEntry[]> => {
  const guestbookCollection = collection(db, 'GuestBook');
  const querySnapshot = await getDocs(guestbookCollection);
  // sort by createdAt
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
  return entries;
};

// POST
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

// DELETE
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
  const entry = querySnapshot.docs.filter((doc) => {
    const data = doc.data() as GuestBookEntry;
    return data.salt === id;
  })[0];

  if (!entry) {
    return GBReturnCode.IdNotFound;
  }

  const isPasswordCorrect = checkPassword(
    pw,
    entry.data().salt,
    entry.data().pw,
  );

  if (!isPasswordCorrect) {
    return GBReturnCode.PwInvalid;
  }

  const ref = doc(db, 'GuestBook', entry.id);

  // soft delete
  await updateDoc(ref, {
    deletedAt: new Date().toISOString(),
  });

  return GBReturnCode.Success;
};
