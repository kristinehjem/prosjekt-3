import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useAppSelector } from '../../features/hooks';
import { useAppDispatch } from '../../features/hooks';
import { updateYearFilter } from '../../features/yearfilter';



<<<<<<< HEAD
export default function CheckBox(props: { label: string }) {
  const [checked, setState] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(!checked);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          sx={{ color: "white" }}
          checked={checked}
          onChange={handleChange}
          name="epoch"
          color="default"
        />
      }
      label={props.label}
    />
  );
}
=======
export default function CheckBox(props: {label: string}) {

    const yearFilter = useAppSelector((state) => state.yearFilter.value);
    const dispatch = useAppDispatch();
    const key: string = props.label;


const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    

    dispatch(updateYearFilter(
        {...yearFilter,
            [key]: event.target.checked}
    ))
            
    };

return (
    <FormControlLabel
        control={
            <Checkbox sx={{color: 'white'}} checked={yearFilter[key]} onChange={handleChange} color='default'/>
        }
        label= {props.label}
        />)
}
>>>>>>> master
