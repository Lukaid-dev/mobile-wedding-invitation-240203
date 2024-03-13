import { DocumentData } from 'firebase/firestore';
import { GuestBookEntry } from '../../utils/types';
import Card from './Card';

export default function CommentList({
  guestbookEntries,
  openModal,
  excludedHeight,
}: {
  guestbookEntries: DocumentData;
  openModal: (id: string) => void;
  excludedHeight: number;
}) {
  return (
    <ul
      className="flex flex-col gap-4 overflow-auto px-4 pb-4 pt-4"
      style={{
        height: `calc(${excludedHeight}px - 4rem)`,
        overflowY: 'scroll',
        scrollBehavior: 'smooth',
      }}>
      {guestbookEntries.map((entries: GuestBookEntry) => (
        <li key={entries.salt}>
          <Card
            name={entries.name}
            text={entries.text}
            createdAt={entries.createdAt}
            id={entries.salt}
            openModal={openModal}
          />
        </li>
      ))}
    </ul>
  );
}
