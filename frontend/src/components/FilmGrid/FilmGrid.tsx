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

type MoviesList = {
  movies: Movie[]
  yearMovies: Movie[]
}

const GET_MOVIES = gql`
  query getMovies  {
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

const GET_MOVIES_YEAR = gql`
query getMoviesByYear($year: String, $offset: Int, $limit: Int)  {
   yearMovies(year: $year, offset: $offset, limit: $limit) {
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
  //const movieQuery = useQuery<MoviesList>(GET_MOVIES);

  const { loading, error, data } = useQuery<MoviesList>(GET_MOVIES_YEAR, {
    variables: { offset: 0, limit: 2, year: "2014" },
  });

  let filmCards;
  if (data !== undefined && data !== null) {
    const movies = Object.values(data)[0] || []
    filmCards = movies.map((movie: Movie) =>
      (<div key={movie.id} className="film">
        <FilmCard
          title={movie.title}
          year={movie.year}
          pictureURL={movie.image}
          rating={movie.imdbRating}
          rank={movie.rank} />
      </div>));
  } else {
    filmCards = (<div>loading...</div>)
  }
  return (
    <div id="filmgrid-wrapper">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className="filmGrid">
        {filmCards}
      </Grid>
    </div>
  )
}

