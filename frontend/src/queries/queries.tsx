import { gql } from '@apollo/client';

const GET_MOVIES = gql`
query getMovies($title: String, $years: [String])  {
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

const GET_MOVIE = gql`
query getMovie($id: String)  {
  movie (id: $id) {
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

const ADD_USER_RATING = gql`
  mutation addUserRating ($title: String, $imdbRating: String, $imdbRatingCount: String) {
    addUserRating(title: $title, imdbRating: $imdbRating, imdbRatingCount: $imdbRatingCount){
      id
      title
      imdbRating
      imdbRatingCount
    }
  }
`

export { GET_MOVIES, GET_MOVIE, ADD_USER_RATING }