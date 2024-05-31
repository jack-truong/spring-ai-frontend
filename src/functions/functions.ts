
export const isEmpty = (value: string) : boolean => {
  return !value || value.length == 0;
}

export const isArrayEmpty = (values: Array<any>) : boolean => {
  return !values || values.length == 0;
}