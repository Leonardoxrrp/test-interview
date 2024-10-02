import React from "react";
import styles from "./styles.module.css";
import {
  EDIT_FLIGHTS,
  SAVE_CHANGES,
  SUBSCRIBER_ADD_OR_REMOVE_FLIGHTS,
} from "../../../utils/constants";

interface SubscriptionQuotaModalProps {
  onClose: () => void;
  onSave: () => void;
  children: React.ReactNode;
  isSaveButtonDisabled: boolean;
}

const SubscriptionQuotaModal: React.FC<SubscriptionQuotaModalProps> = ({
  onClose,
  onSave,
  children,
  isSaveButtonDisabled,
}) => {
  return (
    <div
      className={styles["modal__backdrop"]}
      role="dialog"
      aria-labelledby="modalTitle"
      aria-describedby="modalDescription"
    >
      <div className={styles["modal__content"]}>
        <button
          className={styles["modal__close-button"]}
          onClick={onClose}
          aria-label="Close modal"
        >
          ✖
        </button>
        <header>
          <h2 id="modalTitle">{EDIT_FLIGHTS}</h2>
        </header>
        <main>
          <p id="modalDescription">{SUBSCRIBER_ADD_OR_REMOVE_FLIGHTS}</p>
          {children}
        </main>
        <footer>
          <button
            onClick={onSave}
            disabled={isSaveButtonDisabled}
            className={styles["modal__close-modal-button"]}
          >
            {SAVE_CHANGES}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default SubscriptionQuotaModal;
