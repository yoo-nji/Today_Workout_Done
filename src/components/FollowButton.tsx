import { twMerge } from "tailwind-merge";

export default function FollowButton({
  width,
  height,
  rounded,
}: {
  width: string;
  height: string;
  rounded: string;
}) {
  return (
    <button
      className={twMerge(
        "bg-[#265CAC] text-white flex justify-center items-center text-sm cursor-pointer",
        width,
        height,
        rounded
      )}
    >
      팔로우
    </button>
  );
}
