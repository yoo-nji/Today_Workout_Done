interface DeleteConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

export default function DeleteConfirm({
  isOpen,
  onClose,
  onConfirm,
  message,
}: DeleteConfirmProps) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className=" bg-white p-[50px] w-[310px] h-[183px] rounded-[15px] font-bold text-[14px] text-center">
        <p>{message}</p>
        <div className="flex justify-between mt-[24px] w-[210px] h-[38px]">
          <button
            onClick={onConfirm}
            className="bg-[#FF2A2A] w-[100px] h-[38px] rounded text-white"
          >
            확인
          </button>
          <button
            onClick={onClose}
            className="bg-[#E2E2E1] w-[100px] h-[38px] rounded"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
