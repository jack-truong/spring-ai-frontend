import Header from "./components/Header.tsx";
import ImageControl from "./components/ImageControl.tsx";

const App = () => {


  return (
      <>
        <Header title={"AI Demo"} />
        <ImageControl breed={"Shiba Inu"} />
      </>
  );
};

export default App;