import React, { useEffect } from "react";
import styles from "./styles.module.css";
import { ERROR, SUCCESS } from "../../utils/constants";

interface ToastProps {
  message: string;
  type: typeof SUCCESS | typeof ERROR;
  onClose: () => void;
  isVisible: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose, isVisible }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 1500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`${styles.toast} ${styles[type]}`}
      role="alert"
      aria-live="assertive"
      onClick={onClose}
    >
      <p>{message}</p>
    </div>
  );
};

export default Toast;
