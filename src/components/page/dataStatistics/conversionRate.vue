<template>
    <div class="container">
                    <el-row>
                        <el-col :span="6">
                            <div>
                                <el-radio v-model="type" label="date" border>按照日期</el-radio>
                                <el-radio v-model="type" label="month" border>按照月份</el-radio>
                            </div>
                        </el-col>
                        <el-col :span="18">
                            <div class="block" v-if="type==='date'">
                                <el-date-picker
                                    v-model="time"
                                       type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                   >
                                </el-date-picker>     
                                   <el-button type="primary" icon="el-icon-search" @click="getChartInfobyDate">搜索</el-button>
                            </div>
                            <div class="block" v-if="type==='month'">
                                    <el-date-picker
                                      v-model="month"
                                      type="month"
                                      placeholder="开始月份"
                                       value-format="yyyy-MM"
                                      >

                                    </el-date-picker> 
                                    <span style="font-size:14px">至</span>
                                    <el-date-picker
                                      v-model="preMonth"
                                      type="month"
                                      value-format="yyyy-MM"
                                      placeholder="结束月份">
                                    </el-date-picker>                                                                       
                                   <el-button type="primary" icon="el-icon-search" @click="getChartInfobyMonth">搜索</el-button>
                            </div>
                        </el-col>

                    </el-row>
                    <el-row style="margin-top:40px">
	                    <div id="myChart" :style="{width: '100%', height: '500px'}"></div>
                    
                    </el-row>        
    </div>
</template>

<script>
import { getUserConversionByMonth, getUserConversionByDate } from "@/service/http";
export default {
  data() {
    return {
      type: "date",
      date: new Date(),
      month: "",
      time: [],
      preMonth: "",
      xDate: [],
      legend: ""
    };
  },
  watch: {
    preMonth: function(val) {
      console.log(val);
    }
  },
  computed: {
    dateArray: function() {
      if (time.length > 0) {
      }
    }
  },
  methods: {
    //转成2017-01-01
    getMyDate(str, type = 0) {
      var oDate = new Date(new Date(str).getTime() + type);

      var oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth() + 1,
        oDay = oDate.getDate(),
        oHour = oDate.getHours(),
        oMin = oDate.getMinutes(),
        oSen = oDate.getSeconds(),
        oTime = oYear + "-" + this.getzf(oMonth) + "-" + this.getzf(oDay); //最后拼接时间
      return oTime;
    },
    //补0操作
    getzf(num) {
      if (parseInt(num) < 10) {
        num = "0" + num;
      }
      return num;
    },
    // 开始的时候
    go(a, b) {
      let _this = this;
      getUserConversionByDate(a, b)
        .then(res => {
          let data = res.data;
          _this.xDate = data.listDate;
          _this.xDate.forEach((currentValue, index, arr) => {
            arr[index] = _this.getMyDate(arr[index], -86400000);
          });
          data.UserConversion.forEach((currentValue, index, arr) => {
            arr[index] = arr[index].toFixed(2);
          });
          _this.legend = "按日转化率";
          this.drawLine(_this.xDate, data.UserConversion, _this.legend);
        })
        .catch();
    },
    getChartInfobyDate() {
      let _this = this;
      if (this.time.length > 0) {
        getUserConversionByDate(
          this.getMyDate(this.time[0]),
          this.getMyDate(this.time[1], 86400000)
        )
          .then(res => {
            let data = res.data;
            _this.xDate = data.listDate;
            _this.xDate.forEach((currentValue, index, arr) => {
              arr[index] = _this.getMyDate(arr[index], -86400000);
            });
            data.UserConversion.forEach((currentValue, index, arr) => {
              arr[index] = arr[index].toFixed(2);
            });
            _this.legend = "按日转化率";
            this.drawLine(_this.xDate, data.UserConversion, _this.legend);
          })
          .catch();
      }
    },
    getChartInfobyMonth() {
      let _this = this;
      if (this.month !== "" && this.preMonth !== "") {
        getUserConversionByMonth(this.month + "-01", this.preMonth + "-01")
          .then(res => {
            let data = res.data;
            _this.xDate = data.listMonth;
            data.UserConversion.forEach((currentValue, index, arr) => {
              arr[index] = arr[index].toFixed(2);
            });
            _this.legend = "按月转化率";
            this.drawLine(_this.xDate, data.UserConversion, _this.legend);
          })
          .catch(console.log(this.Month));
      }
    },
    drawLine(xData, sData, legend) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "用户转化率" },
        tooltip: {},
        legend: {
          data: [legend]
        },
        xAxis: {
          type: "category",
          data: xData
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: legend,
            type: "line",
            data: sData
          }
        ]
      });
    }
  },
  mounted() {
    this.go(
      this.getMyDate(new Date(new Date().getTime() - 7 * 86400000)),
      this.getMyDate(new Date())
    );
  }
};
</script>

<style scoped>
</style>
