import {useEffect, useState} from "react";
import {Autocomplete, Stack} from "@mui/material";
import {AxiosResponse} from "axios";
import SelectTextField from "./SelectTextField.tsx";
import Loading from "../Loading.tsx";

type ListInputProps = {
  description: string;
  label?: string;
  getValues: () => Promise<AxiosResponse<String[]>>;
  setValues: (value: Array<string>) => void
}

const MultipleSelect = ({description, label, getValues, setValues}: ListInputProps) => {
  const [options, setOptions] = useState<Array<string>>([]);
  const [selected, setSelected] = useState<Array<string>>([]);

  const retrieveValues = () => {
    console.log(`### Loading values: ${description}`);

    getValues()
    .then((response: any) => {
      setOptions(response.data);
      setValues(response.data);
      setSelected(response.data);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  };
  useEffect(() => {
    retrieveValues();
  }, []);

  const defaultProps = {
    options: options,
    getOptionLabel: (option: string) => option,
  };

  return (
      <Stack spacing={1} sx={{width: 300}}>
        {options.length > 0 ? <Autocomplete
            {...defaultProps}
            multiple
            id={`${description}-select`}
            autoHighlight
            filterSelectedOptions
            onChange={(event, newValue: Array<string>) => {
              setValues(newValue);
              setSelected(newValue);
            }}
            value={selected}
            renderInput={(params) => (
                <SelectTextField params={params} label={description}/>
            )}
        /> : <Loading label={label}/>}
      </Stack>
  );
}

export default MultipleSelect;
