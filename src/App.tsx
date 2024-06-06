import Header from "./components/Header.tsx";
import TabsPanel, {TabComponent} from "./components/layout/TabsPanel.tsx";
import {GiMagnifyingGlass, GiSittingDog} from "react-icons/gi";
import ImageAnalysisControl from "./components/image/ImageAnalysisControl.tsx";
import DogInfoControl from "./components/dog/DogInfoControl.tsx";
import ImageControl from "./components/image/ImageControl.tsx";
import {BsCardImage} from "react-icons/bs";
import StockControl from "./components/stock/StockControl.tsx";
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
      component: <StockControl/>,
      icon: <VscGraphLine/>,
      label: "AI Stocks"
    },
    {
      component: <ImageAnalysisControl/>,
      icon: <GiMagnifyingGlass />,
      label: "AI Image Analysis"
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
