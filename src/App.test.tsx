import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

it("is aiven header present", () => {
  render(<App />);
  expect(screen.getByText("aiven Cloud Selection Panel")).toBeInTheDocument();
});



