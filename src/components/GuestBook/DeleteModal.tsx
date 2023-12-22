import { RefObject, useState } from 'react';
import x from '../../assets/x.svg';
import DeleteButton from './DeleteButton';

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
  const [pw, setPw] = useState(''); // 비밀번호 입력 받기

  return (
    <div
      ref={modalOverlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 duration-1000 ease-in-out"
      style={{
        backdropFilter: 'blur(2px)',
        WebkitBackdropFilter: 'blur(2px)',
      }}
      onClick={modalOutsideClick}>
      <div className="flex w-[90%] flex-col gap-6 rounded-2xl bg-white p-6">
        <div className="flex items-center justify-between ">
          <div className="font-bold">삭제하시겠습니까?</div>
          <img src={x} alt="X" className="w-6" onClick={closeModal} />
        </div>
        <input
          type="text"
          className="h-12 rounded-lg border border-gray-200 px-2 py-3"
          placeholder="비밀번호 4자리"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <DeleteButton id={guestbookEntryId} closeModal={closeModal} pw={pw} />
      </div>
    </div>
  );
}
