import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import './FilmModal.css';

export default function FilmModal() {

    const [open, setOpen] = useState<boolean>(true);
    //hook to manage the value of rating
    const [value, setValue] = useState<number | null>(0);
    const url = "https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_UX128_CR0,3,128,176_AL_.jpg";

  return (
      <Modal
        open={open}
        onClose={() => {setOpen(false)}}
      >
        <Box id="modalBox">
        <Button variant="outlined" id="exitButton" onClick={() => {}}>x</Button>
        <Avatar variant={"rounded"} alt="The image" id="image" src={url} style={{
            width: "20vw",
            height: "20vh",
        }}/>
        <div id="info">
          <Typography variant="h6" sx={{padding: '1vw', fontSize: '2rem'}}>
              Title
          </Typography>
          <div id="filmFacts">
              <Typography variant="subtitle1">Rank</Typography>
              <Typography variant="subtitle1">Rating</Typography>
              <Typography variant="subtitle1">Year</Typography>
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
