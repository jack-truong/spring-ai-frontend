import Header from "./components/Header.tsx";
import DogInfoControl from "./components/DogInfoControl.tsx";
import TabsPanel, {TabComponent} from "./components/TabsPanel.tsx";
import ImageControl from "./components/ImageControl.tsx";
import {GiSittingDog} from "react-icons/gi";
import {BsCardImage} from "react-icons/bs";
import {VscGraphLine} from "react-icons/vsc";

const App = () => {
  const tabs: Array<TabComponent> = [
    {
      component: <DogInfoControl/>,
      icon: <GiSittingDog/>,
      label: "AI Dog Info Generation"
    },
    {
      component: <ImageControl/>,
      icon: <BsCardImage/>,
      label: "AI Dog Image Generation"
    },
    {
      component: <div>Stocks TBD</div>,
      icon: <VscGraphLine/>,
      label: "AI Stocks"
    }
  ]
  return (
      <>
        <Header title={"AI Demo"}/>
        <TabsPanel tabs={tabs}/>
      </>
  );
};

export default App;