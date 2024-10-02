import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SubscriptionQuotaModal from "..";
import "@testing-library/jest-dom";
import {
  EDIT_FLIGHTS,
  SAVE_CHANGES,
  SENDING,
  SUBSCRIBER_ADD_OR_REMOVE_FLIGHTS,
} from "../../../../utils/constants";
import { capitalizeFirstLetter } from "../../../../utils/helpers";

let onCloseMock: jest.Mock;
let onSaveMock: jest.Mock;

const renderWithProps = (
  props: Partial<React.ComponentProps<typeof SubscriptionQuotaModal>> = {}
) => {
  const defaultProps = {
    onClose: onCloseMock,
    onSave: onSaveMock,
    isSaveButtonDisabled: true,
    loading: false,
    children: <div>content</div>,
  };

  return render(<SubscriptionQuotaModal {...defaultProps} {...props} />);
};

describe("SubscriptionQuotaModal", () => {
  beforeEach(() => {
    onCloseMock = jest.fn();
    onSaveMock = jest.fn();
    jest.clearAllMocks();
  });

  it("renders the modal with the correct title and description", () => {
    const { getByText } = renderWithProps();

    expect(getByText(EDIT_FLIGHTS)).toBeInTheDocument();
    expect(getByText(SUBSCRIBER_ADD_OR_REMOVE_FLIGHTS)).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    const { getByLabelText } = renderWithProps();

    const closeButton = getByLabelText(/close modal/i);
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalled();
  });

  it("calls onSave when the save button is clicked", () => {
    const { getByText } = renderWithProps({
      isSaveButtonDisabled: false,
    });

    const saveButton = getByText(SAVE_CHANGES);
    fireEvent.click(saveButton);

    expect(onSaveMock).toHaveBeenCalled();
  });

  it("save button is disabled when isSaveButtonDisabled is true", () => {
    const { getByText } = renderWithProps({ isSaveButtonDisabled: true });

    const saveButton = getByText(SAVE_CHANGES);
    expect(saveButton).toBeDisabled();
  });

  it("save button is enabled when isSaveButtonDisabled is false", () => {
    const { getByText } = renderWithProps({ isSaveButtonDisabled: false });

    const saveButton = getByText(SAVE_CHANGES);
    expect(saveButton).toBeEnabled();
  });

  it('displays "Sending" when loading is true', () => {
    const { getByText } = renderWithProps({
      loading: true,
      isSaveButtonDisabled: false,
    });

    const sendingButton = getByText(capitalizeFirstLetter(SENDING));
    expect(sendingButton).toBeInTheDocument();
    expect(sendingButton).toBeEnabled();
  });

  it("renders the children content", () => {
    const content = "some content";
    const { getByText } = renderWithProps({
      children: <div>{content}</div>,
    });

    expect(getByText(content)).toBeInTheDocument();
  });

  it("ensures modal has proper aria-labelledby and aria-describedby attributes for accessibility", () => {
    const { getByRole } = renderWithProps();

    const modal = getByRole("dialog");
    expect(modal).toHaveAttribute("aria-labelledby", "modalTitle");
    expect(modal).toHaveAttribute("aria-describedby", "modalDescription");
  });
});
