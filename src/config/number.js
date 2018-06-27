    //计算百分比字符串带百分号1/50 50%

    export function toPercentS(a, b) {
        return (
          String(
            Number(Number(a) / Number(b) * 100).toFixed(2) === "NaN" ?
            "0.00" :
            Number(Number(a) / Number(b) * 100).toFixed(2)
          ) + "%"
        );
      }
      //计算百分比1/50  50 
      export function toPercentN(a, b) {
        let num =
          Number(Number(a) / Number(b) * 100).toFixed(2) === "NaN" ?
          0 :
          Number(Number(a) / Number(b) * 100).toFixed(2);
        return Number(num);
      }
      export default {
        toPercentS,
        toPercentN
      }
  