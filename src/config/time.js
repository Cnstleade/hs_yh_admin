//毫秒数转换成2017-01-01
export function timeFormat(value, number = 0) {
    var ms = number * 86400000;
    var d = new Date(new Date(value).getTime() + ms);
    var year = d.getFullYear();
    var month = d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : "" + d.getMonth() + 1;
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
  
  export default {
    timeFormat
  }
  