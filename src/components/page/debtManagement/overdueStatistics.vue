<template>
  <div class="container">
    <el-row>
      <el-alert
        title="审核逾期统计"
        :closable="false"
        type="info">
      </el-alert>
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
  import {config} from "../../../util/config";
  export default {
    data() {
      return {
        overdueTable: [],
      };
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
          type: 'GET',
          url: config.baseURL+'/sys/loanandexceed',
          success: data => {
            console.log(data);
            this.overdueTable = data;
          },
          error: err => {
            console.log(err);
          }
        })
      }
      ,
    },
    mounted() {
      this.queryOverdueStatistical();
    }
  };
</script>
<style scoped>
</style>

