import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import "../FilterBox/FilterBox.css";
import CheckBox from '../CheckBox/CheckBox';

//code from https://mui.com/components/checkboxes/

export default function FilterBox() {
  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend" sx={{color: 'white'}}>Select decade</FormLabel>
        <FormGroup className="container">
          <CheckBox label = "1950's"/>
          <CheckBox label = "1960's"/>
          <CheckBox label = "1970's"/>
          <CheckBox label = "1980's"/>
          <CheckBox label = "1990's"/>
          <CheckBox label = "2000's"/>
          <CheckBox label = "2010's"/>
        </FormGroup>
      </FormControl>
    </Box>
  );
}