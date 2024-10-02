// SubscriptionQuota.tsx

import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import {
  CHANGES_SAVED_ERROR,
  CHANGES_SAVED_SUCCESS,
  DECREASE,
  ERROR,
  INCREASE,
  MANAGE_QUOTA,
  POWERED_BY_CARAVELO,
  SUCCESS,
} from "../../utils/constants";
import QuotaReason from "./QuotaReason";
import FlightCount from "./FlightCount";
import styles from "./styles.module.css";
import SubscriptionQuotaModal from "../modals/subscriptionQuotaModal";
import { useQuotaApi } from "../hooks/useQuotaApi";
import Toast from "../toast";

const SubscriptionQuota: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flightCount, setFlightCount] = useState(0);
  const [reason, setReason] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<typeof SUCCESS | typeof ERROR>(
    SUCCESS
  );
  const [showToast, setShowToast] = useState(false);

  const initialCountRef = useRef(flightCount);

  const actionType = useMemo(() => {
    return flightCount > initialCountRef.current ? INCREASE : DECREASE;
  }, [flightCount]);

  const isReasonDisabled = useMemo(() => {
    return flightCount === initialCountRef.current || !isModalOpen;
  }, [flightCount, isModalOpen]);

  useEffect(() => {
    setReason("");
  }, [isReasonDisabled, actionType]);

  const { loading, updateQuota } = useQuotaApi();

  const handleModalClose = () => {
    setFlightCount(initialCountRef.current);
    setIsModalOpen(false);
    setReason("");
  };

  const handleFlightCount = (type: typeof INCREASE | typeof DECREASE) => {
    setFlightCount((prev) => prev + (type === INCREASE ? 1 : -1));
  };

  const handleReasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReason(e.target.value);
  };

  const handleSave = async () => {
    const success = await updateQuota({
      flightCount,
      reason,
      actionType,
    });

    if (success) {
      initialCountRef.current = flightCount;
      setToastMessage(CHANGES_SAVED_SUCCESS);
      setToastType(SUCCESS);
      setShowToast(true);
    } else {
      setToastMessage(CHANGES_SAVED_ERROR);
      setToastType(ERROR);
      setShowToast(true);
    }

    setIsModalOpen(false);
    setReason("");
  };

  const handleToastClose = useCallback(() => {
    setShowToast(false);
  }, []);

  return (
    <section>
      <button onClick={() => setIsModalOpen(true)}>{MANAGE_QUOTA}</button>
      <footer>{POWERED_BY_CARAVELO}</footer>

      {isModalOpen && (
        <SubscriptionQuotaModal
          onSave={handleSave}
          onClose={handleModalClose}
          isSaveButtonDisabled={reason.length === 0 || loading}
          loading={loading}
        >
          <div className={styles["subscription-quota-modal__container"]}>
            <FlightCount
              initialFlights={initialCountRef.current}
              flightCount={flightCount}
              onChange={handleFlightCount}
            />
            <QuotaReason
              actionType={actionType}
              disabled={isReasonDisabled}
              reason={reason}
              onChange={handleReasonChange}
            />
          </div>
        </SubscriptionQuotaModal>
      )}

      <Toast
        message={toastMessage}
        type={toastType}
        onClose={handleToastClose}
        isVisible={showToast}
      />
    </section>
  );
};

export default SubscriptionQuota;
