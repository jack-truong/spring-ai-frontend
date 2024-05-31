import {useEffect, useState} from "react";
import {Autocomplete, CircularProgress, Stack, TextField} from "@mui/material";
import {AxiosResponse} from "axios";
import SelectTextField from "./SelectTextField.tsx";

type ListInputProps = {
  description: string;
  getValues: () => Promise<AxiosResponse<String[]>>;
  setValue: (value: string) => void
  value: string;
};

const SingleSelect = ({description, getValues, setValue, value}: ListInputProps) => {
  const [values, setValues] = useState<Array<string>>([]);

  const retrieveValues = () => {
    console.log(`### Loading values: ${description}`);

    getValues()
    .then((response: any) => {
      setValues(response.data);
      setValue(response.data[0]);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  };
  useEffect(() => {
    retrieveValues();
  }, []);

  const defaultProps = {
    options: values,
    getOptionLabel: (option: string) => option,
  };

  return (
      <Stack spacing={1} sx={{width: 300}}>
        {values.length > 0 ? <Autocomplete
            {...defaultProps}
            id="auto-highlight"
            autoHighlight
            onChange={(event, newValue: string) => {
              setValue(newValue);
            }}
            value={value}
            renderInput={(params) => (
                <SelectTextField params={params} label={description}/>
            )}
        /> : <CircularProgress/>}
      </Stack>
  );
}

export default SingleSelect;
