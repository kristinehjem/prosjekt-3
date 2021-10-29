import React from "react";
import { mount } from "@cypress/react";
import MovieGrid from "../components/MovieGrid/MovieGrid";
import { store } from "../app/store";
import { Provider } from "react-redux";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

describe("MovieGrid", () => {
  context("Pagination buttons", () => {
    it("Should show next and prev buttons", () => {
      // apollo client setup
      const client = new ApolloClient({
        uri: "http://localhost:8081/graphql",
        cache: new InMemoryCache(),
      });
      mount(
        <ApolloProvider client={client}>
          <Provider store={store}>
            <MovieGrid />
          </Provider>
        </ApolloProvider>
      );
      // Children should be [button, p, button]
      cy.get(".pagination-wrapper").children().should("have.length", 3);

      cy.get(".pagination-wrapper")
        .children()
        .first()
        .should("have.text", "Previous page");

      cy.get(".pagination-wrapper")
        .children()
        .last()
        .should("have.text", "Next page");
    });
  });
});
