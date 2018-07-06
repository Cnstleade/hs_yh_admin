<template>
    <div class="container ">
        <template>
            <el-form :model="formInline" class="demo-form-inline" size="mini" label-width="80px">
                <el-form-item label="姓名">
                    <el-input class="dateStyle" v-model="formInline.username" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input v-model="formInline.mobile" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input v-model="formInline.idNo" placeholder="身份证"></el-input>
                </el-form-item>
                <el-form-item label="渠道">
                    <el-select v-model="formInline.channel" placeholder="渠道">
                        <el-option label="渠道一" value="1"></el-option>
                        <el-option label="渠道二" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="申请时间" >
                        <el-form-item prop="date1" >
                            <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
                                            v-model="formInline.startDateString"
                                            >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <span> - </span>
                        </el-form-item>
                        <el-form-item prop="date2" >
                            <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
                                            v-model="formInline.finshDateString"
                                            >

                            </el-date-picker>
                        </el-form-item>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit()">查询</el-button>
                    <el-button type="primary" @click="setCurrent()">批量绑定</el-button>
                </el-form-item>
            </el-form>
        </template>
        <template>
   
                    <el-table class="m20" id="bindTableStyle" :data="tableData" @selection-change="changeFun" border height="600">
                        <el-table-column type="selection" width="55" :selectable='checkboxInit'></el-table-column>
                        <el-table-column prop="id" label="序号" align="center"></el-table-column>
                        <el-table-column prop="userName" label="申请人名称" align="center"></el-table-column>
                        <el-table-column label="申请时间" align="center" width="200">
                            <template slot-scope="scope">
                                <i class="el-icon-time"></i>
                                <span style="margin-left: 10px">{{ scope.row.applyTime |dateServer }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="approveAmt" label="申请金额" align="center"></el-table-column>
                        <el-table-column prop="approveTerm" label="贷款期限" align="center"></el-table-column>
                        <el-table-column prop="approverName" label="审核人姓名" align="center"></el-table-column>
                        <el-table-column label="订单状态" align="center">
                            <template slot-scope="scope">
                                <el-tag
                                    :type="scope.row.status ===1?'':(scope.row.status===2?'danger':(scope.row.status===3?'success':(scope.row.status===4?'info':(scope.row.status===5?'warning':'success'))))">
                                    {{scope.row.status
                                    ===1?'审核中':(scope.row.status===2?'拒绝':(scope.row.status===3?'通过审核':(scope.row.status===4?'已打款':(scope.row.status===5?'还款':'完结'))))}}
                                </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
                        <el-table-column prop="channel" label="渠道" align="center"></el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button
                                    :type="scope.row.approverName === null || scope.row.approverName === ''?'primary':'danger'"
                                    size="mini"
                                    :disabled="scope.row.approverName === null || scope.row.approverName === ''?false:true"
                                    @click="bind(scope.row)">
                                    {{scope.row.approverName === null ||
                                    scope.row.approverName === ''?'绑定':"已绑定"}}
                                </el-button>

                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <template>
                    <div class="block">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                    </div>
        </template>
    </div>
</template>

<script>
import axios from "axios";
import { Message } from "element-ui";
import { config } from "../../../util/config";

export default {
  name: "bindApproval",
  data() {
    return {
      dialogFormVisible: false,
      formInline: {
        username: "",
        mobile: "",
        idNo: "",
        channel: "",
        startDateString: "",
        finshDateString: ""
      },
      multipleSelection: [],
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: null
    };
  },
  methods: {
    onSubmit() {
      this.queryPeopleApprovalBind(this.currentPage, this.pageSize);
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.queryPeopleApprovalBind(this.currentPage, this.pageSize);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.queryPeopleApprovalBind(this.currentPage, this.pageSize);
    },

    // 判断列表是否可选
    checkboxInit(row, index) {
      if (row.approverName != null) return 0;
      else return 1;
    },

    // select 事件触发
    changeFun(val) {
      this.multipleSelection = [];
      for (let i = 0; i < val.length; i++) {
        this.multipleSelection.push(val[i].id);
      }
    },

    // 批量绑定
    setCurrent() {
      let arry = this.multipleSelection;
      console.log(this.multipleSelection);
      let postDate = {
        ids: arry,
        type: true
      };
      $.ajax({
        type: "POST",
        url: config.baseURL + "/sys/updataLoanApply",
        data: postDate,
        success: function(data) {
          alert(data);
        },
        error: function() {
          alert("错误");
        }
      });
    },

    // 查询审批绑定列表
    queryPeopleApprovalBind(npage, pageSize) {
      let postData = this.$qs.stringify({
        npage: npage,
        pagesize: pageSize,
        username: this.formInline.username,
        mobile: this.formInline.mobile,
        idNo: this.formInline.idNo,
        channel: this.formInline.channel,
        startDateString: this.formInline.startDateString,
        finshDateString: this.formInline.finshDateString
      });
      this.$post("/sys/loanapply", postData).then(response => {
        this.total = response.total;
        this.tableData = response.rows;
        console.log(response);
      });
    },

    //列表绑定
    bind(row) {
      let _this = this;
      let arry = [];
      arry.push(row.id);
      let postDate = {
        ids: arry,
        type: true
      };
      $.ajax({
        type: "POST",
        url: config.baseURL + "/sys/updataLoanApply",
        data: postDate,
        success: function(data) {
          Message({
            message: data,
            center: true
          });
          _this.queryPeopleApprovalBind(this.currentPage, this.pageSize);
        },
        error: function() {
          alert("错误");
        }
      });
    }
  },
  mounted: function() {
    this.queryPeopleApprovalBind(this.currentPage, this.pageSize);
  }
};
</script>
<style>
.divFlex {
  width: 100%;
  height: 100%;
}

.demo-form-inline {
  display: flex;
  margin-left: -38px;
  flex-wrap: wrap;
}

.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 0;
}

.block {
  margin-top: 10px;
  text-align: right;
}



#bindTableStyle .el-tag {
  width: 70px;
}
</style>
<style scoped>
</style>
