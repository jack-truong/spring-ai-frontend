import {useState} from "react";
import SingleSelect from "./SingleSelect.tsx";
import AiChatService from "../services/AiChatService.ts";
import {BsCardImage} from "react-icons/bs";
import ComponentStack from "./ComponentStack.tsx";
import {Box, Button} from "@mui/material";
import AiDogService from "../services/AiDogService.ts";
import ImagePanel from "./ImagePanel.tsx";

const ImageControl = () => {
  const [breed, setBreed] = useState<string>("");
  const [activity, setActivity] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [environment, setEnvironment] = useState<string>("");
  const [food, setFood] = useState<string>("");
  const [instrument, setInstrument] = useState<string>("");
  const [imagePrompt, setImagePrompt] = useState("");

  const getImagePrompt = () => {
    AiDogService.getImagePrompt(
        breed,
        activity,
        color,
        environment,
        food,
        instrument
    )
    .then((response: any) => {
      setImagePrompt(response.data);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  }

  return (
  <ComponentStack sx={{border: 3}}>
    <h2>{"AI Dog Image Generation\t"}<BsCardImage/></h2>
    <Box sx={{display: "flex"}}>
      <Box flex={1}>
        <ComponentStack>
          <SingleSelect description={"Select a dog breed"} getValues={AiDogService.getBreeds}
                        selectRandom={true} setValue={setBreed} value={breed}></SingleSelect>
          <SingleSelect description={"Select an activity"} getValues={AiChatService.getActivities}
                        selectRandom={true} setValue={setActivity} value={activity}></SingleSelect>
          <SingleSelect description={"Select a color"} getValues={AiChatService.getColors}
                        setValue={setColor} value={color}></SingleSelect>
          <SingleSelect description={"Select an environment"}
                        getValues={AiChatService.getEnvironments}
                        selectRandom={true} setValue={setEnvironment}
                        value={environment}></SingleSelect>
          <SingleSelect description={"Select a food"} getValues={AiChatService.getFoods}
                        selectRandom={true} setValue={setFood} value={food}></SingleSelect>
          <SingleSelect description={"Select an instrument"}
                        getValues={AiChatService.getInstruments}
                        selectRandom={true} setValue={setInstrument}
                        value={instrument}></SingleSelect>
        </ComponentStack>
      </Box>
      <Box flex={3}>
        <ImagePanel prompt={imagePrompt} />
      </Box>
    </Box>
    <Button sx={{width: 200, textAlign: 'left'}} variant="contained"
            onClick={getImagePrompt}>Generate</Button>
  </ComponentStack>
  )
}

export default ImageControl;