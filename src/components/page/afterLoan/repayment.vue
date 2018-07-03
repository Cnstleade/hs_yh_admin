<template>
    <div class="container">
        <el-row>
            <el-alert
              title="线下还款列表展示"
              :closable="false"
              type="info">
            </el-alert>           
        </el-row>        
        <el-row class="m20" >
            <el-col   class="col-flex-end">
                    <div class="l20">
                        <el-input
                        style="padding:0px 10px 0px 0px"
                          placeholder="请输入手机号码"
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
            :rules="rules"
          >
            <el-table-column prop="id" label="提现ID" align="center"  sortable></el-table-column>
            <el-table-column prop="applyId" label="订单ID" align="center"  sortable></el-table-column>
            <el-table-column prop="borrowDay" label="借款期限" align="center" sortable></el-table-column>
            <el-table-column prop="borrowTime" label="借款时间" align="center" width="180" sortable>
                <template slot-scope="scope">
                    {{scope.row.borrowTime|dateServer}}
                </template>
            </el-table-column>
            <el-table-column prop="withdrawMoney" label="提现金额" align="center" sortable ></el-table-column>
            <el-table-column prop="phoneNumber" label="电话号码" align="center" width="180" sortable ></el-table-column>
            <el-table-column prop="overdue_day" label="逾期天数" align="center" sortable ></el-table-column>
            <el-table-column prop="late_fee" label="逾期金" align="center" sortable ></el-table-column>
            <el-table-column prop="ned_return_money" label="需要还钱数" align="center" sortable ></el-table-column>
                <el-table-column prop="cz"  align="center" label="操作"   >
                    <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="success"
                        @click="handleAllocation(scope.$index, scope.row)"
                       >申请还款</el-button>
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
          title="提交还款申请"
          :visible.sync="dialogVisible"
          center
          width="40%"
          >
            <el-row>  
            <el-form  :model="editForm"  ref="editForm"   label-width="150px" :rules="rules">
                <el-form-item label="提现id：" prop="title">
                  <el-input v-model="editForm.loanApplyId"    disabled></el-input>
                </el-form-item>
                <el-form-item label="逾期的利息：" prop="title">
                  <el-input v-model="editForm.interestOverdue"    disabled></el-input>
                </el-form-item>
                <!-- <el-form-item label="打折的金额：" prop="title">
                  <el-input v-model="editForm.discountAmt"   placeholder="请输入打折的金额"></el-input>
                </el-form-item> -->
                <el-form-item label="需要还款的金额 ：" prop="title">
                  <el-input v-model="editForm.mustPayBackAmt"    disabled></el-input>
                </el-form-item>
                <el-form-item label="实际还款的金额：" prop="title">
                  <el-input v-model="editForm.actualPayBackAmt"   placeholder="请输入实际还款的金额"></el-input>
                </el-form-item>   
                <el-form-item label="备注：" prop="remarks">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入还款申请备注"
                    v-model="editForm.remarks">
                  </el-input>
                </el-form-item>                                                                                

                <el-form-item label="图片凭证：" >
                 <el-col >
                    <el-upload
                        action="123"
                      class="upload-demo"
                      ref="upload"
                      :on-change="handleChange"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList2"
                      :before-upload="beforeAvatarUpload"
                      list-type="picture"
                      :auto-upload="false" >
                      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                      <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
                      <div slot="tip" class="el-upload__tip">（必须上传图片，且大小为4M以内），且不超过4M</div>
                    </el-upload>                    
                 </el-col>
                </el-form-item>
                <!-- <input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update"/>   -->
                <el-form-item>
                  <el-button type="primary" @click="onAddSubmit('editForm')">提交</el-button>
                  <el-button @click="changeDialog()">取消</el-button>
                </el-form-item>                                                                  
            </el-form>              
            </el-row>
        </el-dialog>                  
    </div>
</template>

<script>
import axios from "axios";
import {
  getExeceedtimeapplyList,
  getExeceedtimeapplyListbycollector,
  httpExeceedtimeapplydetail,
  httpGetrevewerlist,
  execeedtimeDistribute,
  getPaymentlist,
  postOfflinePayment,
  htt
} from "../../../service/http";
import Timer from "../../../config/timer";
import { timeFormat } from "../../../config/time";
export default {
  name: "credit",
  data() {
    return {
      file: false,
      rules: {
        remarks: [{ required: true, message: "请填写备注", trigger: "blur" }],
        logo: [{ required: true, message: "请填写回访结果", trigger: "blur" }]
        // salesmanId: [
        //   { required: true, message: "请选择电销人员", trigger: "change" }
        // ],
        // recallType: [
        //   { required: true, message: "请选择类型", trigger: "change" }
        // ]
      },
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
  watch: {
    fileList2(newY) {
      console.log(newY);
    }
  },
  methods: {
    getData(npage, pagesize, begainTimeString, endTimeString, phonenumber) {
      let _this = this;
      this.loading = true;
      getPaymentlist(
        npage,
        pagesize,
        begainTimeString,
        endTimeString,
        phonenumber
      )
        .then(res => {
          let data = res.data;
          let tableData = data.list;
          _this.tableData = tableData;
          _this.total = data.allsize;
          _this.loading = false;
        })
        .catch();
    },
    handleSearch() {
      if (this.search.time && this.search.time.length) {
        this.getData(
          this.npage,
          this.pagesize,
          this.search.time[0] + " 00:00:00",
          timeFormat(this.search.time[1], 1) + " 00:00:00",
          this.search.phoneNumber
        );
      } else {
        this.getData(
          this.npage,
          this.pagesize,
          "",
          "",
          this.search.phoneNumber
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
    getrevewerlist() {
      httpGetrevewerlist()
        .then(res => {
          let data = res.data;
          this.trevewerlist = data;
        })
        .catch(err => {});
    },
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
      //将文件 的所有的内容都添加在这一起上传
      let fd = new FormData();
      fd.append("upload", file);
      fd.append("loanApplyId", Number(this.editForm.loanApplyId)); //其他参数
      fd.append("interestOverdue", Number(this.editForm.interestOverdue)); //其他参数
      // fd.append("discountAmt", Number(this.editForm.discountAmt)); //其他参数
      fd.append("mustPayBackAmt", Number(this.editForm.mustPayBackAmt)); //其他参数
      fd.append("actualPayBackAmt", Number(this.editForm.actualPayBackAmt)); //其他参数
      fd.append("remarks", Number(this.editForm.remarks)); //其他参数
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
      if (!file) {
        this.$message.error("请上传图片");
      }
      this.$message({
        message: "申请提交成功等待审核",
        type: "success"
      });
      this.dialogVisible = false;
      this.resetForm("editForm");
      axios.post("/sys/offlinepayment", fd, {});
      return isJPG && isLt2M;
    },
    onAddSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$refs.upload.submit();
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {},
    handleChange(file, fileList) {},
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
    changeDialog() {
      this.dialogVisible = false;
      this.resetForm("editForm");
    }
  },
  mounted() {
    this.getData(this.npage, this.pagesize);
    this.getrevewerlist();
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
