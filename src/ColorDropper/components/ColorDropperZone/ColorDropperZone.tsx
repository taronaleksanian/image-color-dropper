import { FC, MouseEvent, useRef, useState } from "react";
import { IPosition } from "../../ColorDropper.models";
import { CURSOR_SIZE } from "../../colorDropper.const";
import { between } from "../../../utils";
import { Cursor } from "../Cursor";
import styles from "./ColorDropperZone.module.css";

interface ColorDropperZoneProps {
  imageSrc: string;
  isCursorMode: boolean;
  onColorChange: (color: string) => void;
}

const ColorDropperZone: FC<ColorDropperZoneProps> = ({
  imageSrc,
  isCursorMode,
  onColorChange,
}) => {
  const [mousePosition, setMousePosition] = useState<IPosition | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const isCursorHidden = !mousePosition && !isCursorMode;
    if (!imageRef.current || isCursorHidden) return;

    const { left, top } = imageRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const r = CURSOR_SIZE / 2;
    const isXOnImage = between(x, 0, imageRef.current.width + r);
    const isYOnImage = between(y, 0, imageRef.current.height + r);

    if (!isXOnImage || !isYOnImage) {
      return setMousePosition(null);
    }

    setMousePosition({ x, y });
  };
  const onMouseLeave = () => setMousePosition(null);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={onMouseLeave}
      className={`${styles.imageWrapper} ${
        isCursorMode ? styles.cursorModeActive : ""
      }`}
    >
      <img src={imageSrc} className={styles.picture} ref={imageRef} />
      {isCursorMode && mousePosition && (
        <Cursor
          mousePosition={mousePosition}
          onColorChange={onColorChange}
          image={imageRef?.current}
        />
      )}
    </div>
  );
};

export default ColorDropperZone;
