import "./FilmGrid.css";
import Grid from '@mui/material/Grid';
import FilmCard from '../FilmCard/FilmCard'
import { useQuery } from '@apollo/client';
import { GET_MOVIES } from '../../queries/queries';
import { useAppSelector } from '../../features/hooks';
import FilmModal from '../../components/FilmModal/FilmModal';
import { Movie, MovieList, YearFilter } from '../../types'
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from "react";

// apollo with typescript: https://www.apollographql.com/docs/react/development-testing/static-typing/

export default function FilmGrid() {
  const modalInfo = useAppSelector((state) => state.modalInfo.value);
  const yearFilter = useAppSelector((state) => state.yearFilter.value);
  const searchFilter = useAppSelector((state) => state.searchFilter.value);
  const [sorting, setSorting] = useState<String>("rank");

  let clickedFilters: String[] = [];

  //finding the filters that are checked
  for (const [key, value] of Object.entries(yearFilter)) {
    if (value === true) {
      clickedFilters.push(key.slice(0, 3))
    }
  }

  const { loading, error, data } = useQuery<MovieList>(GET_MOVIES, {
    variables: { title: searchFilter.title, years: clickedFilters},
  });

  let movies = {};
  if (data !== undefined) {
    if (data.movies.length === 0) {
      movies = <div className = "searchFeedback">There are no movies with this title.</div>
    }
    else {
    movies = Object.values(data)[0].map((movie: Movie) =>
    <div key={movie.id} className="film">
      <FilmCard
        id = {movie.id}
        title={movie.title}
        year={movie.year}
        pictureURL={movie.image}
        rating={movie.imdbRating}
        rank={movie.rank}
        imdbRatingCount={movie.imdbRatingCount} />
    </div>);
    }
  } else {
    movies = <div className = "searchFeedback" >
      <p>loading</p>
      <CircularProgress color='inherit'/>
    </div>
  }

  function changeSorting(event: React.ChangeEvent<HTMLSelectElement>) {
    setSorting(event.target.value);
  }

  return (
    <div id="filmgrid-wrapper">
      {data !== undefined ?
      <span className="custom-dropdown">
        <select onChange={changeSorting}>
            <option value="rank">Sort by: rank</option>
            <option value="title">Sort by: title</option>  
        </select>
    </span>
        : null}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className="filmGrid">
        {movies}
      </Grid>
      {modalInfo.showing ? <FilmModal/> : null}
    </div>
  )
}

