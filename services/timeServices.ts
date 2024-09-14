export const getCurrentMonthAndYear = () => {
  const currentDate = new Date();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // getMonth() returns 0-11, so add 1
  const year = currentDate.getFullYear().toString();
  return `Tháng ${month}.${year}`;
};
