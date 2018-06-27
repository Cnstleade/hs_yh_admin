<template>
  <div class="container">
    <template>
      <el-row>
        <el-col :span="12">
          <el-button-group>
            <el-button @click="handleAllButton">全部</el-button>
            <el-button @click="handleOutlist">解约失败</el-button>
            <el-button>还款成功</el-button>
          </el-button-group>
          <el-button type="primary" @click="exportExcel">导出明细</el-button>
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
      <el-table class="m20" :data="tableData" border height="600" id="outputTable">
        <el-table-column prop="id" label="ID" align="center" width="100"></el-table-column>
        <el-table-column prop="orderId" label="订单ID" align="center"></el-table-column>
        <el-table-column prop="clientName" label="客户名" align="center"></el-table-column>
        <el-table-column prop="ODV" label="催收员" align="center"></el-table-column>
        <el-table-column prop="mobile" label="手机号" align="center" width="150"></el-table-column>
        <el-table-column prop="totalMoney" label="还款总金额	" align="center"></el-table-column>
        <el-table-column prop="monthlyPayment" label="月供" align="center"></el-table-column>
        <el-table-column prop="overdueFine" label="滞纳金" align="center"></el-table-column>
        <el-table-column prop="paymentOrder" label="连连支付单号" align="center" width="200"></el-table-column>
        <el-table-column prop="addTime" label="添加时间" align="center" width="150"></el-table-column>
        <el-table-column label="还款类型" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.paymentType===1?'success':'info'">
              {{scope.row.paymentType===1?'线上':'线下'}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="还款状态" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.paymentState===1?'SUCCESS':'DEFEATED'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="解约状态" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.rescindState===1?'成功':'失败'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="onlinePaymentInfo(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>


    <template>
      <el-dialog title="还款记录详情" :visible.sync="dialogTableVisible">
        <el-table :data="tableData">
          <el-table-column prop="id" label="ID" align="center" width="100"></el-table-column>
          <el-table-column prop="orderId" label="订单ID" align="center"></el-table-column>
          <el-table-column prop="clientName" label="客户名" align="center"></el-table-column>
          <el-table-column prop="totalMoney" label="还款总金额	" align="center"></el-table-column>
          <el-table-column prop="monthlyPayment" label="月供" align="center"></el-table-column>
          <el-table-column prop="overdueFine" label="滞纳金" align="center"></el-table-column>
        </el-table>
      </el-dialog>
    </template>
  </div>
</template>

<script>
  import {timeFormat} from '../../../config/time';
  import FileSaver from 'file-saver';
  import XLSX from 'xlsx';

  export default {
    name: "onlinePayment",
    data() {
      return {
        dialogTableVisible:false,
        dateTime: [],
        tableData:[
          {
            id : 145007,
            orderId: '145281',
            clientName: '李仙仙',
            ODV: '李四',
            mobile: '15178445235',
            totalMoney: '5000.45',
            monthlyPayment: '1000',
            overdueFine: '1780.00',
            paymentOrder: '2018060718112',
            addTime: '2018-06-07 17:29:35',
            paymentType: 1,
            paymentState: 1,
            rescindState: 1
          },
          {
            id : 145007,
            orderId: '145281',
            clientName: '李仙仙',
            ODV: '李四',
            mobile: '15178445235',
            totalMoney: '5000.45',
            monthlyPayment: '1000',
            overdueFine: '1780.00',
            paymentOrder: '2018060718112',
            addTime: '2018-06-07 17:29:35',
            paymentType: 2,
            paymentState: 2,
            rescindState: 2
          },
          {
            id : 145007,
            orderId: '145281',
            clientName: '李仙仙',
            ODV: '李四',
            mobile: '15178445235',
            totalMoney: '5000.45',
            monthlyPayment: '1000',
            overdueFine: '1780.00',
            paymentOrder: '2018060718112',
            addTime: '2018-06-07 17:29:35',
            paymentType: 1,
            paymentState: 2,
            rescindState: 1
          },
          {
            id : 145007,
            orderId: '145281',
            clientName: '李仙仙',
            ODV: '李四',
            mobile: '15178445235',
            totalMoney: '5000.45',
            monthlyPayment: '1000',
            overdueFine: '1780.00',
            paymentOrder: '2018060718112',
            addTime: '2018-06-07 17:29:35',
            paymentType: 2,
            paymentState: 1,
            rescindState: 2
          },
          {
            id : 145007,
            orderId: '145281',
            clientName: '李仙仙',
            ODV: '李四',
            mobile: '15178445235',
            totalMoney: '5000.45',
            monthlyPayment: '1000',
            overdueFine: '1780.00',
            paymentOrder: '2018060718112',
            addTime: '2018-06-07 17:29:35',
            paymentType: 2,
            paymentState: 2,
            rescindState: 1
          }
        ]
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

      },

      //导出明细
      exportExcel () {
        /* generate workbook object from table */
        var wb = XLSX.utils.table_to_book(document.querySelector('#outputTable'));
        /* get binary string as output */
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'onlinePayment.xlsx')
        } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        return wbout
      },

      onlinePaymentInfo(){
        this.dialogTableVisible = true;
      }
    },
    mounted() {
      this.setDefaultDate();

    }
  }
</script>

<style scoped>

</style>
