import Header from "./components/Header.tsx";
import ImageControl from "./components/ImageControl.tsx";
import DogInfoControl from "./components/DogInfoControl.tsx";

const App = () => {


  return (
      <>
        <Header title={"AI Demo"}/>
        <DogInfoControl/>
        {/*<ImageControl/>*/}
      </>
  );
};

export default App;