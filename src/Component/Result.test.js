import { render, screen } from "@testing-library/react";
import Result from "./Result";

test("renders plain words, correct answers, and wrong answers", () => {
  const str_arr = [
    "the",
    { item: "quick", result: true },
    { id: "w1", prevVal: "brown", item: "slow", result: false },
  ];

  render(<Result str_arr={str_arr} />);

  expect(screen.getByText("the")).toBeInTheDocument();
  expect(screen.getByText("quick")).toBeInTheDocument();
  expect(screen.getByText("slow")).toBeInTheDocument();
});
