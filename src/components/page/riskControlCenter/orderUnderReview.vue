<template>
  <div class="container">
    <template>
      <el-row>
        <el-col :span="12">
          <el-button-group>
            <el-button>全部</el-button>
            <el-button>待启用订单</el-button>
            <el-button>审核中订单</el-button>
            <el-button>待通过订单</el-button>
          </el-button-group>
        </el-col>
        <el-col :span="12" style="text-align: right">
          <el-date-picker
            v-model="dateTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp">
          </el-date-picker>
          <el-input placeholder="请输入关键字" style="width: 200px"></el-input>
          <el-button icon="el-icon-search" type="primary" @cleck="searchTable"></el-button>
        </el-col>
      </el-row>
    </template>
    <template>

    </template>
  </div>
</template>

<script>
  import {timeFormat} from '../../../config/time'

  export default {
    name: "orderUnderReview",
    data() {
      return {
        dateTime: [],
      }
    },
    methods: {

      //转成2017-01-01
      getMyDate(str) {
        var oDate = new Date(str),
          oYear = oDate.getFullYear(),
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

      //默认日期显示一周
      setDefaultDate() {
        let newDate = new Date();
        let year = newDate.getFullYear(),
          month = newDate.getMonth() + 1,
          day = newDate.getDate(),
          defualtDate = year + "-" + this.getzf(month) + "-" + this.getzf(day),
          defualtEndDate = timeFormat(defualtDate, -6);

        this.dateTime.push(new Date(defualtEndDate).getTime(), new Date(defualtDate).getTime());
        console.log(this.dateTime);
      },
    },
    mounted() {
      this.setDefaultDate();

    }
  }
</script>

<style scoped>

</style>
