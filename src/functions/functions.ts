
export const isEmpty = (value: string) : boolean => {
  return !value || value.length == 0;
}

export const isArrayEmpty = (values: Array<any>) : boolean => {
  return !values || values.length == 0;
}

export const getRandomElement = (arr: any[]) => {
  return arr.length ? arr[Math.floor(Math.random() * arr.length)] : undefined
}

export const getRandomElements = (arr: any[], size: number) => {
  const random = [];
  while (random.length < size) {
    const randomSelection = getRandomElement(arr);
    if (random.indexOf(randomSelection) == -1) {
      random.push(randomSelection);
    }
  }
  return random;
}
