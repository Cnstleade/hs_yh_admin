<template>
  <div class="container">
    <template>
      <el-row>
        <el-col :span="12">
          <el-button-group>
            <el-button @click="handleAllButton">全部</el-button>
            <el-button @click="handleSuccess">成功</el-button>
            <el-button @click="handleOutlist">失败</el-button>
            <el-button>已提交</el-button>
            <el-button>付款中</el-button>
          </el-button-group>
          <el-button type="primary">导出明细</el-button>
          <el-button type="info" @click="Print">打印审批单</el-button>
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
  </div>
</template>

<script>
  import {timeFormat} from '../../../config/time';
  import { print } from '../../../util/jQuery.print';
  import FileSaver from 'file-saver';
  import XLSX from 'xlsx';

  export default {
    name: "payforLog",
    data() {
      return {
        dateTime: []
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

      handleAllButton() {
      },
      handleSuccess() {
      },
      handleOutlist() {
      },
      searchTable() {
        // console.log(this.dateTime);
      },

      // 打印
      Print() {
        $("#subOutputRank-print").print({
          //Use Global styles
          globalStyles: false,
          //Add link with attrbute media=print
          mediaPrint: false,
          //Custom stylesheet
          //Print in a hidden iframe
          //Don't print this
          //Add this at top
          stylesheet: "../static/css/print.css",
          prepend: "烈焰云<br/>",
          timeout:1200
          //Add this on bottom
          // append: "<br/>Buh Bye!"
        });
      },

      //导出明细
      /*exportExcel () {
        /!* generate workbook object from table *!/
        var wb = XLSX.utils.table_to_book(document.querySelector('#outputTable'));
        /!* get binary string as output *!/
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'onlinePayment.xlsx')
        } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        return wbout
      },*/
    },
    mounted() {
      this.setDefaultDate();

    }
  }
</script>

<style scoped>

</style>
