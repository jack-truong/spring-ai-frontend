import {useState} from "react";
import SingleSelect from "../select/SingleSelect.tsx";
import AiChatService from "../../services/AiChatService.ts";
import ComponentStack from "../layout/ComponentStack.tsx";
import {Box, Button} from "@mui/material";
import AiDogService from "../../services/AiDogService.ts";
import ImagePanel from "./ImagePanel.tsx";
import {isEmpty} from "../../functions/functions.ts";

const ImageControl = () => {
  const [randomize, setRandomize] = useState(0);
  const [breed, setBreed] = useState<string>("");
  const [activity, setActivity] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [environment, setEnvironment] = useState<string>("");
  const [food, setFood] = useState<string>("");
  const [instrument, setInstrument] = useState<string>("");
  const [imagePrompt, setImagePrompt] = useState("");

  const enabled: boolean = !isEmpty(breed) && !isEmpty(activity) && !isEmpty(color)
      && !isEmpty(environment) && !isEmpty(food) && !isEmpty(instrument);

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
        <Box sx={{display: "flex"}}>
          <Box flex={1}>
            <ComponentStack>
              <SingleSelect
                  description={"Select a dog breed"} getValues={AiDogService.getBreeds}
                  label={"dog breeds"}
                  selectRandom={true} setValue={setBreed} value={breed}
                  randomize={randomize}>
              </SingleSelect>
              <SingleSelect
                  description={"Select an activity"}
                  label={"activities"}
                  getValues={AiChatService.getActivities}
                  selectRandom={true}
                  setValue={setActivity}
                  value={activity}
                  randomize={randomize}>
              </SingleSelect>
              <SingleSelect
                  description={"Select a color"}
                  label={"colors"}
                  getValues={AiChatService.getColors}
                  setValue={setColor}
                  value={color}
                  randomize={randomize}>
              </SingleSelect>
              <SingleSelect
                  description={"Select an environment"}
                  label={"environments"}
                  getValues={AiChatService.getEnvironments}
                  selectRandom={true}
                  setValue={setEnvironment}
                  value={environment}
                  randomize={randomize}>
              </SingleSelect>
              <SingleSelect
                  description={"Select a food"}
                  label={"foods"}
                  getValues={AiChatService.getFoods}
                  selectRandom={true}
                  setValue={setFood}
                  value={food}
                  randomize={randomize}>
              </SingleSelect>
              <SingleSelect
                  description={"Select an instrument"}
                  label={"instruments"}
                  getValues={AiChatService.getInstruments}
                  selectRandom={true}
                  setValue={setInstrument}
                  value={instrument}
                  randomize={randomize}>
              </SingleSelect>
              <Box>
                <Button sx={{width: 100, textAlign: 'left', marginRight: 2}}
                        variant="contained"
                        onClick={getImagePrompt}
                        disabled={!enabled}
                >Generate</Button>
                <Button sx={{width: 100, textAlign: 'left'}}
                        variant="contained"
                        onClick={() => setRandomize(prev => prev + 1)}
                        disabled={!enabled}
                >Randomize</Button>
              </Box>
            </ComponentStack>
          </Box>
          <Box flex={3}>
            <ImagePanel prompt={imagePrompt}/>
          </Box>
        </Box>
      </ComponentStack>
  )
}

export default ImageControl;