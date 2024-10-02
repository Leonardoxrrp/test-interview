import { render, fireEvent } from "@testing-library/react";
import SubscriptionQuota from "..";
import "@testing-library/jest-dom";
import {
  DECREASE,
  INCREASE,
  MANAGE_QUOTA,
  NO_CHANGES,
  SAVE_CHANGES,
} from "../../../utils/constants";
import { useQuotaApi } from "../../hooks/useQuotaApi";
import { capitalizeFirstLetter } from "../../../utils/helpers";

// Mock the useQuotaApi hook
jest.mock("../../hooks/useQuotaApi");

let updateQuotaMock: jest.Mock;

const renderComponent = () => {
  return render(<SubscriptionQuota />);
};

describe("SubscriptionQuota", () => {
  beforeEach(() => {
    updateQuotaMock = jest.fn();
    (useQuotaApi as jest.Mock).mockReturnValue({
      loading: false,
      updateQuota: updateQuotaMock,
    });
    jest.clearAllMocks();
  });

  it("opens the modal when the 'Manage Quota' button is clicked", () => {
    const { getByText, queryByRole } = renderComponent();

    expect(queryByRole("dialog")).not.toBeInTheDocument();

    const manageQuotaButton = getByText(MANAGE_QUOTA);
    fireEvent.click(manageQuotaButton);

    expect(queryByRole("dialog")).toBeInTheDocument();
  });

  it("disables the save button if no reason is selected", () => {
    const { getByText } = renderComponent();

    fireEvent.click(getByText(MANAGE_QUOTA));

    const saveButton = getByText(SAVE_CHANGES);
    expect(saveButton).toBeDisabled();
  });

  it("does not allow adding more than 3 flights", () => {
    const { getByText, getByRole } = renderComponent();

    fireEvent.click(getByText(MANAGE_QUOTA));

    const increaseButton = getByText(capitalizeFirstLetter(INCREASE));

    fireEvent.click(increaseButton); // flightCount = 1
    fireEvent.click(increaseButton); // ...2
    fireEvent.click(increaseButton); // ...3
    fireEvent.click(increaseButton); // Should not increase beyond 3

    const flightCountElement = getByRole("status");
    expect(flightCountElement).toHaveTextContent("3");
  });

  it("does not allow decreasing below 0 flights", () => {
    const { getByText, getByRole } = renderComponent();

    fireEvent.click(getByText(MANAGE_QUOTA));

    const decreaseButton = getByText(capitalizeFirstLetter(DECREASE));

    fireEvent.click(decreaseButton); // flightCount = -1

    const flightCountElement = getByRole("status");
    expect(flightCountElement).toHaveTextContent(NO_CHANGES);
  });
});
