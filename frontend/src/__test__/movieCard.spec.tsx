import React from "react";
import { mount } from "@cypress/react";
import MovieCard from "../components/MovieCard/MovieCard";
import { store } from "../app/store";
import { Provider } from "react-redux";

describe("MovieCard", () => {
  const movie = {
    id: "99",
    title: "New Movie",
    year: "9999",
    pictureURL: "http://picture.com",
    rating: "10",
    rank: "1",
    imdbRatingCount: "10",
  };

  it("renders correct info", () => {
    mount(
      <Provider store={store}>
        <MovieCard
          id={movie.id}
          title={movie.title}
          year={movie.year}
          pictureURL={movie.pictureURL}
          rating={movie.rating}
          rank={movie.rank}
          imdbRatingCount={movie.imdbRatingCount}
        />
      </Provider>
    );

    cy.get("#movieTitle").should("have.text", movie.title);
  });
});
