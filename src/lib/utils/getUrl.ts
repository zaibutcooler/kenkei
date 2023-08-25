const getUrl = (urlOne: string, urlTwo: string) => {
  const sortedIds = [urlOne, urlTwo].sort();
  const result = `${sortedIds[0]}--${sortedIds[1]}`;
  return result;
};

export default getUrl;
