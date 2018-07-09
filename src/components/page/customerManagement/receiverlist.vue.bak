<template>
  <div class="container">
    <template>
      <el-form :model="formInline" class="demo-form-inline" size="mini" label-width="80px">
        <el-form-item label="姓名" size="mini">
          <el-input v-model="formInline.username" placeholder="姓名"></el-input>
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
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">查询</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template>
      <el-table class="m20" :data="tableData" @selection-change="changeFun" border height="650">
        <el-table-column prop="id" label="序号" align="center" width="50"></el-table-column>
        <el-table-column prop="realName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="phoneNumber" label="手机号" align="center"></el-table-column>
        <el-table-column prop="idcard" label="证件号" align="center"></el-table-column>
        <el-table-column prop="bankcard" label="银行" align="center"></el-table-column>
        <el-table-column prop="source" label="渠道" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.source==1?'success':''">
              {{scope.row.source===1?'网页':'安卓'}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="isDel" label="是否黑名单" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isDel?'danger':''">
              {{scope.row.isDel?'是':'否'}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.createTime |dateServer }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="frost(scope.row)">冻结</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template>
      <el-pagination
        style="text-align: right;margin-top: 10px"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="pageSize"
        background
        layout="total,sizes,prev, pager, next,jumper"
        :total="total">
      </el-pagination>
    </template>
  </div>
</template>

<script>
  import {Message} from "element-ui";
  import {config} from "../../../util/config";

  export default {
    name: "bindApproval",
    data() {
      return {
        dialogFormVisible: false,
        formInline: {
          username: "",
          mobile: "",
          idNo: "",
          channel: ""
        },
        multipleSelection: [],
        tableData: [],
        total: 0,
        pageSize: 10,
        currentPage: 1,
        source: '',
        realNmae: '',
        phoneNumber: '',
        iscard: ''
      };
    },
    methods: {
      onSubmit() {
        this.queryPeopleApprovalBind();
      },

      // select 事件触发
      changeFun(val) {
        this.multipleSelection = val;
      },

      //得到数据
      getTableData(npage, pagesize, source, realName, phoneNumber, idcard) {
        let postData = this.$qs.stringify({
          npage,
          pagesize,
          source,
          realName,
          phoneNumber,
          idcard
        });
        /*this.$post("/custUser/list", postData).then(response => {
            this.tableData = response.rows;
            this.total = response.total;
        });*/
        $.ajax({
          type: 'POST',
          url: config.baseURL + '/custUser/list',
          data: postData,
          success: (data) => {
            this.tableData = data.rows;
            this.total = data.total;
          },
          error: (err) => {
            Message({
              message: err,
              center: true
            });
          }
        })
      },

      handleCurrentChange(val) {
        this.currentPage = val;
        this.getTableData(val, this.pageSize, this.formInline.channel, this.formInline.username, this.formInline.mobile, this.formInline.idNo);
      },

      handleSizeChange(val) {
        this.pageSize = val;
        this.getTableData(this.currentPage, this.pageSize, this.formInline.channel, this.formInline.username, this.formInline.mobile, this.formInline.idNo);
      },

      // 查询审批绑定列表
      queryPeopleApprovalBind() {
        this.getTableData(this.currentPage, this.pageSize, this.formInline.channel, this.formInline.username, this.formInline.mobile, this.formInline.idNo);
      },

      // 冻结
      frost(data) {
        console.log(data.id);
      }
    },
    mounted: function () {
      this.getTableData(this.currentPage, this.pageSize, this.formInline.channel, this.formInline.username, this.formInline.mobile, this.formInline.idNo);
    }
  };
</script>

<style scoped>


  .demo-form-inline {
    margin-left: -38px;
    display: flex;
    flex-wrap: nowrap;
  }

  .el-form-item {
    margin-bottom: 0;
  }
</style>
