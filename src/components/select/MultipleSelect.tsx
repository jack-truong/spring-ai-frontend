import {ComponentPropsWithoutRef, useEffect, useState} from "react";
import {Autocomplete, Stack} from "@mui/material";
import {AxiosResponse} from "axios";
import SelectTextField from "./SelectTextField.tsx";
import Loading from "../Loading.tsx";

interface ListInputProps extends ComponentPropsWithoutRef<typeof Autocomplete> {
  description: string;
  label?: string;
  getValues: () => Promise<AxiosResponse<String[]>>;
  setValues: (value: Array<string>) => void
  values: Array<string>;
}

const MultipleSelect = ({description, label, getValues, setValues, values, ...rest}: ListInputProps) => {
  const [localValues, setLocalValues] = useState<Array<string>>([]);

  const retrieveValues = () => {
    console.log(`### Loading values: ${description}`);

    getValues()
    .then((response: any) => {
      setLocalValues(response.data);
      setValues(response.data);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  };
  useEffect(() => {
    retrieveValues();
  }, []);

  const defaultProps = {
    options: localValues,
    getOptionLabel: (option: string) => option,
    ...rest
  };

  return (
      <Stack spacing={1} sx={{width: 300}}>
        {values.length > 0 ? <Autocomplete
            {...defaultProps}
            multiple
            id="auto-highlight"
            autoHighlight
            onChange={(event, newValue: Array<string>) => {
              setValues(newValue);
            }}
            value={values}
            renderInput={(params) => (
                <SelectTextField params={params} label={description}/>
            )}
        /> : <Loading label={label}/>}
      </Stack>
  );
}

export default MultipleSelect;
