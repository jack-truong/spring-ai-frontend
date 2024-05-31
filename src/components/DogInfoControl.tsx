import {useState} from "react";
import SingleSelect from "./SingleSelect.tsx";
import AiDogService, {BreedInfo} from "../services/AiDogService.ts";
import {GiSittingDog} from "react-icons/gi";
import MultipleSelect from "./MultipleSelect.tsx";
import ControlStack from "./ControlStack.tsx";
import {Box, Button} from "@mui/material";
import DogDetailsGrid from "./DogDetailsGrid.tsx";

const DogInfoControl = () => {
  const [breed, setBreed] = useState<string>("");
  const [characteristics, setCharacteristics] = useState<Array<string>>([]);
  const [details, setDetails] = useState<BreedInfo>();
  const [showDetails, setShowDetails] = useState(false);

  const getDetails = () => {
    setDetails(undefined);
    setShowDetails(true);
    AiDogService.getDetails(breed, characteristics)
    .then((response: any) => {
      setDetails(response.data);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  }
  return (
      <ControlStack>
        <h2>{"AI Dog Info Generation\t"}<GiSittingDog/></h2>
        <Box sx={{display: "flex"}}>
          <Box flex={1}>
            <ControlStack sx={{border: 0}}>
              <SingleSelect description={"Select a dog breed"} getValues={AiDogService.getBreeds}
                            setValue={setBreed} value={breed}></SingleSelect>
              <MultipleSelect description={"Select dog characteristics"}
                              getValues={AiDogService.getCharacteristics}
                              setValues={setCharacteristics}
                              values={characteristics}></MultipleSelect>
            </ControlStack>
          </Box>
          <Box flex={3}>
            {showDetails && <DogDetailsGrid breedInfo={details} />}
          </Box>
        </Box>
        <Button sx={{width: 200, textAlign: 'left'}} variant="contained"
                onClick={getDetails}>Generate</Button>
      </ControlStack>
  )
}

export default DogInfoControl;