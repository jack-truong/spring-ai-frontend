import {useState} from "react";
import SingleSelect from "./SingleSelect.tsx";
import AiChatService from "../services/AiChatService.ts";
import {Stack} from "@mui/material";
import {BsCardImage} from "react-icons/bs";

const ImageControl = () => {
  const [activity, setActivity] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [environment, setEnvironment] = useState<string>("");
  const [food, setFood] = useState<string>("");
  const [instrument, setInstrument] = useState<string>("");

  return (
      <Stack sx={{ border: 3, padding: 2 }} spacing={5}>
        <h2>{"AI Image Generation\t"}<BsCardImage/></h2>
        <SingleSelect description={"Select an activity"} getValues={AiChatService.getActivities}
                      setValue={setActivity} value={activity}></SingleSelect>
        <SingleSelect description={"Select a color"} getValues={AiChatService.getColors}
                      setValue={setColor} value={color}></SingleSelect>
        <SingleSelect description={"Select an environment"}
                      getValues={AiChatService.getEnvironments}
                      setValue={setEnvironment} value={environment}></SingleSelect>
        <SingleSelect description={"Select a food"} getValues={AiChatService.getFoods}
                      setValue={setFood} value={food}></SingleSelect>
        <SingleSelect description={"Select an instrument"}
                      getValues={AiChatService.getInstruments}
                      setValue={setInstrument} value={instrument}></SingleSelect>
      </Stack>
  )
}

export default ImageControl;