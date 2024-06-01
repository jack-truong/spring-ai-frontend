import {useState} from "react";
import SingleSelect from "./SingleSelect.tsx";
import AiDogService, {BreedInfo} from "../services/AiDogService.ts";
import {GiSittingDog} from "react-icons/gi";
import MultipleSelect from "./MultipleSelect.tsx";
import ComponentStack from "./ComponentStack.tsx";
import {Box, Button} from "@mui/material";
import DogDetailsGrid from "./DogDetailsGrid.tsx";
import {isArrayEmpty, isEmpty} from "../functions/functions.ts";

const DogInfoControl = () => {
  const [randomize, setRandomize] = useState(0);
  const [breed, setBreed] = useState<string>("");
  const [characteristics, setCharacteristics] = useState<Array<string>>([]);
  const [details, setDetails] = useState<BreedInfo>();
  const [showDetails, setShowDetails] = useState(false);

  const getDetails = () => {
    console.log(`### Loading dog details ${breed} ${characteristics}`)
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
  const enabled: boolean = !isEmpty(breed) && !isArrayEmpty(characteristics);

  return (
      <ComponentStack sx={{border: 3}}>
        <Box sx={{display: "flex"}}>
          <Box flex={1}>
            <ComponentStack>
              <SingleSelect description={"Select a dog breed"} getValues={AiDogService.getBreeds}
                            selectRandom={true} setValue={setBreed} value={breed}
                            randomize={randomize}></SingleSelect>
              <MultipleSelect description={"Select dog characteristics"}
                              getValues={AiDogService.getCharacteristics}
                              setValues={setCharacteristics}
                              values={characteristics}></MultipleSelect>
              <Box>
                <Button sx={{width: 100, textAlign: 'left', marginRight: 2}}
                        variant="contained"
                        onClick={getDetails}
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
            {showDetails && <DogDetailsGrid breedInfo={details}/>}
          </Box>
        </Box>
      </ComponentStack>
  )
}

export default DogInfoControl;