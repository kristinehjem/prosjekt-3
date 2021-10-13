import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

export default function FilmCard(props: {title: string, pictureURL: string}) {

  return (
    <Card sx={{ maxWidth: 300 }}>
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