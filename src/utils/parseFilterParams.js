const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;

  const isContactType = (contactType) =>
    ['personal', 'home', 'work'].includes(contactType);
  if (isContactType) return contactType;
  return;
};

const parseIsFavourite = (favourite) => {
  let isFavourite = typeof favourite === 'string';
  if (isFavourite) return favourite.toLowerCase() === 'true' ? true : false;

  isFavourite = typeof favourite === 'boolean';
  if (isFavourite) return favourite;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedContactType = parseContactType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
