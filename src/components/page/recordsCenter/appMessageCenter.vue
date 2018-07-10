<template>
    <div class="container">
        <el-row>
            <el-alert
              title="app消息中心"
              :closable="false"
              type="info">
            </el-alert>           
        </el-row>        
        <el-row class="m20" >
            <el-col   class="col-flex-end">
                    <div class="l20">
                        <el-input
                        style="padding:0px 10px 0px 0px"
                          placeholder="请输入用户名"
                          v-model="search.phoneNumber"
                          clearable>
                        </el-input> 
                    </div>                                  
                    <el-date-picker
                    style="width:340px"
                    class="l20"
                      v-model="search.time"
                      type="daterange"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>                
                    <el-button @click="handleSearch" class="l20" style="margin-left:20px" icon="el-icon-search"  type="success" circle></el-button>                                                                  
            </el-col>             
        </el-row> 
        <el-table
            :data="tableData"  
            border  
            ref="multipleTable" 
            tooltip-effect="dark"
            style="width: 100%"
            class="m20"
            v-loading="loading"
            @selection-change="handleSelectionChange"
          >
            <el-table-column prop="id" label="ID" align="center"  width="100" sortable></el-table-column>
            <!-- <el-table-column prop="custUserId" label="用户ID" width="100" align="center"  sortable></el-table-column> -->
            <el-table-column prop="custUserName" label="客户名"  width="140" align="center" sortable></el-table-column>
            <el-table-column prop="createTime" label="创建时间"  align="center" width="180" sortable>
                <template slot-scope="scope">
                    {{scope.row.createTime|dateServer}}
                </template>
            </el-table-column>
            <el-table-column prop="opinion" label="反馈" align="center" sortable ></el-table-column>
            <el-table-column prop="phoneNumber" label="手机号码" align="center" width="180" sortable ></el-table-column>
            <!-- <el-table-column prop="id" label="是否已读" align="center" sortable ></el-table-column> -->
            <!-- <el-table-column prop="late_fee" label="逾期金" align="center" sortable ></el-table-column>
            <el-table-column prop="ned_return_money" label="需要还钱数" align="center" sortable ></el-table-column> -->
            <el-table-column type="expand" label="回复内容" width="80" >
              <template slot-scope="props" >
                <el-alert
                  title="回复内容"
                  type="success"
                  :closable="false"
                  center
                  >
                </el-alert>
                <el-table
                  :data="props.row.replyContent"
                  border 
                  style="width: 100%"
                  >
                      <el-table-column
                      type="index"
                      align="center"
                      sortable
                      width="50">
                      </el-table-column>
                      <el-table-column prop="key" label="回复内容" align="center" ></el-table-column>
                </el-table>
              </template>
            </el-table-column>              
                <el-table-column prop="cz"  align="center" label="操作" width="200"  >
                    <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="success"
                      @click="handleEmit(scope.$index, scope.row)"
                       >回复</el-button>
                    <el-button
                        size="mini"
                        type="success"
                         @click="handleDelete(scope.$index, scope.row)"
                       >删除</el-button>   
                    <!-- <el-button
                        size="mini"
                        type="success"
                        @click="handleAllocation(scope.$index, scope.row)"
                       >删除</el-button>                                               -->
                    </template> 
            </el-table-column>            
        </el-table>  
        <el-row class="m20" v-if="total>0">
             <div style="float:right">
                 <el-pagination
                   @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                   :current-page="npage"
                    :page-sizes="[10, 20, 30, 40]"
                     :page-size="pagesize"
                   background
                   layout="total,sizes,prev, pager, next,jumper"
                   :total="total">
                 </el-pagination>   
             </div>
        </el-row>
        <el-dialog
          title="消息回复"
          :visible.sync="dialogVisible"
          center
          width="40%"
          >
            <el-row>
              <el-col :span="20" >
            <el-form :model="ruleForm1" status-icon  ref="ruleForm1" label-width="100px" :rules="rules" >
              <el-form-item label="客户姓名:" prop="custUserName" >
                <el-input type="input" v-model="ruleForm1.custUserName" auto-complete="off" disabled></el-input>
              </el-form-item>
              <el-form-item label="回复信息:" prop="recallResult">
                <el-input type="textarea" v-model="ruleForm1.recallResult"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm1')">提交</el-button>
                <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
                <el-button type="primary" style="margin-left:30px" @click="quxiao1">取消</el-button>
              </el-form-item>
            </el-form>
              </el-col>
            </el-row>
        </el-dialog> 
    </div>
</template>

<script>
import axios from "axios";
import {
  execeedtimeDistribute,
  getAppOption,
  getSavrUserReply,
  deleteMessage
} from "../../../service/http";
import Timer from "../../../config/timer";
import { timeFormat } from "../../../config/time";
export default {
  name: "credit",
  data() {
    return {
      rules: {
        remark: [{ required: true, message: "请填写备注", trigger: "blur" }],
        recallResult: [
          { required: true, message: "请填写回访结果", trigger: "blur" }
        ],
        salesmanId: [
          { required: true, message: "请选择电销人员", trigger: "change" }
        ],
        recallType: [
          { required: true, message: "请选择类型", trigger: "change" }
        ]
      },
      ruleForm1: {},
      user: {},
      search: {
        time: [],
        order: null,
        orders: [
          { label: "还款中", value: 5 },
          { label: "逾期", value: 6 },
          { label: "完结", value: 7 }
        ],
        tixian: "",
        tixians: [
          { label: "没有体现", value: 0 },
          { label: "没有完全提现", value: 1 },
          { label: "完全提现", value: 2 }
        ],
        phoneNumber: null
      },
      editForm: {
        loanApplyId: 1,
        interestOverdue: 2,
        discountAmt: 3,
        mustPayBackAmt: 4,
        actualPayBackAmt: 5
      },
      fileList2: [],
      tableData: [],
      loading: false,
      npage: 1,
      pagesize: 10,
      total: 0,
      execeedtimeType: 0,
      dialogVisible: false,
      ordersList: [],
      dynamicTags: [], //订单号
      inputVisible: false,
      inputValue: "",
      trevewerlist: [],
      trevewer: null,
      multipleSelection: [],
      index: 0
    };
  },
  methods: {
    ss(){
      console.log(1)
    },
    _getSavrUserReply(custUserId, custUserOpinionId, replyContent) {
      let _this = this;
      getSavrUserReply(custUserId, custUserOpinionId, replyContent)
        .then(res => {
          let data = res.data;
          if (data.message === "回复成功") {
            this.$message({
              message: "添加回复成功",
              type: "success"
            });
            _this.handleSearch();
            _this.dialogVisible = false;
          }
        })
        .catch();
    },
    getData(pagesize, npage, custUserName, startDate, endDate) {
      let _this = this;
      this.loading = true;
      getAppOption(pagesize, npage, custUserName, startDate, endDate)
        .then(res => {
          let data = res.data;
          let tableData = data.rows;
          console.log(tableData);
          for (let a = 0; a < tableData.length; a++) {
            if (
              tableData[a].replyContent &&
              tableData[a].replyContent.length &&
              Array.isArray(tableData[a].replyContent)
            ) {
              for (let b = 0; b < tableData[a].replyContent.length; b++) {
                tableData[a].replyContent[b] = {
                  key: `${tableData[a].replyContent[b]}`
                };
              }
            }
          }
          _this.tableData = tableData;
          _this.total = data.total;
          _this.loading = false;
        })
        .catch(err => {
          _this.tableData = [];
          _this.loading = false;
        });
    },
    handleSearch() {
      if (this.search.time && this.search.time.length) {
        this.getData(
          this.npage,
          this.pagesize,
          this.search.phoneNumber,
          this.search.time[0],
          timeFormat(this.search.time[1], 1)
        );
      } else {
        this.getData(
          this.npage,
          this.pagesize,
          this.search.phoneNumber,
          "",
          ""
        );
      }
    },

    handleCurrentChange(val) {
      this.npage = val;
      this.handleSearch();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.handleSearch();
    },
    changeExeceedtimeType(i) {
      this.execeedtimeType = i;
      this.handleSearch();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleAllocation(index, row) {
      this.editForm.loanApplyId = row.applyId;
      this.editForm.interestOverdue = row.late_fee;
      this.editForm.mustPayBackAmt = row.withdrawMoney + row.late_fee;
      this.dialogVisible = true;
      this.trevewer = null;
      this.dynamicTags.length = 0;
      this.dynamicTags.push(row.id);
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    // getrevewerlist() {
    //   httpGetrevewerlist()
    //     .then(res => {
    //       let data = res.data;
    //       this.trevewerlist = data;
    //     })
    //     .catch(err => {

    //     });
    // },
    handleConfig() {
      let _this = this;
      if (this.trevewer) {
        execeedtimeDistribute(
          this.dynamicTags.length == 1
            ? this.dynamicTags[0] + ","
            : this.dynamicTags.join(","),
          this.trevewer
        )
          .then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: "分配成功",
                type: "success"
              });
              _this.dialogVisible = false;
              _this.getData(
                this.npage,
                this.pagesize,
                "",
                "",
                "",
                "",
                this.distributionStatus
              );
            }
          })
          .catch(err => {
            this.$message.error("催收员必须存在");
          });
      } else {
        this.$message.error("催收员必须存在");
      }
    },
    handleDelete(index, row) {
      let id = row.id;
      let _this = this;
      this.$confirm("此操作将永久删除该回复, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteMessage(id)
            .then(res => {
              if (res.data.success) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                _this.handleSearch();
              } else {
                this.$message({
                  type: "info",
                  message: "删除失败"
                });
              }
            })
            .catch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handelConfigAll() {
      this.dynamicTags.length = 0;
      for (var temp of this.multipleSelection) {
        this.dynamicTags.push(temp.id);
      }
      this.dialogVisible = true;
    },
    filterStauts(value, row) {
      return row.status === value;
    },
    beforeAvatarUpload(file) {
      console.log(file);
      //将文件 的所有的内容都添加在这一起上传
      let fd = new FormData();
      fd.append("upload", file);
      fd.append("loanApplyId", Number(this.editForm.loanApplyId)); //其他参数
      fd.append("interestOverdue", Number(this.editForm.interestOverdue)); //其他参数
      fd.append("discountAmt", Number(this.editForm.discountAmt)); //其他参数
      fd.append("mustPayBackAmt", Number(this.editForm.mustPayBackAmt)); //其他参数
      fd.append("actualPayBackAmt", Number(this.editForm.actualPayBackAmt)); //其他参数
      // console.log(fd);
      // const isJPG = /image\/\w+/.test(file.type);
      // const isLt2M = file.size / 1024 / 1024 < 4;

      // if (!isJPG) {
      //   this.$message.error("必须上传图片!");
      // }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 4MB!");
      // }
      // return isJPG && isLt2M;
      const isJPG = /image\/\w+/.test(file.type);
      const isLt2M = file.size / 1024 / 1024 < 4;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      console.log(axios);
      axios.post("/sys/offlinepayment", fd, {});
      return isJPG && isLt2M;
    },
    onAddSubmit() {
      console.log(this.$refs.upload);
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleChange(file, fileList) {
      this.fileList2 = fileList.slice(-1);
    },
    updated() {
      let file = e.target.files[0];
      let param = new FormData(); //创建form对象
      param.append("file", file, file.name); //通过append向form对象添加数据
      param.append("chunk", "0"); //添加form表单中其他数据

      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      }; //添加请求头
      this.axios
        .post("http://upload.qiniu.com/", param, config)
        .then(response => {
          console.log(response.data);
        });
    },
    handleEmit(index, row) {
      this.ruleForm1 = row;
      this.dialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm1.custUserOpinionId);
          this._getSavrUserReply(
            this.ruleForm1.custUserId,
            this.ruleForm1.id,
            this.ruleForm1.recallResult
          );
          this.dialogVisible = false;
          this.resetForm(formName);
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    quxiao1() {
      this.dialogVisible = false;
      this.resetForm("ruleForm1");
    }
  },
  mounted() {
    this.getData(this.npage, this.pagesize);
    // this.getrevewerlist();
  }
};
</script>
<style>
#elTag .el-tag {
  margin-top: 20px;
}
#elTag .el-tag + .el-tag {
  margin-left: 10px;
}
#elTag .button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
#elTag .input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

<style scoped>
</style>
