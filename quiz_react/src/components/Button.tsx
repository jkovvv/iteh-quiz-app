import React from "react";

interface Props {
  children: string;
  color?: "primary" | "secondary" | "danger";
  onClick: () => void;
}

const Button = ({ children, onClick, color = "primary" }: Props) => {
  return (
    <button
      className={`button btn-${color}`}
      onClick={onClick}
      style={{ whiteSpace: "nowrap" }} // Sprečava prelamanje
    >
      {children}
    </button>
  );
};

export default Button;
