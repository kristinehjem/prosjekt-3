import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

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
