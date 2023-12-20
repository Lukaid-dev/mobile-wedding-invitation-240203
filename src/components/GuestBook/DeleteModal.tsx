import { RefObject } from 'react';

interface DeleteModalProps {
  modalOverlayRef: RefObject<HTMLDivElement>;
  closeModal: () => void;
  modalOutsideClick: (arg: React.MouseEvent<HTMLDivElement>) => void;
  guestbookEntryId: string; // salt를 id로 사용
}

export default function DeleteModal({
  modalOverlayRef,
  closeModal,
  modalOutsideClick,
  guestbookEntryId,
}: DeleteModalProps) {
  return (
    <div
      ref={modalOverlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 duration-1000 ease-in-out"
      // 부드럽게 나타나도록 설정
      style={{
        backdropFilter: 'blur(2px)',
        WebkitBackdropFilter: 'blur(2px)',
      }}
      onClick={modalOutsideClick}>
      <div className="flex flex-col items-center justify-center gap-2 border-2 bg-slate-200">
        <div className="text-2xl font-bold">
          정말 삭제하시겠습니까? {guestbookEntryId}
        </div>
        <div className="flex gap-2">
          <button
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            onClick={closeModal}>
            취소
          </button>
          <button
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            onClick={() => {
              alert('삭제되었습니다.');
              closeModal();
            }}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
