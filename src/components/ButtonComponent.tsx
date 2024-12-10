import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";

import React from "react";

interface ButtonComponentProps {
  bgcolor?: string;
  textcolor?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
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
