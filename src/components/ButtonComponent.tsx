import { twMerge } from "tailwind-merge";

import React from "react";

const ButtonComponent: React.FC<ButtonComponent> = ({
  bgcolor,
  textcolor,
  children,
  onClick,
  disabled,
  disabledBgColor,
}) => {
  let bordercolorExport: string | undefined;
  if (bgcolor === "bg-white") {
    bordercolorExport = textcolor?.replace("text-", "border-");
  }
  return (
    <button
      onClick={onClick}
      className={twMerge(
        `w-[120px] h-[36px] rounded-[10px] flex justify-center items-center font-bold cursor-pointer`,
        bgcolor === "bg-white" && `border-solid border ${bordercolorExport}`,
        disabled ? disabledBgColor : bgcolor,
        textcolor
      )}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
