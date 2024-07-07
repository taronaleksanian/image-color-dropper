import { FC, ReactNode } from "react";
import styles from "./ActionButton.module.css";

interface ColorDropperModeBtnProps {
  onClick: () => void;
  isActive?: boolean;
  children: ReactNode;
}
const ColorDropperModeBtn: FC<ColorDropperModeBtnProps> = ({
  onClick,
  isActive,
  children,
}) => {
  return (
    <button
      className={`${styles.actionButton} ${isActive ? styles.active : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ColorDropperModeBtn;
