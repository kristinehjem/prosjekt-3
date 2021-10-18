import "./FilmGrid.css";
import Grid from '@mui/material/Grid';
import FilmCard from '../FilmCard/FilmCard'
import { useQuery, gql } from '@apollo/client';

// apollo with typescript: https://www.apollographql.com/docs/react/development-testing/static-typing/
interface Movie {
  id: string,
  rank: string
  title: string,
  year: string,
  image: string,
  imdbRating: string,
}

interface MoviesList {
  movies: Movie[]
}

const GET_MOVIES = gql`
  query getMovies {
     movies {
      id
      title
      rank
      year
      image
      imdbRating
    }
  }
`

export default function FilmGrid() {
  const { loading, error, data } = useQuery<MoviesList>(GET_MOVIES);

  let movies = !!data
    ? data.movies.map((movie: Movie) =>
      <div key={movie.id} className="film">
        <FilmCard
        title={movie.title}
        year ={movie.year}
        pictureURL = {movie.image}
        rating = {movie.imdbRating}
        rank = {movie.rank} />
      </div>)
    : <div>Loading...</div>;
  ;
  return (
    <div id="filmgrid-wrapper">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>hei</div>
      )}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className="filmGrid">
        {movies}
      </Grid>
    </div>
  )
}

