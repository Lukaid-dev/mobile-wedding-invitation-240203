import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import { GuestBookEntry } from './types';
import { checkPassword, generatePassword } from './password';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

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
export const postGuestBookEntry = async (entry: GuestBookEntry) => {
  if (!entry.name) {
    throw new Error('이름을 입력해주세요');
  }

  if (!entry.pw) {
    throw new Error('비밀번호를 입력해주세요');
  }

  if (entry.pw.trim().length !== 4) {
    throw new Error('비밀번호는 4글자를 입력해야합니다.');
  }

  if (!entry.text) {
    throw new Error('메세지를 입력해주세요.');
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
    return;
  } else {
    throw new Error('방명록 작성에 실패했습니다.');
  }
};

// DELETE
export const deleteGuestBookEntry = async ({
  id,
  pw,
}: {
  id: string;
  pw: string;
}) => {
  if (!id) {
    throw new Error('잘못된 요청입니다.');
  }

  if (!pw) {
    throw new Error('비밀번호를 입력해주세요');
  }

  if (pw.trim().length !== 4) {
    throw new Error('비밀번호는 4글자를 입력해야합니다.');
  }

  const guestbookCollection = collection(db, 'GuestBook');
  const querySnapshot = await getDocs(guestbookCollection);
  const entry = querySnapshot.docs.filter((doc) => {
    const data = doc.data() as GuestBookEntry;
    return data.salt === id;
  })[0];

  if (!entry) {
    throw new Error('해당하는 방명록이 없습니다.');
  }

  const isPasswordCorrect = checkPassword(
    pw,
    entry.data().salt,
    entry.data().pw,
  );

  if (!isPasswordCorrect) {
    throw new Error('비밀번호가 일치하지 않습니다.');
  }

  const ref = doc(db, 'GuestBook', entry.id);

  // soft delete
  await updateDoc(ref, {
    deletedAt: new Date().toISOString(),
  });
};
