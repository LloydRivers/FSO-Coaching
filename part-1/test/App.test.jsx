import { describe, it, expect } from "vitest";
import { render, screen, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";

describe("App", () => {
  let component;
  beforeEach(() => {
    component = render(<App />);
  });

  it("should render a heading", () => {
    const { getByRole } = component;
    const heading = getByRole("heading", { name: "give feedback" });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("give feedback");
  });

  it("renders no feedback given when totalFeedback = 0", () => {
    const { getByText } = component;
    const noFeedback = getByText("no feedback given");
    const heading = screen.getByTestId("heading");

    expect(heading).toBeInTheDocument();
    expect(noFeedback).toBeInTheDocument();
  });

  it("should render the statistics", () => {
    const noFeedbackGoodButton = screen.getByTestId("no-feedback-good");

    act(() => {
      fireEvent.click(noFeedbackGoodButton);
    });

    const table = screen.getByTestId("statistics");
    expect(table).toBeInTheDocument();
  });
});
