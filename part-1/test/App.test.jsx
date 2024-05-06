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

  it("should render 3 buttons: good, neural and bad", () => {
    const { getByRole } = component;
    const buttonNames = ["good", "neutral", "bad"];
    buttonNames.forEach((name) => {
      const button = getByRole("button", { name });
      expect(button).toBeInTheDocument();
    });
  });

  it("should call event handlers", () => {
    const { getByRole } = component;
    const buttonNames = ["good", "neutral", "bad"];
    const paragraphTestIds = ["good", "neutral", "bad"];

    buttonNames.forEach((name, index) => {
      const button = getByRole("button", { name });
      const paragraph = screen.getByTestId(paragraphTestIds[index]);
      act(() => {
        fireEvent.click(button);
      });
      expect(paragraph).toHaveTextContent("1");
    });
  });
});
