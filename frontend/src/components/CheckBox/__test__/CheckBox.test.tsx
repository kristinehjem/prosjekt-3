import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import reducer from "../CheckBox";

test("should return the initial state", () => {
  expect(reducer(undefined)).toEqual({
    value: {
      "1950's": false,
      "1960's": false,
      "1970's": false,
      "1980's": false,
      "1990's": false,
      "2000's": false,
      "2010's": false,
    },
  });
});

// test("should handle a todo being added to an empty list", () => {
//   const previousState = [];npm
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
