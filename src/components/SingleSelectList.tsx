import React, {useEffect, useState} from "react";
import {Autocomplete, Stack, TextField} from "@mui/material";
import {AxiosResponse} from "axios";

type ListInputProps = {
  description: string;
  getValues: () => Promise<AxiosResponse<String[]>>;
  setValue: (value: string) => void
};

const SingleSelectList = ({description, getValues, setValue}: ListInputProps) => {
  const [values, setValues] = useState<Array<string>>([]);

  const retrieveValues = () => {
    console.log("### Loading values")
    getValues()
    .then((response: any) => {
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
    options: values,
    getOptionLabel: (option : string) => option,
  };

  return (
      <Stack spacing={1} sx={{ width: 300 }}>
        <Autocomplete
            {...defaultProps}
            id="auto-highlight"
            autoHighlight
            onChange={(event, newValue: string) => {
              setValue(newValue);
            }}
            renderInput={(params) => (
                <TextField {...params} label={description} variant="standard" />
            )}
        />
      </Stack>
  );
}

export default SingleSelectList;
