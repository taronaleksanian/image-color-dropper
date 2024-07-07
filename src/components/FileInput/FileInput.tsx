import { FC, InputHTMLAttributes, ReactNode, useRef } from "react";

interface FileInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "children"> {
  children: (openFileSelectWindow: () => void) => ReactNode;
}

const FileInput: FC<FileInputProps> = ({ children, ...props }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleTriggerClick = () => {
    inputRef?.current?.click();
  };

  return (
    <>
      <input
        style={{ display: "none" }}
        type="file"
        ref={inputRef}
        {...props}
      />
      {children(handleTriggerClick)}
    </>
  );
};

export default FileInput;
