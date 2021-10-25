import "./MovieGrid.css";
import Grid from '@mui/material/Grid';
import MovieCard from '../MovieCard/MovieCard'
import { useQuery } from '@apollo/client';
import { GET_MOVIES } from '../../queries/queries';
import { useAppSelector } from '../../features/hooks';
import CircularProgress from '@mui/material/CircularProgress';

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

export default function MovieGrid() {

  const yearFilter = useAppSelector((state) => state.yearFilter.value);
  const searchFilter = useAppSelector((state) => state.searchFilter.value);

  let clickedFilters: String[] = [];

  for (const [key, value] of Object.entries(yearFilter)) {
    if (value === true) {
      clickedFilters.push(key.slice(0, 3))
    }
  }

  const { loading, error, data } = useQuery<MoviesList>(GET_MOVIES, {
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
      <MovieCard
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
  return (
    <div className="filmgrid-wrapper">
        <div className="movieList">{movies}</div>
    </div>
  )
}

