"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

export default function ToggleInput({
  onText,
  offText,
  checked,
  onChange,
  ...rest
}: {
  onText?: string;
  offText?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [onoff, setOnoff] = useState(false);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOnoff(e.target.checked);
    onChange && onChange(e);
  };

  return (
    <div className={styles.toggleInputBox}>
      <label className={styles.toggleLabel}>
        <input
          type="checkbox"
          className={styles.toggleInput}
          onChange={onChangeInput}
          checked={checked}
          {...rest}
        />
        <div
          className={clsx(
            styles.toggleSwitch,
            onText && offText && styles.toggleTextSwitch
          )}
        >
          <span
            className={clsx(styles.toggleText, onoff ? styles.on : styles.off)}
          >
            {onoff ? onText : offText}
          </span>
        </div>
      </label>
    </div>
  );
}
