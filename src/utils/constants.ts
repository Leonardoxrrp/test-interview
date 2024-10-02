export const MANAGE_QUOTA = "Manage quota";
export const POWERED_BY_CARAVELO = "Powered by Caravelo";
export const INCREASE = "INCREASE";
export const DECREASE = "DECREASE";
export const EDIT_FLIGHTS = "Edit Flights";
export const SUBSCRIBER_ADD_OR_REMOVE_FLIGHTS = "Add or remove flights from the subscriber";
export const SAVE_CHANGES = "Save changes";
export const NO_CHANGES = "No changes";
export const ORIGINAL_FLIGHTS_LEFT = "Original Flights left";
export const NEW_FLIGHTS_LEFT = "New Flights left";
export const WHAT_IS_YOUR_MOTIVE = "What is your motive?";

export const quotaReasons = {
    [INCREASE]: {
      options: [
        "Subscriber canceled flight",
        "Airline canceled flight",
        "Customer compensation",
        "Other",
      ],
    },
    [DECREASE]: {
        options: [
        "Flight not redeposited after a flight cancellation",
        "Subscriber had log in or password issues",
        "Subscriber had issues when booking",
        "Subscription has not renewed correctly",
        "Other",
      ],
    },
  };
  