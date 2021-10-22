import { gql } from '@apollo/client';

const GET_MOVIES = gql`
query getMoviesByYear($title: String, $years: [String])  {
   movies (title: $title, years: $years) {
    id
    title
    rank
    year
    image
    imdbRating
    imdbRatingCount
  }
}
`
export { GET_MOVIES }