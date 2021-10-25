import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import "../FilterBox/FilterBox.css";
import CheckBox from "../CheckBox/CheckBox";

//code from https://mui.com/components/checkboxes/

export default function FilterBox() {
  return (
    <Box sx={{ display: "flex" }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend" sx={{ color: "white" }}>
          Select decade
        </FormLabel>
        <FormGroup className="container">
          <CheckBox label="1950's" data-testid="1950-checkbox" />
          <CheckBox label="1960's" data-testid="1960-checkbox" />
          <CheckBox label="1970's" data-testid="1970-checkbox" />
          <CheckBox label="1980's" data-testid="1980-checkbox" />
          <CheckBox label="1990's" data-testid="1990-checkbox" />
          <CheckBox label="2000's" data-testid="2000-checkbox" />
          <CheckBox label="2010's" data-testid="2010-checkbox" />
        </FormGroup>
      </FormControl>
    </Box>
  );
}
