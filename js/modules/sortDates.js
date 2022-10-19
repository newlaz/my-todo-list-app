export default (datesArray) => {
  const newDatesArray = [];
  datesArray.forEach((date) => {
    const dateNumber = new Date(moment(date, "DD/MM/YYYY"));
    newDatesArray.push(Number(dateNumber));
  })
  const sortedDates = newDatesArray.sort();
  const lastFormatArray = [];
  sortedDates.forEach((sortedDate) => {
    let dd = (new Date(sortedDate).getDate());
    let mm = (new Date(sortedDate).getMonth() + 1);
    let yy = (new Date(sortedDate).getFullYear());

    dd < 10 ? dd = "0" + dd : dd;
    mm < 10 ? mm = "0" + mm : mm;
    yy < 10 ? yy = "0" + yy : yy;

    const newDate = `${dd}/${mm}/${yy}`;
    lastFormatArray.push(newDate);
  });
  return lastFormatArray;
}