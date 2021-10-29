import React from "react";
import { mount } from "@cypress/react";
import App from "../app/App";

it("renders learn react link", () => {
  mount(<App />);
  cy.get(".header").contains("IMDb TOP 250 Movies");
});
