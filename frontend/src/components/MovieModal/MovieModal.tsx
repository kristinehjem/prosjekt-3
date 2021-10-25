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
import './MovieModal.css';

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

export default function MovieModal() {

  //adduserrating is function to call when you want to do the mutation to the database
  const [adduserrating, { data, loading, error }] = useMutation<MoviesList>(ADD_USER_RATING);

  //constant required to update and use the values from redux
  const modalInfo = useAppSelector((state) => state.modalInfo.value);
  const dispatch = useAppDispatch();

  function calculateNewRating(newValue: number) {
    console.log(modalInfo.stars);
    const oldRating : number = parseInt(modalInfo.rating);
    const newRatingCount: number = (parseInt(modalInfo.imdbRatingCount) + 1)
    //calculate new rating
    const newRating = (oldRating + newValue)/2;
    //add the new rating count and rating to the database
    adduserrating({ variables: {title: modalInfo.title, imdbRating: newRating.toString(), imdbRatingCount: newRatingCount.toString()}});
    dispatch(updateModalInfo({...modalInfo, rating: newRating.toString(), imdbRatingCount: newRatingCount.toString(), stars: newValue}));
  }

  //hook to manage the value of rating
  //const [value, setValue] = useState<number>(0);
  
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
            width: "80%",
            height: "100%",
        }}/>
        <div id="info">
          <Typography variant="h6" sx={{padding: '1vw', fontSize: '3vh'}}>
            {modalInfo.title}
          </Typography>
          <div id="filmFacts">
              <Typography variant="subtitle1" sx={{marginBottom: '1vh'}}>Rank: {modalInfo.rank}</Typography>
              <Typography variant="subtitle1" sx={{marginBottom: '1vh'}}>Rating: {modalInfo.rating}</Typography>
              <Typography variant="subtitle1" sx={{marginBottom: '1vh'}}>Year of release: {modalInfo.year}</Typography>
              <Typography variant="subtitle1" sx={{marginBottom: '1vh'}}>Rating count: {modalInfo.imdbRatingCount}</Typography>
          </div>
        </div>
          <Typography component="legend" id="userRating">Add your rating</Typography>
            <Rating
            defaultValue={1}
            name="customized-10"
            max={10}
            value={modalInfo.stars}
            onChange={(event, newValue: number | null) => {
              console.log(newValue);
              if (newValue !== null){
                calculateNewRating(newValue);
                //setValue(newValue);
              }
            }}
            />
        </Box>
      </Modal>
  );
};

