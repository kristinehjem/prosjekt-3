import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import { useAppSelector } from '../../features/hooks';
import { useAppDispatch } from '../../features/hooks';
import { updateModalInfo } from '../../features/modalInfo';
import { useMutation, gql } from '@apollo/client';
//import ADD_USER_RATING from '../../queries/queries';
import './FilmModal.css';

interface Movie {
  id: string,
  rank: string
  title: string,
  year: string,
  image: string,
  imdbRating: string,
  imdbRatingCount: string,
}

interface MoviesList {
  movies: Movie[]
}

const ADD_USER_RATING = gql`
  mutation addUserRating ($title: String, $imdbRating: String, $imdbRatingCount: String) {
    addUserRating(title: $title, imdbRating: $imdbRating, imdbRatingCount: $imdbRatingCount){
      title
      imdbRating
      imdbRatingCount
    }
  }
`

export default function FilmModal() {

  //adduserrating is function to call when you want to do the mutation to the database
  const [adduserrating, { data, loading, error }] = useMutation<MoviesList>(ADD_USER_RATING);

  //constant required to update and use the values from redux
  const modalInfo = useAppSelector((state) => state.modalInfo.value);
  const dispatch = useAppDispatch();

  function calculateNewRating() {
    const oldRating : number = parseInt(modalInfo.rating);
    const newRatingCount: number = (parseInt(modalInfo.imdbRatingCount) + 1)
    //calculate new rating
    const newRating = (oldRating + value)/2;
    //add the new rating count and rating to the database
    adduserrating({ variables: {title: modalInfo.title, imdbRating: newRating.toString(), imdbRatingCount: newRatingCount.toString()}});
    dispatch(updateModalInfo({...modalInfo, rating: newRating.toString(), imdbRatingCount: newRatingCount.toString()}));
  }

  //hook to manage the value of rating
  const [value, setValue] = useState<number>(0);
  
  return (
      <Modal
        open={modalInfo.showing}
        onClose={() => {dispatch(updateModalInfo(
          {showing: false}
          ))
        }}
      >
        <Box id="modalBox">
        <Button variant="outlined" id="exitButton" onClick={() => {dispatch(updateModalInfo(
          {showing: false}
          ))
        }}
        >x</Button>
        <Avatar variant={"rounded"} alt="The image" id="image" src={modalInfo.image} style={{
            width: "20vw",
            height: "20vh",
        }}/>
        <div id="info">
          <Typography variant="h6" sx={{padding: '1vw'}}>
            {modalInfo.title}
          </Typography>
          <div id="filmFacts">
              <Typography variant="subtitle1">Rank: {modalInfo.rank}</Typography>
              <Typography variant="subtitle1">Rating: {modalInfo.rating}</Typography>
              <Typography variant="subtitle1">Year of release: {modalInfo.year}</Typography>
              <Typography variant="subtitle1">Rating count: {modalInfo.imdbRatingCount}</Typography>
          </div>
        </div>
          <Typography component="legend" id="userRating">Add your rating</Typography>
            <Rating
            name="customized-10"
            max={10}
            value={value}
            onChange={(event, newValue: number | null) => {
              if (newValue !== null){
                setValue(newValue);
                calculateNewRating();
              }
            }}
            />
        </Box>
      </Modal>
  );
};

