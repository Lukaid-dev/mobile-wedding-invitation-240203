import { useState, forwardRef } from 'react';
import { GBReturnCode, GuestBookEntry } from '../../types';
import { getGuestBookEntries, postGuestBookEntry } from '../../api';
import { DocumentData } from 'firebase/firestore';

import arrowUpWhite from '../../assets/arrowUpWhite.svg';

type Props = {
  setGuestbookEntries: React.Dispatch<React.SetStateAction<DocumentData>>;
};

const BottomInputBar = forwardRef<HTMLDivElement, Props>(
  ({ setGuestbookEntries }, ref) => {
    const [newEntry, setNewEntry] = useState<GuestBookEntry>({
      name: '',
      pw: '',
      text: '',
      salt: '',
      createdAt: '',
    });

    const handlePostEntry = async () => {
      const res: GBReturnCode = await postGuestBookEntry(newEntry);

      if (res === GBReturnCode.NameEmpty) {
        alert('이름을 입력해주세요.');
        return;
      } else if (res === GBReturnCode.PwEmpty) {
        alert('비밀번호를 입력해주세요.');
        return;
      } else if (res === GBReturnCode.PwInvalid) {
        alert('비밀번호는 4글자를 입력해야합니다.');
        return;
      } else if (res === GBReturnCode.TextEmpty) {
        alert('메세지를 입력해주세요.');
        return;
      }

      setNewEntry({ name: '', pw: '', text: '', salt: '', createdAt: '' });
      const entries = await getGuestBookEntries();
      setGuestbookEntries(entries);
    };

    return (
      <div
        ref={ref}
        className="absolute bottom-0 z-50 flex w-full flex-col items-center gap-4 border-t px-4 pb-12 pt-6 sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3 ">
        <div className="flex w-full items-start font-bold">
          방명록을 작성해주세요!
        </div>
        <div className="flex flex-col items-center justify-center gap-2 pr-10">
          <div className="flex w-full gap-2">
            <input
              type="text"
              className="w-full rounded-md border p-2 outline-none focus:outline-none"
              placeholder="이름"
              value={newEntry.name}
              onChange={(e) =>
                setNewEntry({ ...newEntry, name: e.target.value })
              }
            />
            <input
              type="password"
              className="w-full rounded-md border p-2 outline-none focus:outline-none"
              placeholder="비밀번호 4자리"
              value={newEntry.pw}
              onChange={(e) => setNewEntry({ ...newEntry, pw: e.target.value })}
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-center gap-2">
          <textarea
            rows={1}
            placeholder="내용을 입력해주세요"
            className="w-full rounded-md border p-2 outline-none focus:outline-none"
            value={newEntry.text}
            onChange={(e) => setNewEntry({ ...newEntry, text: e.target.value })}
          />
          <div
            className={`flex h-8 w-8 flex-shrink-0  items-center justify-center rounded-full ${
              newEntry.name && newEntry.pw && newEntry.text
                ? 'bg-red'
                : 'bg-gray-200'
            }`}>
            <img
              src={arrowUpWhite}
              alt="arrowUpWhite"
              className="h-5 w-5"
              onClick={
                newEntry.name && newEntry.pw && newEntry.text
                  ? handlePostEntry
                  : () => {}
              }
            />
          </div>
        </div>
      </div>
    );
  },
);

export default BottomInputBar;
