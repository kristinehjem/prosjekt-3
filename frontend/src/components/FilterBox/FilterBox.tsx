import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import "../FilterBox/FilterBox.css";

//code from https://mui.com/components/checkboxes/

export default function FilterBox() {
  const [state, setState] = React.useState({
    epoch1: false,
    epoch2: false,
    epoch3: false,
    epoch4: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { epoch1, epoch2, epoch3, epoch4 } = state;

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend" sx={{color: 'white', fontSize: 17}}>Select decade</FormLabel>
        <FormGroup className="formGroup">
          <FormControlLabel
            control={
              <Checkbox sx={{color: 'white'}} checked={epoch1} onChange={handleChange} name="epoch1" />
            }
            label="1950 - 1970"
          />
          <FormControlLabel
            control={
              <Checkbox sx={{color: 'white'}} checked={epoch2} onChange={handleChange} name="epoch2" />
            }
            label="1970 - 1990"
          />
          <FormControlLabel
            control={
              <Checkbox sx={{color: 'white'}} checked={epoch3} onChange={handleChange} name="epoch3" />
            }
            label="1990 - 2010"
          />
          <FormControlLabel
            control={
              <Checkbox sx={{color: 'white'}} checked={epoch4} onChange={handleChange} name="epoch4" />
            }
            label="2010 -"
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
}