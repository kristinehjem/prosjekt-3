import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function FilmCard() {
  
    return (
      <div>
      <Card className ="filmCard">
        <CardContent>
        <Typography className="labels" sx={{ mb: 1.5, fontFamily: 'Montserrat'}} component="div">
            Hei
        </Typography>
        </CardContent>
      </Card>
      </div>
    );
  }