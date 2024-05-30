import {useEffect, useState} from 'react';
import AiService from "./services/AiService.ts";

type AppProps = {
  title: string;
};

const App = ({title}: AppProps) => {
  const [activities, setActivities] = useState<Array<string>>([]);

  const retrieveActivities = () => {
    console.log("### Loading activities")
    AiService.getActivities()
    .then((response: any) => {
      setActivities(response.data);
      console.log(response.data);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  };
  useEffect(() => {
    retrieveActivities();
  }, []);

  return (
      <div>
        <h1>{title}</h1>
        <ul>
          {activities.map((value, index) => {
            return (
                <li key={index}>
                  <div>
                    {value}
                  </div>
                </li>
            );
          })}
        </ul>
      </div>
  );
};

export default App;