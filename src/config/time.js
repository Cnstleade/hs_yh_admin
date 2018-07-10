//毫秒数转换成2017-01-01
export function timeFormat(value, number = 0) {
  var ms = number * 86400000;
  var d = new Date(new Date(value).getTime() + ms);
  var year = d.getFullYear();
  var month = d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) :  d.getMonth() + 1;
  var day = d.getDate() < 10 ? "0" + d.getDate() : "" + d.getDate();
  var hour = d.getHours();
  hour = hour > 9 ? hour : "0" + hour;
  var minutes = d.getMinutes();
  minutes = minutes > 9 ? minutes : "0" + minutes;
  var seconds = d.getSeconds();
  seconds = seconds > 9 ? seconds : "0" + seconds;
  return (
    year +
    "-" +
    month +
    "-" +
    day +
    " "
  );
}

export function getMonth(type, months) {
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  if (Math.abs(months) > 12) {
    months = months % 12;
  };
  if (months != 0) {
    if (month + months > 12) {
      year++;
      month = (month + months) % 12;
    } else if (month + months < 1) {
      year--;
      month = 12 + month + months;
    } else {
      month = month + months;
    };
  };
  month = month < 10 ? "0" + month : month;
  var date = d.getDate();
  var firstday = year + "-" + month + "-" + "01";
  var lastday = "";
  if (month == "01" || month == "03" || month == "05" || month == "07" || month == "08" || month == "10" || month == "12") {
    lastday = year + "-" + month + "-" + 31;
  } else if (month == "02") {
    if ((year % 4 == 0 && year % 100 != 0) || (year % 100 == 0 && year % 400 == 0)) {
      lastday = year + "-" + month + "-" + 29;
    } else {
      lastday = year + "-" + month + "-" + 28;
    };
  } else {
    lastday = year + "-" + month + "-" + 30;
  };
  var day = "";
  if (type == "s") {
    day = firstday;
  } else {
    day = lastday;
  };
  return day;
};
export default {
  timeFormat,
  getMonth
}
