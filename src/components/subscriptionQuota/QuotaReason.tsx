import React from "react";
import {
  DECREASE,
  INCREASE,
  quotaReasons,
  WHAT_IS_YOUR_MOTIVE,
} from "../../utils/constants";
import styles from "./styles.module.css";

interface QuotaReasonProps {
  actionType: typeof INCREASE | typeof DECREASE;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled: boolean;
  reason: string;
}

const QuotaReason: React.FC<QuotaReasonProps> = ({
  actionType,
  onChange,
  disabled,
  reason,
}) => {
  const { options } = quotaReasons[actionType];

  return (
    <div className={styles["quota-reason__container"]}>
      <select
        className={styles["quota-reason__select"]}
        onChange={onChange}
        disabled={disabled}
        aria-label="Quota reason"
        value={reason}
      >
        <option value="" disabled hidden>
          {WHAT_IS_YOUR_MOTIVE}
        </option>
        {options.map((reason, index) => (
          <option key={index} value={reason}>
            {reason}
          </option>
        ))}
      </select>
    </div>
  );
};

export default QuotaReason;
