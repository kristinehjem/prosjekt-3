import { gql } from '@apollo/client';

const GET_MOVIES = gql`
query getMoviesByYear($title: String, $years: [String], $offset: Int, $limit: Int)  {
   movies (title: $title, years: $years, offset: $offset, limit: $limit) {
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