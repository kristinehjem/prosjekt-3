import "./FilmGrid.css";
import Grid from '@mui/material/Grid';
import FilmCard from '../FilmCard/FilmCard'
import { ReactChild, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_MOVIES } from '../../queries/queries';
import { useAppSelector } from '../../features/hooks';

// apollo with typescript: https://www.apollographql.com/docs/react/development-testing/static-typing/
interface Movie {
  id: string,
  rank: string
  title: string,
  year: string,
  image: string,
  imdbRating: string,
  imdbRatingCount: string,
}

export interface MoviesList {
  movies: Movie[]
}

export interface YearFilter {
  year: string,
}

export default function FilmGrid() {
  const [page, setPage] = useState<number>(1);
  const [filmCards, setFilmCards] = useState<ReactChild[]>()
  const itemPerPage = 5;

  const yearFilter = useAppSelector((state) => state.yearFilter.value);
  const searchFilter = useAppSelector((state) => state.searchFilter.value);

  let clickedFilters: String[] = [];

  for (const [key, value] of Object.entries(yearFilter)) {
    if (value === true) {
      clickedFilters.push(key.slice(0, 3))
    }
  }

  const { loading, error, data } = useQuery<MoviesList>(GET_MOVIES, {
    variables: { title: searchFilter.title, years: clickedFilters, offset: (page - 1) * itemPerPage, limit: itemPerPage, },
  });
  useEffect(() => {
    if (data !== undefined && data !== null) {
      let movies;
      if (data.movies.length === 0) {
        movies = [<div className="searchFeedback">There are no movies with this title.</div>]
        setFilmCards(movies)
      }
      else {
        movies = Object.values(data)[0] || []
        setFilmCards(movies.map((movie: Movie) =>
          <div key={movie.id} className="film">
            <FilmCard
              title={movie.title}
              year={movie.year}
              pictureURL={movie.image}
              rating={movie.imdbRating}
              rank={movie.rank}
              imdbRatingCount={movie.imdbRatingCount} />
          </div>));
      }
    }
  }, [data])
  //Resets pagination when search has changes
  useEffect(() => {
    setPage(1)
  }, [searchFilter]);
  return (
    <div id="filmgrid-wrapper">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className="filmGrid">
        {filmCards}
      </Grid>
      {!filmCards &&
        <div className="searchFeedback">
          Loading...
        </div>
      }
      <button type="button" onClick={() => { setPage(page - 1) }}>Forrige side</button>
      <button type="button" onClick={() => { setPage(page + 1) }}>Neste side</button>
    </div>
  )
}

