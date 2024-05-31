import {useState} from "react";
import SingleSelectList from "./SingleSelectList.tsx";
import AiService from "../services/AiService.ts";
import {Box} from "@mui/material";

type ImageControlProps = {
  breed: string;
};

const ImageControl = ({breed}: ImageControlProps) => {
  const [activity, setActivity] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [environment, setEnvironment] = useState<string>("");
  const [food, setFood] = useState<string>("");
  const [instrument, setInstrument] = useState<string>("");

  return (
      <Box sx={{ border: 3, padding: 2 }}>
        <h2>{"AI Image Generation"}</h2>
        <div>{`Selected breed: ${breed}`}</div>
        <SingleSelectList description={"Select an activity"} getValues={AiService.getActivities}
                          setValue={setActivity} value={activity} ></SingleSelectList>
        <SingleSelectList description={"Select a color"} getValues={AiService.getColors}
                          setValue={setColor} value={color} ></SingleSelectList>
        <SingleSelectList description={"Select an environment"} getValues={AiService.getEnvironments}
                          setValue={setEnvironment} value={environment} ></SingleSelectList>
        <SingleSelectList description={"Select a food"} getValues={AiService.getFoods}
                          setValue={setFood} value={food} ></SingleSelectList>
        <SingleSelectList description={"Select an instrument"} getValues={AiService.getInstruments}
                          setValue={setInstrument} value={instrument} ></SingleSelectList>
      </Box>
  )
}

export default ImageControl;