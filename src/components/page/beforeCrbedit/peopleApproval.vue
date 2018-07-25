<template>
    <div class="container">
        <template>
            <el-form  :data="formData" :model="formData" class="demo-form-inline" size="mini" label-width="80px">
                <el-form-item label="姓名" size="mini">
                    <el-input v-model="formData.name" class="miniItem" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input v-model="formData.phone" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input v-model="formData.IDE" placeholder="身份证"></el-input>
                </el-form-item>
                <el-form-item label="渠道">
                    <el-select v-model="formData.region" placeholder="渠道">
                        <el-option label="渠道一" value="1"></el-option>
                        <el-option label="渠道二" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="申请时间">
                    <el-col :span="12">
                        <el-form-item prop="date1" class="miniItem">
                            <el-date-picker type="date" placeholder="选择日期" v-model="formData.date1"
                                            style="width: 100%"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <!--<el-col class="line" :span="2">-</el-col>-->
                    <el-col :span="12">
                        <el-form-item prop="date2" class="miniItem">
                            <el-date-picker type="date" placeholder="选择日期" v-model="formData.date2"
                                            style="width: 100%"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">批量绑定</el-button>
                </el-form-item>
            </el-form>
        </template>
        <template>
   
                    <el-table class="m20" id="peopleTable" style="width: 100%" :data="tableData" height="650">
                        <el-table-column prop="id" label="序号" align="center"></el-table-column>
                        <el-table-column prop="username" label="申请人名称" align="center"></el-table-column>
                        <el-table-column label="申请时间" align="center" width="200">
                            <template slot-scope="scope">
                                <i class="el-icon-time"></i>
                                <span style="margin-left: 10px">{{ scope.row.applyTime |dateServer }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="approveAmt" label="申请金额" align="center"></el-table-column>
                        <el-table-column prop="approveTerm" label="贷款期限" align="center"></el-table-column>
                        <el-table-column prop="approverName" label="审核人姓名" align="center"></el-table-column>
                        <el-table-column prop="status" label="审核结果" align="center">
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
                                <el-button type="primary" size="mini">
                                    详情
                                </el-button>
                                <el-button type="primary" size="mini" @click="openBind(scope.row)">
                                    解绑
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>

                <template>
                    <el-pagination
                        style="margin-top: 10px;text-align: right"
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
import { mapGetters } from 'vuex'
import { Message } from "element-ui";
import { config } from "../../../util/config";
export default {
  name: "peopleApproval",
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: null,
      formData: {
        name: "",
        phone: "",
        IDE: "",
        region: "",
        date1: "",
        date2: ""
      },
      tableData: []
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
    onSearch() {
      this.queryPeopleApproval();
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.queryPeopleApproval(this.currentPage, this.pageSize);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.queryPeopleApproval(this.currentPage, this.pageSize);
    },

    queryPeopleApproval(npage, pageSize) {
      let postData = this.$qs.stringify({
        npage: npage,
        pagesize: pageSize,
        username: this.formData.name,
        mobile: this.formData.phone,
        idNo: this.formData.IDE,
        channel: this.formData.region,
        startDateString: this.formData.date1,
        finshDateString: this.formData.date2
      });
      this.$post("/sys/getUserLoanOrderList", postData).then(response => {
        console.log(response);
        this.total = response.total;
        this.tableData = response.rows;
      });
    },
    openBind(row) {
      let _this = this;
      let arry = [];
      arry.push(row.id);
      let postDate = {
           loginId:this.loginId,
        ids: arry,
        type: false
      };
      $.ajax({
        type: "POST",
        url: config.baseURL + "/sys/updataLoanApply",
        data: postDate,
        success: function(data) {
          Message({
            message: data.message,
            center: true
          });
          _this.queryPeopleApproval(this.currentPage, this.pageSize);
        },
        error: function() {
          alert("错误");
        }
      });
    }
  },
  mounted() {
    this.queryPeopleApproval(this.currentPage, this.pageSize);
  }
};
</script>

<style>
#peopleTable .el-tag {
  width: 70px;
}
</style>
<style scoped>
.divFlex {
  width: 100%;
  height: 100%;
}

.demo-form-inline {
  display: flex;
  margin-left: -38px;
}

.miniItem {
  width: 150px;
}

.el-form-item {
  margin-bottom: 0;
}
</style>
