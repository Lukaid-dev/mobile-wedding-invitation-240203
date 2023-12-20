import { deleteGuestBookEntry } from '../../api';

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
    const res = await deleteGuestBookEntry(id, pw);

    // closeModal();
    // window.location.reload();
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
