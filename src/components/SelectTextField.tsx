import {TextField} from "@mui/material";

type SelectTextFieldProps = {
  label: string;
  params: any;
}

const SelectTextField = ({label, params} : SelectTextFieldProps) => {
  return <TextField {...params} label={label} variant="outlined" InputLabelProps={{style: {fontWeight: "bold"}}}/>
}

export default SelectTextField;