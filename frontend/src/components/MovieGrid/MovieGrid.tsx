import "./MovieGrid.css";
import Grid from "@mui/material/Grid";
import MovieCard from "../MovieCard/MovieCard";
import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../../queries/queries";
import { useAppSelector } from "../../features/hooks";
import MovieModal from "../../components/MovieModal/MovieModal";
import { Movie, MovieList, YearFilter } from "../../types";
import CircularProgress from "@mui/material/CircularProgress";
import { ReactChild, useEffect, useState } from "react";

// apollo with typescript: https://www.apollographql.com/docs/react/development-testing/static-typing/
export const itemPerPage = 14;

export default function MovieGrid() {
  const modalInfo = useAppSelector((state) => state.modalInfo.value);
  const yearFilter = useAppSelector((state) => state.yearFilter.value);
  const searchFilter = useAppSelector((state) => state.searchFilter.value);

  const [page, setPage] = useState<number>(1);
  const [filmCards, setFilmCards] = useState<ReactChild[]>();
  //"title" if the movies will be sorted by title, empty string "" if the movies will be sorted by rank(which is the default)
  const [sorting, setSorting] = useState<String>("");

  let clickedFilters: String[] = [];

  //finding the filters that are checked
  for (const [key, value] of Object.entries(yearFilter)) {
    if (value === true) {
      clickedFilters.push(key.slice(0, 3));
    }
  }

  const { loading, error, data } = useQuery<MovieList>(GET_MOVIES, {
    variables: {
      title: searchFilter.title,
      years: clickedFilters,
      offset: (page - 1) * itemPerPage,
      limit: itemPerPage,
      sort: sorting,
    },
  });

  let loadingMessage;
  useEffect(() => {
    if (data !== undefined && data !== null) {
      let movies;
      if (data.movies.length === 0) {
        movies = [
          <div className="searchFeedback">
            There are no movies with this title.
          </div>,
        ];
        setFilmCards(movies);
      } else {
        movies = Object.values(data)[0] || [];
        setFilmCards(
          movies.map((movie: Movie) => (
            <div key={movie.id} className="film">
              <MovieCard
                id={movie.id}
                title={movie.title}
                year={movie.year}
                pictureURL={movie.image}
                rating={movie.imdbRating}
                rank={movie.rank}
                imdbRatingCount={movie.imdbRatingCount}
              />
            </div>
          ))
        );
      }
    } else {
      loadingMessage = (
        <div className="searchFeedback">
          <p>loading</p>
          <CircularProgress color="inherit" />
        </div>
      );
    }
  }, [data]);

  //Resets pagination when search has changes
  useEffect(() => {
    setPage(1);
  }, [searchFilter]);

  let selectedOption: String = "";

  if (sorting === "") {
    selectedOption = "Sort by: rank";
  }
  if (sorting === "title") {
    selectedOption = "Sort by: title";
  }

  function changeSorting(event: React.ChangeEvent<HTMLSelectElement>) {
    setSorting(event.target.value);
  }

  return (
    <div className="moviegrid-wrapper">
      {data !== undefined ? (
        <span className="custom-dropdown">
          <select onChange={changeSorting}>
            <option value="" selected disabled hidden>
              {selectedOption}
            </option>
            <option value="">Sort by: rank</option>
            <option value="title">Sort by: title</option>
          </select>
        </span>
      ) : null}
      <div className="movieList">{filmCards || loadingMessage}</div>
      {modalInfo.showing ? <MovieModal /> : null}
      <div className="pagination-wrapper">
        <button
          type="button"
          disabled={page === 1 ? true : false}
          onClick={() => {
            setPage(page - 1);
          }}
        >
          Previous page
        </button>
        <p>Page {page}</p>
        <button
          type="button"
          disabled={
            data !== undefined && data.movies.length < itemPerPage
              ? true
              : false
          }
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Next page
        </button>
      </div>
    </div>
  );
}
