import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import { useAppSelector } from '../../features/hooks';
import { useAppDispatch } from '../../features/hooks';
import { updateModalInfo } from '../../features/modalInfo';
import { useMutation } from '@apollo/client';
import { ADD_USER_RATING } from '../../queries/queries'
import { MovieList } from '../../types'
import './MovieModal.css';

export default function MovieModal() {

  const modalInfo = useAppSelector((state) => state.modalInfo.value);
  const dispatch = useAppDispatch();

  //adduserrating is function to call when you want to do the mutation to the database
  const [adduserrating] = useMutation<MovieList>(ADD_USER_RATING); //funker dette nå???

  function calculateNewRating(newValue: number) {
    localStorage.setItem(modalInfo.id, newValue.toString());
    const oldRating : number = parseFloat(modalInfo.rating);
    const oldRatingCount: number = parseInt(modalInfo.imdbRatingCount);
    const newRatingCount = oldRatingCount + 1;
    //calculate new rating. newRating will be used in the database, newRoundedRating will be stored in modalInfo for better
    const newRating = (oldRating*oldRatingCount + newValue)/newRatingCount
    //add the new rating count and rating to the database 
    adduserrating({ variables: {title: modalInfo.title, imdbRating: newRating.toString(), imdbRatingCount: newRatingCount.toString()}});
    //add the new rating count and rating to redux
    dispatch(updateModalInfo({...modalInfo, rating: newRating.toString(), imdbRatingCount: newRatingCount.toString(), stars: newValue, disableRating: true}));
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
        <Avatar variant={"rounded"} alt="The image" src={modalInfo.image} id="image" style={{
            width: "20vw",
            height: "20vh",
          }} /><div id="info">
              <Typography variant="h6" sx={{ padding: '1vw' }}>
                {modalInfo.title}
              </Typography>
              <div id="filmFacts">
                <Typography variant="subtitle1">Rank: {modalInfo.rank}</Typography>
                <Typography variant="subtitle1">Rating: {modalInfo.rating.slice(0, 3)}</Typography>
                <Typography variant="subtitle1">Year of release: {modalInfo.year}</Typography>
                <Typography variant="subtitle1">Rating count: {modalInfo.imdbRatingCount}</Typography>
              </div>
            </div>
            <Typography component="legend" id="userRating">Add your rating</Typography>
            <Rating
              disabled={modalInfo.disableRating}
              defaultValue={0}
              name="customized-10"
              max={10}
              value={modalInfo.stars ?? 0}
              onChange={(event, newValue: number | null) => {
                if (newValue !== null) {
                  calculateNewRating(newValue);
                }
              } } />
        </Box>
      </Modal>
  );
};

