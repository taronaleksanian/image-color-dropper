import { ChangeEvent, FC, useState } from "react";
import picture from "../assets/images/picture.jpg";
import toast from "react-simple-toasts";
import ActionButton from "./components/ActionButton/ActionButton";
import styles from "./ColorDropper.module.css";
import ColorLabel from "./components/ColorLabel/ColorLabel";
import { ColorDropperIcon, ImageIcon } from "../assets/icons";
import { FileInput } from "../components/FileInput";
import { ColorDropperZone } from "./components/ColorDropperZone";

const ColorDropper: FC = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [imageSrc, setImageSrc] = useState(picture);
  const [isCursorMode, setIsCursorMode] = useState(false);

  const toggleColorDropperMode = () => setIsCursorMode((prev) => !prev);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const isFullHD = img.width === 1920 && img.height === 1080;
          if (!isFullHD) {
            return toast("Please upload a Full HD image (1920x1080).");
          }

          setImageSrc(img.src);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <ActionButton onClick={toggleColorDropperMode} isActive={isCursorMode}>
          <ColorDropperIcon />
        </ActionButton>
        <FileInput onChange={handleFileChange}>
          {(openFileSelectWindow) => (
            <ActionButton onClick={openFileSelectWindow}>
              <ImageIcon />
            </ActionButton>
          )}
        </FileInput>
        <ColorLabel color={selectedColor} />
      </div>
      <ColorDropperZone
        isCursorMode={isCursorMode}
        imageSrc={imageSrc}
        onColorChange={setSelectedColor}
      />
    </div>
  );
};

export default ColorDropper;
