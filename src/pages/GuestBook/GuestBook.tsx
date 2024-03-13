import { useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { DocumentData } from 'firebase/firestore';
import DeleteModal from './DeleteModal';
import BottomInputBar from './BottomInputBar';
import CommentList from './CommentList';
import { GuestBookEntry } from '../../utils/types';
import { getGuestBookEntries } from '../../utils/api';

export default function GuestBook() {
  const entries = useLoaderData() as GuestBookEntry[];
  const [guestbookEntryId, setGuestbookEntryId] = useState('');
  const [guestbookEntries, setGuestbookEntries] = useState<DocumentData>([]);

  // modal
  const [modalOpen, setModalOpen] = useState(false);
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
