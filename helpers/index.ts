const convertToProper = (str: string = '') => {
  if (str.length === 1) return str[0].toUpperCase();
  return str ? str[0].toUpperCase() + str.slice(1) : '';
};

export {convertToProper};
