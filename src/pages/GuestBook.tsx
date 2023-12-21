import { DocumentData } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { GuestBookEntry } from '../types';
import { getGuestBookEntries } from '../api';
import DeleteModal from '../components/GuestBook/DeleteModal';
import Card from '../components/GuestBook/Card';
import BottomInputBar from '../components/GuestBook/BottomInputBar';

export default function GuestBook() {
  const [guestbookEntries, setGuestbookEntries] = useState<DocumentData>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [guestbookEntryId, setGuestbookEntryId] = useState('');
  const modalOverlayRef = useRef<HTMLDivElement>(null);

  const [excludedHeight, setExcludedHeight] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);

  const openModal = (id: string) => {
    setGuestbookEntryId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const modalOutsideClick = (arg: React.MouseEvent<HTMLDivElement>) => {
    if (arg.target === modalOverlayRef.current) {
      closeModal();
    }
  };

  useEffect(() => {
    const fetchGuestbookEntries = async () => {
      const entries = await getGuestBookEntries();
      setGuestbookEntries(entries);
    };
    fetchGuestbookEntries();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        const componentHeight = ref.current.offsetHeight;
        const viewportHeight = window.innerHeight;
        const heightExcluded = viewportHeight - componentHeight;
        setExcludedHeight(heightExcluded);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className=" flex flex-col">
      <ul
        className="flex flex-col gap-4 overflow-auto px-4 pb-4 pt-4"
        // scroll
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

      <BottomInputBar ref={ref} setGuestbookEntries={setGuestbookEntries} />

      {modalOpen && (
        <DeleteModal
          modalOverlayRef={modalOverlayRef}
          closeModal={closeModal}
          modalOutsideClick={modalOutsideClick}
          guestbookEntryId={guestbookEntryId}
        />
      )}
    </div>
  );
}
