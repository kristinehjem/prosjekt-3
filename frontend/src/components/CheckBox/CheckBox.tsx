import * as React from 'react';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function CheckBox(props: {label: string}) {
    const [state, setState] = React.useState({
        epoch: false
    });

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
        ...state,
        [event.target.name]: event.target.checked,
    });
    };

const {epoch} = state;

return (
    <FormControlLabel
        control={
            <Checkbox sx={{color: 'white'}} checked={epoch} onChange={handleChange} name="epoch" color='default'/>
        }
        label= {props.label}
        />)
}