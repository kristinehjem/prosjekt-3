import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { useAppDispatch } from '../../features/hooks';
import { updateModalInfo } from '../../features/modalInfo';

export default function FilmCard(props: {title: string, year: number, pictureURL: string, rating: number, rank: number}) {
  const dispatch = useAppDispatch();

  function clickAct() {
    dispatch(updateModalInfo(
      {title: props.title, year: props.year, image: props.pictureURL, rating: props.rating, rank: props.rank, showing: true}
      ));
    /*dispatch(showModal(
      {open: true}
      ));*/
  }

  return (
    <Card sx={{ maxWidth: 300 }} onClick={() => {clickAct()}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="120"
          image={props.pictureURL}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{fontSize: '1.5vw', color: '#FFC069'}}>
            {props.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}