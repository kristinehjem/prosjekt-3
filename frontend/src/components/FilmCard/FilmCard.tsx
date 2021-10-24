import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { useAppDispatch } from '../../features/hooks';
import { updateModalInfo } from '../../features/modalInfo';
import { useAppSelector } from '../../features/hooks';
import './FilmCard.css'

export default function FilmCard(props: {id: string, title: string, year: string, pictureURL: string, rating: string, rank: string, imdbRatingCount: string}) {
  const dispatch = useAppDispatch();

  function clickAct() {
    dispatch(updateModalInfo(
      {id: props.id, showing: true}
      ));
  }

  return (
  <div>
    <Card sx={{minWidth: '200px', margin: '5px'}}className="filmCard" onClick={() => {clickAct()}}>
      <CardActionArea sx={{backgroundColor: 'black'}}>
        <CardMedia
          component="img"
          height="120"
          image={props.pictureURL}
        />
        <CardContent>
          <Typography id="movieTitle" gutterBottom variant="h5" component="div" sx={{fontSize: '1.5vw', color: '#FFC069'}}>
            {props.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
  );
}