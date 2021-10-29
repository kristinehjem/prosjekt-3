import React from "react";
import { mount } from "@cypress/react";
import SearchField from "../components/SearchField/SearchField";
import { store } from "../app/store";
import { Provider } from "react-redux";

describe("SearchField", () => {
  it("Should have placeholder text", () => {
    mount(
      <Provider store={store}>
        <SearchField />
      </Provider>
    );

    cy.get("input").should("exist");
    cy.get('input[placeholder="Movie Title"]').should(
      "have.text",
      "Movie Title"
    );
  });
});
