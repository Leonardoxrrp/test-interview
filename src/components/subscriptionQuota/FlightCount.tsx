import React from "react";
import {
  DECREASE,
  INCREASE,
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
  return (
    <div className={styles["flight-count"]}>
      <p>
        {ORIGINAL_FLIGHTS_LEFT}:{" "}
        <span className={styles["flight-count__number"]}>{initialFlights}</span>
      </p>
      <p>
        {NEW_FLIGHTS_LEFT}:{" "}
        <span className={styles["flight-count__number"]}>
          {initialFlights === flightCount ? NO_CHANGES : flightCount}
        </span>
      </p>
      <button
        onClick={() => onChange(DECREASE)}
        disabled={flightCount <= 0}
        aria-label="Decrease flight count"
      >
        - {capitalizeFirstLetter(DECREASE)}
      </button>
      <button
        onClick={() => onChange(INCREASE)}
        aria-label="Increase flight count"
      >
        + {capitalizeFirstLetter(INCREASE)}
      </button>
    </div>
  );
};

export default FlightCount;
