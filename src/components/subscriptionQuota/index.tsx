import { useRef, useState, useMemo, useEffect } from "react";
import {
  DECREASE,
  INCREASE,
  MANAGE_QUOTA,
  POWERED_BY_CARAVELO,
} from "../../utils/constants";
import SubscriptionQuotaModal from "../modals/subscriptionQuotaModal";
import QuotaReason from "./QuotaReason";
import FlightCount from "./FlightCount";
import styles from "./styles.module.css";

const SubscriptionQuota: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flightCount, setFlightCount] = useState(0);
  const [reason, setReason] = useState("");

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

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    setIsModalOpen(false);
    setReason("");
    initialCountRef.current = flightCount;
  };

  const handleFlightCount = (type: typeof INCREASE | typeof DECREASE) => {
    if (type === INCREASE) {
      setFlightCount((prev) => prev + 1);
    } else {
      setFlightCount((prev) => prev - 1);
    }
  };

  const handleReasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReason(e.target.value);
  };

  return (
    <section>
      <button onClick={() => setIsModalOpen(true)}>{MANAGE_QUOTA}</button>
      <footer>{POWERED_BY_CARAVELO}</footer>

      {isModalOpen && (
        <SubscriptionQuotaModal
          onSave={handleSave}
          onClose={handleModalClose}
          isSaveButtonDisabled={reason.length === 0}
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
    </section>
  );
};

export default SubscriptionQuota;
