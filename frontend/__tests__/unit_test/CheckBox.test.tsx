import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import reducer, { updateYearFilter } from "../../src/features/yearfilter";
import CheckBox from "../../src/components/CheckBox/CheckBox";
import React from "react";
import { store } from "../../src/app/store";
import { Provider } from "react-redux";
import { useAppSelector } from "../../src/features/hooks";

afterEach(cleanup);

function GetReduxState() {
  return useAppSelector((state) => state.yearFilter.value);
}

// test("should return the initial state", () => {
//   expect(reducer(undefined, {})).toEqual({
//     value: {
//       "1950's": false,
//       "1960's": false,
//       "1970's": false,
//       "1980's": false,
//       "1990's": false,
//       "2000's": false,
//       "2010's": false,
//     },
//   });
// });

// test("Checkbox renders", () => {
//   render(
//     <Provider store={store}>
//       <CheckBox label="1950's" />
//     </Provider>
//   );
//   const checkBox = screen.getByTestId("checkbox");
//   expect(checkBox).toBeInTheDocument();
//   expect(checkBox).not.toBeChecked();
// });

test("should return true in redux for checked filter", () => {
  render(
    <Provider store={store}>
      <CheckBox label="1950's" />
    </Provider>
  );
  const checkbox = screen.getByTestId("checkbox");
  userEvent.click(checkbox);
  expect(checkbox).toBeChecked;

  const newState = GetReduxState();
  expect(newState).toEqual({
    "1950's": true,
    "1960's": false,
    "1970's": false,
    "1980's": false,
    "1990's": false,
    "2000's": false,
    "2010's": false,
  });
});

// test("should handle a todo being added to an empty list", () => {
//   const previousState = [];
//   expect(reducer(previousState, todoAdded("Run the tests"))).toEqual([
//     {
//       text: "Run the tests",
//       completed: false,
//       id: 0,
//     },
//   ]);
// });

// test("should handle a todo being added to an existing list", () => {
//   const previousState = [
//     {
//       text: "Run the tests",
//       completed: true,
//       id: 0,
//     },
//   ];
//   expect(reducer(previousState, todoAdded("Use Redux"))).toEqual([
//     {
//       text: "Run the tests",
//       completed: true,
//       id: 0,
//     },
//     {
//       text: "Use Redux",
//       completed: false,
//       id: 1,
//     },
//   ]);
// });
