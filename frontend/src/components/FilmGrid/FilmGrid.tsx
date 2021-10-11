import "./FilmGrid.css";
import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import FilmCard from '../FilmCard/FilmCard'

export default function FilmGrid() {

  return (  
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
            <FilmCard></FilmCard>
        </Grid>
    </Grid>
  )
}