import {useEffect, useState} from "react";
import {Autocomplete, Stack} from "@mui/material";
import {AxiosResponse} from "axios";
import SelectTextField from "./SelectTextField.tsx";
import {getRandomElement, isArrayEmpty} from "../../functions/functions.ts";
import Loading from "../Loading.tsx";

type ListInputProps = {
  description: string;
  label? : string;
  getValues: () => Promise<AxiosResponse<String[]>>;
  setValue: (value: string) => void
  value: string;
  selectRandom? : boolean
  randomize?: number
};

const SingleSelect = ({description, label, getValues, setValue, value, selectRandom, randomize}: ListInputProps) => {
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
        /> : <Loading label={label}/>}
      </Stack>
  );
}

export default SingleSelect;
