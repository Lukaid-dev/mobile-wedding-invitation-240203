import { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { GuestBookEntry } from '../types';
import { getGuestBookEntries, postGuestBookEntry } from '../api';

export default function GuestBook() {
  const [guestbookEntries, setGuestbookEntries] = useState<DocumentData>([]);
  const [newEntry, setNewEntry] = useState<GuestBookEntry>({
    name: '',
    pw: '',
    text: '',
  });

  useEffect(() => {
    const fetchGuestbookEntries = async () => {
      const entries = await getGuestBookEntries();
      setGuestbookEntries(entries);
    };

    fetchGuestbookEntries();
  }, []);

  const handlePostEntry = async () => {
    await postGuestBookEntry(newEntry);
    setNewEntry({ name: '', pw: '', text: '' });
    // 새로운 엔트리를 추가한 후, 필요에 따라 다시 데이터를 가져오는 등의 작업을 수행할 수 있습니다.
  };

  useEffect(() => {
    console.log(guestbookEntries);
  }, [guestbookEntries]);

  return (
    <div>
      <h1>Guestbook</h1>
      <ul>
        {guestbookEntries.map((entries: GuestBookEntry) => (
          <li key={entries.name}>{entries.text}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newEntry.name}
          onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Password"
          value={newEntry.pw}
          onChange={(e) => setNewEntry({ ...newEntry, pw: e.target.value })}
        />
        <input
          type="text"
          placeholder="Message"
          value={newEntry.text}
          onChange={(e) => setNewEntry({ ...newEntry, text: e.target.value })}
        />
        <button onClick={handlePostEntry}>Post Entry</button>
      </div>
    </div>
  );
}
