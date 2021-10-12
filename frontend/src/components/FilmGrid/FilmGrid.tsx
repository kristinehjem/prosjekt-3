import "./FilmGrid.css";
import Grid from '@mui/material/Grid';
import FilmCard from '../FilmCard/FilmCard'

export default function FilmGrid() {

  return ( 
      <div className="filmgrid-wrapper">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 5 }} className="filmGrid">
            <Grid item xs={2}>
                <FilmCard title="The Dark Knight" pictureURL="/static/images/cards/contemplative-reptile.jpg"></FilmCard>
            </Grid>
            <Grid item xs={2}>
                <FilmCard title="The Dark Moon" pictureURL="/static/images/cards/contemplative-reptile.jpg"></FilmCard>
            </Grid>
            <Grid item xs={2}>
                <FilmCard title="The Dark Sun" pictureURL="/static/images/cards/contemplative-reptile.jpg"></FilmCard>
            </Grid>
            <Grid item xs={2}>
                <FilmCard title="The Dark Stars" pictureURL="/static/images/cards/contemplative-reptile.jpg"></FilmCard>
            </Grid>
        </Grid>
    </div>
  )
}