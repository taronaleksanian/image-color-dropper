import { FC, memo } from "react";
import styles from "./ColorLabel.module.css";
import { hexToRBG } from "../../../utils";

interface ColorLabelProps {
  color?: string;
}

const ColorLabel: FC<ColorLabelProps> = memo(({ color }) => {
  return (
    <div className={styles.colorLabelWrapper}>
      <span
        style={color ? { backgroundColor: color } : undefined}
        className={styles.colorLabelIndicator}
      />
      <>
        {color ? (
          <span className={styles.colorDetails}>
            <span className={styles.color} data-format="HEX">
              {color}
            </span>
            <span className={styles.color} data-format="RGB">
              {hexToRBG(color)}
            </span>
          </span>
        ) : (
          <span>No color selected</span>
        )}
      </>
    </div>
  );
});

export default ColorLabel;
