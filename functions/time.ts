export const todayMaker = (str?: string) => {
  const date = !str ? new Date() : new Date(+str);
  const today = `${date.getFullYear()}-${
    date.getMonth().toString().length === 1
      ? `0${date.getMonth() + 1}`
      : date.getMonth() + 1
  }-${
    date.getDate().toString().length === 1
      ? `0${date.getDate()}`
      : date.getDate()
  }`;
  return today;
};
