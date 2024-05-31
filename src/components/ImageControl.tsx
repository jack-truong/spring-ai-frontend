import {useState} from "react";
import SingleSelect from "./SingleSelect.tsx";
import AiChatService from "../services/AiChatService.ts";
import {BsCardImage} from "react-icons/bs";
import ControlStack from "./ControlStack.tsx";

const ImageControl = () => {
  const [activity, setActivity] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [environment, setEnvironment] = useState<string>("");
  const [food, setFood] = useState<string>("");
  const [instrument, setInstrument] = useState<string>("");

  return (
      <ControlStack>
        <h2>{"AI Image Generation\t"}<BsCardImage/></h2>
        <SingleSelect description={"Select an activity"} getValues={AiChatService.getActivities}
                      selectRandom={true} setValue={setActivity} value={activity}></SingleSelect>
        <SingleSelect description={"Select a color"} getValues={AiChatService.getColors}
                      selectRandom={true} setValue={setColor} value={color}></SingleSelect>
        <SingleSelect description={"Select an environment"}
                      getValues={AiChatService.getEnvironments}
                      selectRandom={true} setValue={setEnvironment} value={environment}></SingleSelect>
        <SingleSelect description={"Select a food"} getValues={AiChatService.getFoods}
                      selectRandom={true} setValue={setFood} value={food}></SingleSelect>
        <SingleSelect description={"Select an instrument"}
                      getValues={AiChatService.getInstruments}
                      selectRandom={true} setValue={setInstrument} value={instrument}></SingleSelect>
      </ControlStack>
  )
}

export default ImageControl;