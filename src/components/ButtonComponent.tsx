import { twMerge } from "tailwind-merge";

import React from "react";

const ButtonComponent: React.FC<ButtonComponent> = ({
  bgcolor,
  textcolor,
  children,
  onClick,
}) => {
  let bordercolorExport: string | undefined;
  if (bgcolor === "bg-white") {
    bordercolorExport = textcolor?.replace("text-", "border-");
  }

  return (
    <button
      onClick={onClick}
      className={twMerge(
        `w-[120px] h-[36px] rounded-[10px] ${bgcolor} 
        ${textcolor} flex justify-center items-center cursor-pointer font-bold`,
        bgcolor === "bg-white" && `border-solid border ${bordercolorExport}`
      )}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
