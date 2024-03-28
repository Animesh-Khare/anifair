import moment from "moment";

export const equal = (obj1, obj2 = 0) => obj1 === obj2;

export const lowerCase = (value) => value?.toLowerCase();

export const ternary = (bool, truthy, falsy) => (bool ? truthy : falsy);

export const length = (obj) => obj?.length;

export const head = (obj) => obj?.[0];

export const last = (obj) => obj[length(obj) - 1];

export const getObject = (array, key) => {
  return array.find((obj) => equal(obj.name, key));
};

export const getTotalOfArrayObj = (array, key) => {
  return array.reduce((total, obj) => total + obj[key], 0);
};

export const values = (object) => (object ? Object.values(object) : []);

export const keys = (object) => (object ? Object.keys(object) : []);

export const isArray = (obj) => Array.isArray(obj);

export const getMonth = (value) => {
  const joinedAtDate = moment(value);
  return joinedAtDate.format("MMMM");
};

export const getYear = (value) => {
  const joinedAtDate = moment(value);
  return joinedAtDate.year();
};

export const getDayOftheWeek = (date) => {
  const newDate = new Date(date);
  return newDate.getDay();
};

export const checkUndefined = (obj) => obj === undefined;

export const typeOf = (val, type) => equal(typeof val, type);

export const pascalCase = (str) => {
  if (!str) return str;
  const words = str.split(" ");
  if (words.length <= 1)
    return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
  const newStr = words
    .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return newStr;
};

export const strDateToISODate = (date) => new Date(date).toISOString();

export const isObjectEmpty = (objectName) =>
  Object.keys(objectName).length === 0;

export const truncateWithEllipsis = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  } else {
    const truncatedText = text.slice(0, maxLength - 3);
    return (
      <>
        {truncatedText}
        <span title={text}>{"\u2026"}</span>
      </>
    );
  }
};
