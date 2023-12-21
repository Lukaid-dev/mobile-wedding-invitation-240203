import { deleteGuestBookEntry } from '../../api';
import { GBReturnCode } from '../../types';

export default function DeleteButton({
  id,
  pw,
  closeModal,
}: {
  id: string;
  pw: string;
  closeModal: () => void;
}) {
  const handleDelete = async () => {
    const res: GBReturnCode = await deleteGuestBookEntry(id, pw);

    if (res === GBReturnCode.PwEmpty) {
      alert('비밀번호를 입력해주세요.');
    }

    if (res === GBReturnCode.PwInvalid) {
      alert('비밀번호가 일치하지 않습니다.');
    }

    closeModal();
    window.location.reload();
  };

  return (
    <div className="flex justify-end">
      <button
        className="flex h-12 w-full items-center justify-center rounded-lg bg-red px-3 py-4 font-bold text-white"
        onClick={handleDelete}>
        삭제
      </button>
    </div>
  );
}
