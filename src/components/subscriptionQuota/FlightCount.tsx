import React, { useMemo } from "react";
import {
  DECREASE,
  INCREASE,
  MAX_ALLOWED,
  NEW_FLIGHTS_LEFT,
  NO_CHANGES,
  ORIGINAL_FLIGHTS_LEFT,
} from "../../utils/constants";
import styles from "./styles.module.css";
import { capitalizeFirstLetter } from "../../utils/helpers";

interface FlightCountProps {
  initialFlights: number;
  flightCount: number;
  onChange: (type: typeof DECREASE | typeof INCREASE) => void;
}

const FlightCount: React.FC<FlightCountProps> = ({
  initialFlights,
  flightCount,
  onChange,
}) => {
  const maxOriginalFlights = useMemo(() => {
    return initialFlights >= 3;
  }, [initialFlights]);

  const maxNewFlights = useMemo(() => {
    return flightCount >= 3 && initialFlights !== 3;
  }, [flightCount, initialFlights]);

  return (
    <div className={styles["flight-count"]}>
      <p>
        {ORIGINAL_FLIGHTS_LEFT}:{" "}
        <span className={styles["flight-count__number"]}>{initialFlights}</span>
        {maxOriginalFlights && <span> ({MAX_ALLOWED})</span>}
      </p>
      <p>
        {NEW_FLIGHTS_LEFT}:{" "}
        <span role="status" className={styles["flight-count__number"]}>
          {initialFlights === flightCount ? NO_CHANGES : flightCount}
        </span>
        {maxNewFlights && <span> ({MAX_ALLOWED})</span>}
      </p>
      <button
        onClick={() => onChange(DECREASE)}
        disabled={flightCount <= 0}
        aria-label="Decrease flight count"
      >
        {capitalizeFirstLetter(DECREASE)}
      </button>
      <button
        onClick={() => onChange(INCREASE)}
        disabled={flightCount >= 3}
        aria-label="Increase flight count"
      >
        {capitalizeFirstLetter(INCREASE)}
      </button>
    </div>
  );
};

export default FlightCount;
