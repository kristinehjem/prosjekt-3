import * as React from 'react';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useAppSelector } from '../../features/hooks';
import { useAppDispatch } from '../../features/hooks';
import { updateYearFilter } from '../../features/yearfilter';



export default function CheckBox(props: {label: string}) {

    const yearFilter = useAppSelector((state) => state.yearFilter);
    const dispatch = useAppDispatch();
    const key: string = props.label;

    // console.log(yearFilter[key]);


const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(yearFilter)


    dispatch(updateYearFilter(
        {...yearFilter,
        [props.label]: event.target.checked}
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