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

const getDetails = (breed: string, characteristics: Array<string>) => {
  return http.get<BreedInfo>("/dog/details",
      {
        params: {
          breed: breed,
          characteristics: characteristics.join(","),
        },
      }
  );
};

const getImagePrompt = (
    breed: string,
    activity: string,
    color : string,
    environment : string,
    food : string,
    instrument : string,
) => {
  return http.get<BreedInfo>("/dog/image-prompt",
      {
        params: {
          breed: breed,
          activity: activity,
          color: color,
          environment: environment,
          food: food,
          instrument: instrument,
        },
      }
  );
};

const AiDogService = {
  getBreeds: getBreeds,
  getCharacteristics: getCharacteristics,
  getDetails: getDetails,
  getImagePrompt: getImagePrompt
};

export default AiDogService;