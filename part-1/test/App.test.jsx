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
    const button = screen.getByText("next anecdote");
    expect(button).toBeInTheDocument();
  });

  it("should render a vote button", () => {
    const button = screen.getByText("vote");
    expect(button).toBeInTheDocument();
  });
});
