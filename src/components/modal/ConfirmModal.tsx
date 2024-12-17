import { twMerge } from "tailwind-merge";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  confirmColor?: string;
  onlyConfirm?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  message,
  onlyConfirm,
  confirmColor = "bg-[#FF2A2A]", // 빨간색 기본설정
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className=" bg-white py-[50px] w-[310px] h-[183px] rounded-[15px] font-bold text-[14px]">
        <div className="flex flex-col items-center">
          <p className="text-[16px]">{message}</p>
          <div
            className={twMerge(
              "flex mt-[24px] w-[210px] h-[38px]",
              onlyConfirm ? "justify-center" : "justify-between "
            )}
          >
            <button
              onClick={onConfirm}
              className={twMerge(
                "w-[100px] h-[38px] rounded text-white",
                confirmColor
              )}
            >
              확인
            </button>
            {!onlyConfirm && (
              <button
                onClick={onClose}
                className="bg-[#E2E2E1] w-[100px] h-[38px] rounded"
              >
                취소
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
