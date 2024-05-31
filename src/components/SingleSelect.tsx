import {useEffect, useState} from "react";
import {Autocomplete, CircularProgress, Stack} from "@mui/material";
import {AxiosResponse} from "axios";
import SelectTextField from "./SelectTextField.tsx";
import {isArrayEmpty} from "../functions/functions.ts";

type ListInputProps = {
  description: string;
  getValues: () => Promise<AxiosResponse<String[]>>;
  setValue: (value: string) => void
  value: string;
  selectRandom? : boolean
  randomize?: number
};

const getRandomElement = (arr: any[]) => {
  return arr.length ? arr[Math.floor(Math.random() * arr.length)] : undefined
}

const SingleSelect = ({description, getValues, setValue, value, selectRandom, randomize}: ListInputProps) => {
  const [values, setValues] = useState<Array<string>>([]);

  const retrieveValues = () => {
    console.log(`### Loading values: ${description}`);

    getValues()
    .then((response: any) => {
      setValues(response.data);
      setValue(selectRandom ? getRandomElement(response.data) : response.data[0]);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  };
  useEffect(() => {
    retrieveValues();
  }, []);
  useEffect(() => {
    if (!isArrayEmpty(values)) {
      setValue(getRandomElement(values));
    }
  }, [randomize]);

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
