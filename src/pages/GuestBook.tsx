import { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { GuestBookEntry, GBReturnCode } from '../types';
import { getGuestBookEntries, postGuestBookEntry } from '../api';
import { FaXmark } from 'react-icons/fa6';

export default function GuestBook() {
  const [guestbookEntries, setGuestbookEntries] = useState<DocumentData>([]);
  const [newEntry, setNewEntry] = useState<GuestBookEntry>({
    name: '',
    pw: '',
    text: '',
    salt: '',
    createdAt: '',
  });

  useEffect(() => {
    const fetchGuestbookEntries = async () => {
      const entries = await getGuestBookEntries();
      setGuestbookEntries(entries);
    };

    fetchGuestbookEntries();
  }, []);

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

  useEffect(() => {
    console.log(guestbookEntries);
  }, [guestbookEntries]);

  return (
    <div
      className=" flex flex-col"
      // 전체 높이에서 헤더와 푸터의 높이를 뺀 나머지 높이를 차지하도록 설정 지금은 각 2rem으로 설정됨
      style={{ height: `calc(100vh - 4rem)` }}>
      <div className="text-center text-2xl font-bold"> 방 명 록 </div>
      <div className="text-center">축하 메세지를 남겨주세요!</div>

      <div className="flex flex-col items-center justify-center gap-2 border-2 bg-slate-200">
        <div className="flex w-full gap-2">
          <input
            type="text"
            className="w-full rounded-md border p-2 outline-none focus:outline-none"
            placeholder="이름"
            value={newEntry.name}
            onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
          />
          <input
            type="password"
            className="w-full rounded-md border p-2 outline-none focus:outline-none"
            placeholder="비밀번호"
            value={newEntry.pw}
            onChange={(e) => setNewEntry({ ...newEntry, pw: e.target.value })}
          />
        </div>
        <textarea
          rows={4}
          className="w-full rounded-md border p-2 outline-none focus:outline-none"
          value={newEntry.text}
          onChange={(e) => setNewEntry({ ...newEntry, text: e.target.value })}
        />
        <button
          onClick={handlePostEntry}
          className="w-full rounded-md border bg-black p-2 text-white hover:bg-gray-900">
          등록하기
        </button>
      </div>

      <ul className="flex flex-col gap-2 overflow-auto  bg-slate-50 px-4 pb-4 pt-10">
        {guestbookEntries.map((entries: GuestBookEntry) => (
          <li key={entries.salt}>
            <div className="flex flex-col gap-2 rounded-md bg-slate-200 px-4 py-4">
              <div className="flex w-full justify-between">
                <span>{entries.name}</span>
                <div className="flex gap-2">
                  <span className="text-sm">
                    {new Date(entries.createdAt).toLocaleString()}
                  </span>
                  <div
                    onClick={() => {
                      alert('삭제되었습니다.');
                    }}>
                    <FaXmark />
                  </div>
                </div>
              </div>
              <div>
                <span>{entries.text}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
