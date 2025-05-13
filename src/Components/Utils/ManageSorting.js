export const parseDate = (dateString) => {
  const [datePart, timePart] = dateString.split(", ");
  const [day, month, year] = datePart.split("/");
  return new Date(`${year}-${month}-${day} ${timePart}`);
};
