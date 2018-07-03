<template>
  <!--时间格式化|dateServer-->
  <div class="container">
    <template>
      <el-row>
        <el-col :span="24">
          <el-date-picker
            v-model="dateTime"
            type="daterange"
            @blur="chooseTime"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp">
          </el-date-picker>
          <el-button icon="el-icon-search" type="primary" @click="searchTable"></el-button>
        </el-col>
      </el-row>
    </template>
    <template>
      <el-table class="m20"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="logList"
                border height="600">
        <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
        <el-table-column prop="operation" label="操作" align="center"></el-table-column>
        <el-table-column prop="time" label="操作用时" align="center"></el-table-column>
        <el-table-column prop="method" label="操作方法" align="center"></el-table-column>
        <el-table-column prop="params" label="参数" align="center"></el-table-column>
        <el-table-column prop="ip" label="IP" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="location" label="地址" align="center"></el-table-column>
      </el-table>
    </template>
    <template>
      <el-pagination
        style="margin-top: 10px;text-align: right;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </template>
  </div>
</template>

<script>
  import {timeFormat} from "../../../config/time";
  import {Message} from "element-ui";
  import {config} from "../../../util/config";

  export default {
    data() {
      return {
        dateTime: [],                 // 选中时间
        startTime: '',                // 开始时间
        endTime: '',                  // 结束时间
        loading: true,

        currentPage: 1,
        pageSize: 10,
        total: null,
        logList: []
      };
    },

    // 监听
    watch: {},

    // 计算
    computed: {},

    // 方法
    methods: {

      // 查询全部订单
      queryLogList(a, b) {
        let postDate = {
          pageNumber: a,
          pageSize: b,
          startDateString: this.startTime,
          finshDateString: this.endTime,
        };
        $.ajax({
          type: "POST",
          url: config.baseURL + "/admin/adminLogs",
          data: postDate,
          success: data => {
            this.logList = data.list;
            this.total = data.total;
            this.loading = false;
          },
          error: err => {
            console.log(err);
          }
        });
      },

      // 搜索
      searchTable() {
        this.queryLogList(this.currentPage, this.pageSize);
      },

      // 选择时间
      chooseTime() {
        this.startTime = this.getMyDate(this.dateTime[0]);
        this.endTime = this.getMyDate(this.dateTime[1]);
      },

      // 表格时间转换
      dateFormat: function (row, column) {
        let date = row[column.property];
        if (date == undefined) {
          return "";
        }
        let dateTime = new Date(date),
          y = dateTime.getFullYear(),
          m = dateTime.getMonth() + 1,
          d = dateTime.getDate(),
          h = dateTime.getHours(),
          i = dateTime.getMinutes(),
          s = dateTime.getSeconds();
        return (
          y +
          "/" +
          this.getzf(m) +
          "/" +
          this.getzf(d) +
          " " +
          this.getzf(h) +
          ":" +
          this.getzf(i) +
          ":" +
          this.getzf(s)
        );
      },

      //转成2017-01-01
      getMyDate(str) {
        let oDate = new Date(str),
          oYear = oDate.getFullYear(),
          oMonth = oDate.getMonth() + 1,
          oDay = oDate.getDate(),
          oHour = oDate.getHours(),
          oMin = oDate.getMinutes(),
          oSen = oDate.getSeconds();
        return oYear + "-" + this.getzf(oMonth) + "-" + this.getzf(oDay) + ' ' + this.getzf(oHour) + ':' + this.getzf(oMin) + ':' + this.getzf(oSen); //最后拼接时间

      },

      //补0操作
      getzf(num) {
        if (parseInt(num) < 10) {
          num = "0" + num;
        }
        return num;
      },

      // 分页插件-数量改变事件
      handleSizeChange(val) {
        this.pageSize = val;
        this.queryLogList(this.currentPage, this.pageSize);
      },

      // 分页插件-页数改变事件
      handleCurrentChange(val) {
        this.currentPage = val;
        this.queryLogList(this.currentPage, this.pageSize);
      }
    },
    mounted() {
      // 查询全部列表
      this.queryLogList(this.currentPage, this.pageSize);
    }
  };
</script>
<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }
</style>
<style scoped>
</style>
