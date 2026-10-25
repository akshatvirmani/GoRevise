import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the home page by default", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { name: /turn your notes into a/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /get started/i })).toBeInTheDocument();
});
