export const calculateRating = (score) => {
  if (score >= 10) {
    return 5.0;
  } else if (score >= 9) {
    const stars = 4.5 + (score - 9) * 0.5;
    return parseFloat(stars.toFixed(1));
  } else if (score >= 1) {
    const stars = 0.5 + (score - 1) * 0.5;
    return parseFloat(stars.toFixed(1));
  } else {
    return 0.0;
  }
};

export const dateToShorString = (date) => {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const monthIndex = newDate.getMonth();
  const year = newDate.getFullYear();

  const ordinal = getOrdinal(day);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formattedDate = `${day}${ordinal} ${months[monthIndex]} ${year}`;
  return formattedDate;
};

function getOrdinal(number) {
  const suffixes = ["st", "nd", "rd", "th"];
  switch (number) {
    case 1:
      return suffixes[0];
    case 2:
      return suffixes[1];
    case 3:
      return suffixes[2];

    default:
      return suffixes[3];
  }
}
