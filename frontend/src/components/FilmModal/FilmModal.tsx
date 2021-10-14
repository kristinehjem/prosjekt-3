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
import './FilmModal.css';


export default function FilmModal() {

    //constant required to update and use the values from redux
    const modalInfo = useAppSelector((state) => state.modalInfo.value);
    const dispatch = useAppDispatch();

    //hook to manage the value of rating
    const [value, setValue] = useState<number | null>(0);
  
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
          </div>
        </div>
          <Typography component="legend" id="userRating">Add your rating</Typography>
            <Rating
            name="customized-10"
            max={10}
            value={value}
            onChange={(event, newValue: number | null) => {
                setValue(newValue);
            }}
            />
        </Box>
      </Modal>
  );
};

