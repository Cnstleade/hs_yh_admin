let dateServer = value => {
    var d = new Date(value);
    var year = d.getFullYear();
    var month = d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
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
        " " +
        hour +
        ":" +
        minutes +
        ":" +
        seconds
    );
}
export {
    dateServer
}
