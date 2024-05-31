import Header from "./components/Header.tsx";
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