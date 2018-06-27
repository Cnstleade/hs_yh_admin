<template>
  <div class="container">
    <template>
      <el-form class="formBox" ref="form" :model="form" size="mini" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="form.cardid"></el-input>
        </el-form-item>
        <el-form-item label="申请时间">
          <el-date-picker
            v-model="form.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" @click="handSearch">搜索</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template>

      <el-table :data="tableData" border height="650" id="tableItemStyle" class="m20">
        <el-table-column
          prop="id"
          label="序号"
          width="50"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="userName"
          label="姓名"
          align="center">
        </el-table-column>
        <el-table-column
          prop="mobileDetails"
          label="手机详情"
          align="center">
        </el-table-column>
        <el-table-column
          prop="approveAmt"
          label="申请价格"
          align="center">
        </el-table-column>
        <el-table-column
          prop="approveTerm"
          label="期限"
          align="center">
        </el-table-column>
        <el-table-column
          prop="approveResult"
          label="审核状态"
          align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.approveResult ===1?'':(scope.row.approveResult===2?'danger':(scope.row.approveResult===3?'success':(scope.row.approveResult===4?'info':(scope.row.approveResult===5?'warning':'success'))))">
              {{scope.row.approveResult
              ===1?'审核中':(scope.row.approveResult===2?'拒绝':(scope.row.approveResult===3?'通过审核':(scope.row.approveResult===4?'已打款':(scope.row.approveResult===5?'还款':'完结'))))}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="channel"
          label="渠道"
          align="center">
        </el-table-column>
        <el-table-column
          label="创建时间"
          width="200"
          align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.createtime |dateServer }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
        </el-table-column>
      </el-table>
    </template>
    <template>
      <el-pagination
        style="margin-top: 10px;text-align: right"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="pageSize"
        background
        layout="sizes,prev, pager, next"
        :total="total">
      </el-pagination>

    </template>
  </div>
</template>

<script>
  import {MessageBox} from "element-ui";
  import {Message} from "element-ui";
  import {config} from "../../../util/config";
  import {getLoanorder} from "@/service/http";

  export default {
    name: "bindApproval",
    data() {
      return {
        form: {
          name: "",
          cardid: "",
          phone: "",
          time: []
        },
        currentTime1: "",
        currentTime2: "",
        tableData: [],
        total: 0,
        pageSize: 10,
        currentPage: 1
      };
    },
    watch: {
      form: {
        handler: function (val, oldval) {
          console.log(val.name);
          if (val.name === "" && val.cardid === "" && val.phone === "" && val.time.length == 0) {
            this.getTableData(
              this.currentPage,
              this.pageSize,
              this.form.name,
              this.form.phone,
              this.form.cardid,
              this.currentTime1,
              this.currentTime2
            );
          }
        },
        deep: true //对象内部的属性监听，也叫深度监听
      }
    },
    methods: {
      //转成2017-01-01
      getMyDate(str) {
        let oDate = new Date(str),
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
      getTableData(npage, pagesize, username, mobile, idNo, start, finsh, channel) {
        // let _this = this;
        /*getLoanorder(npage, pagesize, username, mobile, idNo, start, finsh, channel)
          .then(res => {
            let data = res.data;
            _this.tableData = data.rows;
            _this.total = data.total;
          })
          .catch();*/
        let params = {
          npage,
          pagesize,
          userName,
          mobile,
          idNo,
          start,
          finsh,
          channel
        };
        $.ajax({
          type: 'POST',
          url: config.baseURL + '/sys/loanorder',
          data: params,
          success: (data) => {
            console.log(data);
          },
          error: (err) => {
          }

        })
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getTableData(val, this.pageSize);
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.getTableData(this.currentPage, this.pageSize);
      },
      handSearch() {
        this.currentPage = 1;
        console.log(this.form.time);
        if (!this.form.time) {
          this.getTableData(
            this.currentPage,
            this.pageSize,
            this.form.name,
            this.form.phone,
            this.form.cardid,
            "",
            ""
          );
        } else {
          this.currentTime1 = this.getMyDate(this.form.time[0]);
          this.currentTime2 = this.getMyDate(this.form.time[1]);
          console.log(this.currentTime1, this.currentTime2);
          this.getTableData(
            this.currentPage,
            this.pageSize,
            this.form.name,
            this.form.phone,
            this.form.cardid,
            this.currentTime1,
            this.currentTime2
          );
        }
      }
    },
    mounted() {
      this.getTableData(this.currentPage, this.pageSize, this.form.name, this.form.phone, this.form.cardid, this.currentTime1, this.currentTime2);
    }
  };
</script>
<style>
  #tableItemStyle .el-tag {
    width: 70px;
  }
</style>
<style scoped>
  .el-form-item {
    margin-bottom: 0;
  }

  .formBox {
    display: flex;
    margin-left: -38px;
  }
</style>
