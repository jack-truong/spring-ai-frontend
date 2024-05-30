import React, {useState} from 'react';
import AiService from "./services/AiService.ts";
import SingleSelectList from "./components/SingleSelectList.tsx";

type AppProps = {
  title: string;
};

const App = ({title}: AppProps) => {
  const [activity, setActivity] = useState<string>([]);
  const [color, setColor] = useState<string>([]);
  const [environment, setEnvironment] = useState<string>([]);
  const [food, setFood] = useState<string>([]);
  const [instrument, setInstrument] = useState<string>([]);

  return (
      <>
        <div>
          <h1>{title}</h1>
        </div>
        <SingleSelectList description={"Select an activity"} getValues={AiService.getActivities}
                          setValue={setActivity}></SingleSelectList>
        <SingleSelectList description={"Select a color"} getValues={AiService.getColors}
                          setValue={setColor}></SingleSelectList>
        <SingleSelectList description={"Select an environment"} getValues={AiService.getEnvironments}
                          setValue={setEnvironment}></SingleSelectList>
        <SingleSelectList description={"Select a food"} getValues={AiService.getFoods}
                          setValue={setFood}></SingleSelectList>
        <SingleSelectList description={"Select an instrument"} getValues={AiService.getInstruments}
                          setValue={setInstrument}></SingleSelectList>
      </>
  );
};

export default App;