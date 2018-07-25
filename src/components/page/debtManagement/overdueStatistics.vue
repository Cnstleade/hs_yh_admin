<template>
  <div class="container">
    <el-row>
      <el-alert
        title="审核逾期统计"
        :closable="false"
        type="info">
      </el-alert>
    </el-row>
        <el-row class="m20" >
            <el-col :span="6">
                <el-button  icon="el-icon-plus" @click="export2Excel">导出excel</el-button>
            </el-col>             

        </el-row>     
    <el-row class="m20">
      <!--:span-method="objectSpanMethod"-->
      <el-table
        :data="overdueTable"
        border
        style="width: 100%">
        <!--<el-table-column prop="jl" align='center' label="审核经理"  ></el-table-column>-->
        <!--<el-table-column prop="tj" align='center' label="统计" width="240" ></el-table-column>-->
        <el-table-column prop="username" align='center' label="审核员"></el-table-column>
        <el-table-column prop="applyNumber" align='center' label="订单总数"></el-table-column>
        <el-table-column prop="allOverdueMoney" align='center' label="总逾期本金"></el-table-column>
        <el-table-column prop="allLate_free" align='center' label="总逾期违约金"></el-table-column>
        <el-table-column align='center' label="m1逾期订单">
          <template slot-scope="scope">
            <span>{{(scope.row.overdueApplyNumber_m1/scope.row.applyNumber).toFixed(2)}}%</span>
          </template>
        </el-table-column>
        <el-table-column prop="allOverdueMoney_m1" align='center' label="m1本金总额"></el-table-column>
        <el-table-column prop="allLate_free_m1" align='center' label="m1违约金"></el-table-column>
        <el-table-column align='center' label="m2逾期订单">
          <template slot-scope="scope">
            <span>{{(scope.row.overdueApplyNumber_m2/scope.row.applyNumber).toFixed(2)}}%</span>
          </template>
        </el-table-column>
        <el-table-column prop="allOverdueMoney_m2" align='center' label="m2本金总额"></el-table-column>
        <el-table-column prop="allLate_free_m2" align='center' label="m2违约金"></el-table-column>
        <el-table-column align='center' label="m3逾期订单">
          <template slot-scope="scope">
            <span>{{(scope.row.overdueApplyNumber_m3/scope.row.applyNumber).toFixed(2)}}%</span>
          </template>
        </el-table-column>
        <el-table-column prop="allOverdueMoney_m3" align='center' label="m3本金总额"></el-table-column>
        <el-table-column prop="allLate_free_m3" align='center' label="m3违约金"></el-table-column>
        <el-table-column align='center' label="m3+逾期订单">
          <template slot-scope="scope">
            <span>{{(scope.row.overdueApplyNumber_m4/scope.row.applyNumber).toFixed(2)}}%</span>
          </template>
        </el-table-column>
        <el-table-column prop="allOverdueMoney_m4" align='center' label="m3+本金总额"></el-table-column>
        <el-table-column prop="allLate_free_m4" align='center' label="m3+违约金"></el-table-column>
      </el-table>
    </el-row>
  </div>
</template>
<script>

import { mapGetters } from "vuex";
import { config } from "../../../util/config";
import { timeFormat } from "../../../config/time";
export default {
  data() {
    return {
      overdueTable: []
    };
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      "loginId"
      // ...
    ])
  },  
  methods: {
    /*objectSpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0 || columnIndex === 1) {
          if (rowIndex % 4 === 0) {
            return {
              rowspan: 4,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },*/
    // 查询逾期统计列表
    queryOverdueStatistical() {
      $.ajax({
        type: "POST",
        url: config.baseURL + "/sys/loanandexceed",
        data: { loginId: this.loginId },
        success: data => {
          console.log(data);
          this.overdueTable = data;
        },
        error: err => {
          console.log(err);
        }
      });
    },
    //excel导出数据
    export2Excel() {
      require.ensure([], () => {
        const {
          export_json_to_excel
        } = require("../../../vendor/Export2Excel");
        const tHeader = [
          "序号",
          "审核员",
          "订单总数",
          "总逾期本金",
          "总逾期违约金",
          "m1逾期订单",
          "m1本金总额",
          "m1违约金",
          "m2逾期订单",
          "m2本金总额",
          "m2违约金",
          "m3逾期订单",
          "m3本金总额",
          "m3违约金",
          "m3+逾期订单",
          "m3+本金总额",
          "m3+违约金"
        ];
        const filterVal = [
          "id",
          "username",
          "applyNumber",
          "allOverdueMoney",
          "allLate_free",
          "allOverdueMoney_m1",
          "allLate_free_m1",
          "m1",
          "allOverdueMoney_m2",
          "allLate_free_m2",
          "m2",
          "allOverdueMoney_m3",
          "allLate_free_m3",
          "m3",
          "allOverdueMoney_m4",
          "allLate_free_m4",
          "m4"
        ];
        let list = JSON.parse(JSON.stringify(this.overdueTable));

        for (var i = 0; i < list.length; i++) {
          // list[i].status =
          //   list[i].status === 4
          //     ? "借款中"
          //     : list[i].status === 8 ? "完结" : "";
          // list[i].cash_outType =
          //   list[i].cash_outType === 0
          //     ? "无提现记录"
          //     : list[i].cash_outType === 1 ? "有余额" : "无余额";
          list[i].m1 = (
            list[i].overdueApplyNumber_m1 / list[i].applyNumber
          ).toFixed(2);
          list[i].m2 = (
            list[i].overdueApplyNumber_m2 / list[i].applyNumber
          ).toFixed(2);
          list[i].m3 = (
            list[i].overdueApplyNumber_m3 / list[i].applyNumber
          ).toFixed(2);
          list[i].m4 = (
            list[i].overdueApplyNumber_m4 / list[i].applyNumber
          ).toFixed(2);
        }
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "滞纳金管理");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  },
  mounted() {
    this.queryOverdueStatistical();
  }
};
</script>
<style scoped>
</style>

