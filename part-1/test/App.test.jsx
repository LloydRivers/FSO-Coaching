import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "../src/App";

describe("Anecdote component", () => {
  let component;
  beforeEach(() => {
    component = render(<App />);
  });
  it("should render without errors", () => {
    const container = screen.getByTestId("anecdote");

    expect(container).toBeInTheDocument();
  });

  it("should render a button", () => {
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
});
