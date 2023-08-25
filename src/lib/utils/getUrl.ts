const getUrl = (urlOne: string, urlTwo: string) => {
  const sortedIds = [urlOne, urlTwo].sort();
  return `${sortedIds[0]}--${sortedIds[1]}`;
};

export default getUrl;
