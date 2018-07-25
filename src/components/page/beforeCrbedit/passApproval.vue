<template>
    <div class="container">
        <template>
            <el-form  :model="formInline" class="demo-form-inline" size="mini" label-width="80px">
                <el-form-item label="姓名" size="mini">
                    <el-input v-model="formInline.name" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input v-model="formInline.phone" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input v-model="formInline.IDE" placeholder="身份证"></el-input>
                </el-form-item>
                <el-form-item label="渠道">
                    <el-select v-model="formInline.region" placeholder="渠道">
                        <el-option label="渠道一" value="1"></el-option>
                        <el-option label="渠道二" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="申请时间">
                    <el-date-picker
                        v-model="formInline.time"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="timestamp">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handSearch">查询</el-button>
                </el-form-item>
            </el-form>
        </template>
        <template>
                    <el-table  class="m20" style="width: 100%" :data="tableData">
                        <el-table-column prop="id" label="序号" align="center"></el-table-column>
                        <el-table-column prop="userName" label="借款人姓名" align="center"></el-table-column>
                        <el-table-column prop="mobile" label="手机号码" width="120" align="center"></el-table-column>
                        <el-table-column prop="approveAmt" label="借款金额" align="center"></el-table-column>
                        <el-table-column prop="approveTerm" label="借款期限" align="center"></el-table-column>
                        <el-table-column prop="channel" label="渠道" align="center"></el-table-column>
                        <el-table-column prop="applyTime" label="申请时间" align="center" width="200">
                            <template slot-scope="scope">
                                <i class="el-icon-time"></i>
                                <span style="margin-left: 10px">{{ scope.row.applyTime |dateServer }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="approverName" label="审核人" align="center"></el-table-column>
                        <el-table-column prop="approveResult" label="订单状态" align="center"></el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button type="primary" size="mini">
                                    查看
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <template>
                    <el-pagination
                        style="margin-top:10px;float:right" v-if="total>0"
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="pageSize"
                        background
                        layout="total,sizes,prev, pager, next,jumper"
                        :total="total">
                    </el-pagination>
        </template>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getOverList } from "@/service/http";

export default {
  name: "passApproval",
  data() {
    return {
      formInline: {
        name: "",
        phone: "",
        IDE: "",
        region: "",
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
    formInline: {
      handler: function(val, oldval) {
        if (
          val.name === "" &&
          val.IDE === "" &&
          val.phone === "" &&
          val.time.length == 0 &&
          val.region === ""
        ) {
          this.getTableData(
            this.currentPage,
            this.pageSize,
            true,
            this.formInline.name,
            this.formInline.phone,
            this.formInline.cardid,
            this.currentTime1,
            this.currentTime2,
            this.formInline.region
          );
        }
      },
      deep: true //对象内部的属性监听，也叫深度监听
    }
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    //转成2017-01-01
    getMyDate(str, type) {
      var oDate = type ? new Date(str + 86400000) : new Date(str),
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
    getTableData(
      npage,
      pagesize,
      Overhaul,
      username,
      mobile,
      idNo,
      start,
      finsh,
      channel
    ) {
      let _this = this;
      getOverList(
        npage,
        pagesize,
        true,
        username,
        mobile,
        idNo,
        start,
        finsh,
        channel
      )
        .then(res => {
          let data = res.data;
          _this.tableData = data.rows;
          _this.total = data.total;
        })
        .catch();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableData(val, this.pageSize / 2, true);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableData(this.currentPage, this.pageSize / 2, true);
    },
    handSearch() {
      this.currentPage = 1;
      console.log(this.formInline);
      if (!this.formInline.time) {
        this.getTableData(
          this.currentPage,
          this.pageSize / 2,
          true,
          this.formInline.name,
          this.formInline.phone,
          this.formInline.cardid,
          "",
          ""
        );
      } else {
        this.currentTime1 = this.getMyDate(this.formInline.time[0], false);
        this.currentTime2 = this.getMyDate(this.formInline.time[1], true);
        this.getTableData(
          this.currentPage,
          this.pageSize,
          true,
          this.formInline.name,
          this.formInline.phone,
          this.formInline.cardid,
          this.currentTime1,
          this.currentTime2,
          this.formInline.region
        );
      }
    }
  },
  mounted() {
    this.getTableData(
      this.currentPage,
      this.pageSize / 2,
      this.formInline.name,
      this.formInline.phone,
      this.formInline.cardid,
      this.currentTime1,
      this.currentTime2,
      this.formInline.region
    );
  }
};
</script>

<style scoped>
.demo-form-inline {
  display: flex;
  margin-left: -38px;
  flex-wrap: wrap;
}
.el-form-item {
  margin-bottom: 10px;
}
</style>
