import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import { useAppSelector } from '../../features/hooks';
import { useAppDispatch } from '../../features/hooks';
import { updateModalInfo } from '../../features/modalInfo';
import { useMutation, useQuery } from '@apollo/client';
import { GET_MOVIE, ADD_USER_RATING } from '../../queries/queries'
import './FilmModal.css';
import { useEffect } from 'react';

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

export default function FilmModal() {

  const modalInfo = useAppSelector((state) => state.modalInfo.value);
  const dispatch = useAppDispatch();
  let modalData: Movie = {id: "0", rank: "0", title: "0", year: "0", image: "", imdbRating: "0", imdbRatingCount: "0"};
  let ratingCount: number = 0;

  const { loading, error, data } = useQuery<Movie>(GET_MOVIE, {
    variables: { id: modalInfo.id},
  });

  if (data !== undefined) {
    modalData = Object.values(data)[0];
    ratingCount = parseInt(modalData.imdbRatingCount);
  }

  useEffect(() => {
    dispatch(updateModalInfo({
      ...modalInfo, title: modalData.title,  year: modalData.year, image: modalData.image, 
      rating: modalData.imdbRating, rank: modalData.rank, imdbRatingCount: modalData.imdbRatingCount,
    }))
  }, [modalData]);

  //adduserrating is function to call when you want to do the mutation to the database
  const [adduserrating] = useMutation<MoviesList>(ADD_USER_RATING); //funker dette nå???

  function calculateNewRating(newValue: number) {
    const oldRating : number = parseFloat(modalInfo.rating);
    const oldRatingCount: number = ratingCount;
    ratingCount = oldRatingCount + 1;
    //calculate new rating. newRating will be used in the database, newRoundedRating will be stored in modalInfo for better
    const newRating = (oldRating*oldRatingCount + newValue)/ratingCount
    console.log(newRating);
    //add the new rating count and rating to the database 
    adduserrating({ variables: {title: modalInfo.title, imdbRating: newRating.toString(), imdbRatingCount: ratingCount.toString()}});
    //add the new rating count and rating to redux
    dispatch(updateModalInfo({...modalInfo, rating: newRating.toString(), imdbRatingCount: ratingCount.toString(), stars: newValue}));
  }

  function closeModal() {
    dispatch(updateModalInfo(
      {showing: false}
      ));
  }
  
  return (
      <Modal
        open={modalInfo.showing}
        onClose={closeModal}
      >
        <Box id="modalBox">
        <Button variant="outlined" id="exitButton" onClick={closeModal}
        >x</Button>
        {data!==undefined ? 
        <><Avatar variant={"rounded"} alt="The image" src={modalInfo.image} id="image" style={{
            width: "20vw",
            height: "20vh",
          }} /><div id="info">
              <Typography variant="h6" sx={{ padding: '1vw' }}>
                {modalInfo.title}
              </Typography>
              <div id="filmFacts">
                <Typography variant="subtitle1">Rank: {modalInfo.rank}</Typography>
                <Typography variant="subtitle1">Rating: {Math.round((parseFloat(modalInfo.rating) * 10) / 10)}</Typography>
                <Typography variant="subtitle1">Year of release: {modalInfo.year}</Typography>
                <Typography variant="subtitle1">Rating count: {ratingCount}</Typography>
              </div>
            </div><Typography component="legend" id="userRating">Add your rating</Typography><Rating
              defaultValue={0}
              name="customized-10"
              max={10}
              value={modalInfo.stars ?? 0}
              onChange={(event, newValue: number | null) => {
                if (newValue !== null) {
                  calculateNewRating(newValue);
                }
              } } /></>
            : <h2>Loading...</h2>}
        </Box>
      </Modal>
  );
};

