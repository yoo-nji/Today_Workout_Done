import { twMerge } from "tailwind-merge";

import React from "react";

const ButtonComponent: React.FC<ButtonComponent> = ({
  bgcolor,
  textcolor,
  border,
  children,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        `w-[120px] h-[36px] rounded-[10px] ${bgcolor} ${border}
        ${textcolor} flex justify-center items-center cursor-pointer font-bold`
      )}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
