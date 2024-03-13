import { deleteGuestBookEntry, queryClient } from '../../utils/api';
import { useMutation } from '@tanstack/react-query';

export default function DeleteButton({
  id,
  pw,
  closeModal,
}: {
  id: string;
  pw: string;
  closeModal: () => void;
}) {
  const { mutate, isError, error } = useMutation({
    mutationFn: deleteGuestBookEntry,
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['guestbook'],
      });
      alert('삭제되었습니다.');
    },
  });

  const handleDelete = async () => {
    mutate({ id, pw });
    closeModal();
  };

  if (isError) {
    alert(error.message);
  }

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
