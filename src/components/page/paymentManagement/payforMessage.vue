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
      <el-table class="m20" :data="tableData" border height="600">
        <el-table-column type="selection" width="55" :selectable='checkboxInit'></el-table-column>
        <el-table-column prop="id" label="ID" align="center" width="100"></el-table-column>
        <el-table-column prop="orderId" label="订单ID" align="center"></el-table-column>
        <el-table-column prop="orderNub" label="订单号" align="center"></el-table-column>
        <el-table-column prop="clientName" label="客户名" align="center"></el-table-column>
        <el-table-column prop="cardNumber" label="银行卡号" align="center"></el-table-column>
        <el-table-column prop="issuingAmount" label="代发金额" align="center"></el-table-column>
        <el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
        <el-table-column prop="addTime" label="添加时间" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.state===1?'success':'info'">
              {{scope.row.state===1?'付款成功':'付款失败'}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="moreInfo(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
  import {timeFormat} from '../../../config/time'

  export default {
    name: "payforMessage",
    data() {
      return {
        dateTime: [],
        tableData:[
          {
            id : 145007,
            orderId: '145281',
            orderNub: '201806071721',
            clientName: '李仙仙',
            cardNumber: '622848312576241035',
            issuingAmount: '450.30',
            mobile: '15178445235',
            addTime: '2018-06-07 17:29:35',
            state: 1
          },
          {
            id : 145007,
            orderId: '145281',
            orderNub: '201806071721',
            clientName: '李仙仙',
            cardNumber: '622848312576241035',
            issuingAmount: '450.30',
            mobile: '15178445235',
            addTime: '2018-06-07 17:29:35',
            state: 2
          },
          {
            id : 145007,
            orderId: '145281',
            orderNub: '201806071721',
            clientName: '李仙仙',
            cardNumber: '622848312576241035',
            issuingAmount: '450.30',
            mobile: '15178445235',
            addTime: '2018-06-07 17:29:35',
            state: 1
          },
          {
            id : 145007,
            orderId: '145281',
            orderNub: '201806071721',
            clientName: '李仙仙',
            cardNumber: '622848312576241035',
            issuingAmount: '450.30',
            mobile: '15178445235',
            addTime: '2018-06-07 17:29:35',
            state: 1
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
    },
    mounted() {
      this.setDefaultDate();

    }
  }
</script>

<style scoped>

</style>
