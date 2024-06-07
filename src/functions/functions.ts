export const isEmpty = (value: string): boolean => {
  return !value || value.length == 0;
}

export const isArrayEmpty = (values: Array<any>): boolean => {
  return !values || values.length == 0;
}

export const getRandomElement = (arr: any[]) => {
  return arr.length ? arr[Math.floor(Math.random() * arr.length)] : undefined
}

export const getRandomElements = (arr: any[], size: number) => {
  if (arr.length <= size) {
    return arr;
  }

  const random = [];
  while (random.length < size) {
    const randomSelection = getRandomElement(arr);
    if (random.indexOf(randomSelection) == -1) {
      random.push(randomSelection);
    }
  }
  return random;
}

export const toBase64FromFile = (file: File) => new Promise((resolve, reject) => {
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  }
});

export const toBase64FromUrl = (url: string) => new Promise((resolve, reject) => {
  fetch(url)
  .then((response) => response.blob())
  .then((blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
});
