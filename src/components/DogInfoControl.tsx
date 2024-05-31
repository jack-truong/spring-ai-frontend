import {useState} from "react";
import SingleSelect from "./SingleSelect.tsx";
import {Stack} from "@mui/material";
import AiDogService from "../services/AiDogService.ts";
import {GiSittingDog} from "react-icons/gi";
import MultipleSelect from "./MultipleSelect.tsx";

const DogInfoControl = () => {
  const [breed, setBreed] = useState<string>("");
  const [characteristics, setCharacteristics] = useState<Array<string>>([]);

  return (
      <Stack sx={{ border: 3, padding: 2 }} spacing={5}>
        <h2>{"AI Dog Info Generation\t"}<GiSittingDog/></h2>
        <SingleSelect description={"Select a dog breed"} getValues={AiDogService.getBreeds}
                      setValue={setBreed} value={breed} ></SingleSelect>

        <MultipleSelect description={"Select dog characteristics"} getValues={AiDogService.getCharacteristics}
                      setValues={setCharacteristics} values={characteristics} ></MultipleSelect>
        <div>{`Breed: ${breed}, Characteristics: ${characteristics}`}</div>
      </Stack>
  )
}

export default DogInfoControl;