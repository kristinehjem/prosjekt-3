import "./FilmGrid.css";
import Grid from '@mui/material/Grid';
import FilmCard from '../FilmCard/FilmCard'
import { useQuery } from '@apollo/client';
import { GET_MOVIES } from '../../queries/queries';
import { useAppSelector } from '../../features/hooks';
import FilmModal from '../../components/FilmModal/FilmModal';

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
  const modalInfo = useAppSelector((state) => state.modalInfo.value);
  const yearFilter = useAppSelector((state) => state.yearFilter.value);
  let clickedFilters: String[] = [];

  //finding the filters that are checked
  for (const [key, value] of Object.entries(yearFilter)) {
    if (value === true) {
      clickedFilters.push(key.slice(0, 3))
    }
  }

  const { loading, error, data } = useQuery<MoviesList>(GET_MOVIES, {
    variables: { title: "", years: clickedFilters},
  });

  let movies = {};
  if (data !== undefined) {
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
  } else {
    movies = <div>loading...</div>
  }
  return (
    <div id="filmgrid-wrapper">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className="filmGrid">
        {movies}
      </Grid>
      {modalInfo.showing ? <FilmModal/> : null}
    </div>
  )
}

