import { useEffect, useRef, useState } from 'react';
import DeleteModal from './DeleteModal';
import BottomInputBar from './BottomInputBar';
import CommentList from './CommentList';
import { getGuestBookEntries, queryClient } from '../../utils/api';
import { useQuery } from '@tanstack/react-query';

export default function GuestBook() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['guestbook'],
    queryFn: getGuestBookEntries,
  });

  const [guestbookEntryId, setGuestbookEntryId] = useState('');

  // modal
  const [modalOpen, setModalOpen] = useState(false);
  const modalOverlayRef = useRef<HTMLDivElement>(null);

  const [excludedHeight, setExcludedHeight] = useState<number>(0);
  const bottomInputBarRef = useRef<HTMLDivElement>(null);

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
    const handleResize = () => {
      if (bottomInputBarRef.current) {
        const componentHeight = bottomInputBarRef.current.offsetHeight;
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

  if (isPending) {
    console.log('pending');
    return <div>Loading...</div>;
  }

  if (isError) {
    console.log('error');
    return <div>Error: {error.message}</div>;
  }

  if (data) {
    return (
      <>
        <CommentList
          guestbookEntries={data}
          openModal={openModal}
          excludedHeight={excludedHeight}
        />
        <BottomInputBar ref={bottomInputBarRef} />
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
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  return queryClient.fetchQuery({
    queryKey: ['guestbook'],
    queryFn: getGuestBookEntries,
  });
}
