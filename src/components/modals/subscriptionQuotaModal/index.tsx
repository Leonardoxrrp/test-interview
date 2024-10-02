import {
  EDIT_FLIGHTS,
  SAVE_CHANGES,
  SENDING,
  SUBSCRIBER_ADD_OR_REMOVE_FLIGHTS,
} from "../../../utils/constants";
import { capitalizeFirstLetter } from "../../../utils/helpers";
import styles from "./styles.module.css";

interface SubscriptionQuotaModalProps {
  onClose: () => void;
  onSave: () => void;
  children: React.ReactNode;
  isSaveButtonDisabled: boolean;
  loading: boolean;
}

const SubscriptionQuotaModal: React.FC<SubscriptionQuotaModalProps> = ({
  onClose,
  onSave,
  children,
  isSaveButtonDisabled,
  loading,
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
            {loading ? capitalizeFirstLetter(SENDING) : SAVE_CHANGES}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default SubscriptionQuotaModal;
