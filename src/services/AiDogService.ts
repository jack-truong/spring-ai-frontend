import http from "../http-common";

type Characteristic = {
  name: string;
  value: string;
};

export type BreedInfo = {
  breed: string;
  characteristics: Array<Characteristic>;
};

const getBreeds = () => {
  return http.get<Array<String>>("/dog/breeds");
};

const getCharacteristics = () => {
  return http.get<Array<String>>("/dog/characteristics");
};

const getDetails = () => {
  return http.get<BreedInfo>("/dog/details");
};

const AiDogService = {
  getBreeds: getBreeds,
  getCharacteristics: getCharacteristics,
  getDetails: getDetails
};

export default AiDogService;