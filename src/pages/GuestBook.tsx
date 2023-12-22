import { useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { DocumentData } from 'firebase/firestore';
import DeleteModal from '../components/GuestBook/DeleteModal';
import BottomInputBar from '../components/GuestBook/BottomInputBar';
import CommentList from '../components/GuestBook/CommentList';
import { GuestBookEntry } from '../types';
import { getGuestBookEntries } from '../api';

export default function GuestBook() {
  const entries = useLoaderData() as GuestBookEntry[];
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
    setGuestbookEntries(entries);
  }, [entries]);

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
    <>
      <CommentList
        guestbookEntries={guestbookEntries}
        openModal={openModal}
        excludedHeight={excludedHeight}
      />
      <BottomInputBar ref={ref} setGuestbookEntries={setGuestbookEntries} />
      {modalOpen && (
        <DeleteModal
          modalOverlayRef={modalOverlayRef}
          closeModal={closeModal}
          modalOutsideClick={modalOutsideClick}
          guestbookEntryId={guestbookEntryId}
        />
      )}
    </>
  );
}

export async function loader() {
  const entries = await getGuestBookEntries();
  return entries;
}
