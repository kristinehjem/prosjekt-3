import React from "react";
import { mount } from "@cypress/react";
import FilterBox from "../components/FilterBox/FilterBox";
import { store } from "../app/store";
import { Provider } from "react-redux";

describe("FilterBox", () => {
  it("Should have legend 'Select decade'", () => {
    mount(
      <Provider store={store}>
        <FilterBox />
      </Provider>
    );
    cy.get("legend").should("have.text", "Select decade");
  });

  it("Should contain 7 checkboxes", () => {
    mount(
      <Provider store={store}>
        <FilterBox />
      </Provider>
    );
    cy.get(".MuiFormGroup-root").children().should("have.length", 7);
  });
});
