<template>
    <div class="container">
        <el-row>
            <el-alert
              title="电销列表"
              :closable="false"
              type="info">
            </el-alert>           
        </el-row>  
        <el-row class="m20" >
            <el-col   class="col-flex-end">
                    <!-- <el-button-group>
                      <el-button type="info" @click="changeExeceedtimeType(0)">重置</el-button>
                      <el-button type="primary" @click="changeExeceedtimeType(1)">M1</el-button>
                      <el-button type="success" @click="changeExeceedtimeType(2)">M2</el-button>
                      <el-button type="warning" @click="changeExeceedtimeType(3)">M3</el-button>
                      <el-button type="danger" @click="changeExeceedtimeType(4)">M3+</el-button>
                    </el-button-group>     -->
                    <div class="l20">
                        <el-input
                        style="padding:0px 10px 0px 0px"
                          placeholder="请输入关键字"
                          v-model="keywords"
                          clearable>
                        </el-input> 
                    </div>                                  
                    <el-date-picker
                    style="width:340px"
                    class="l20"
                      v-model="time"
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
            style="width: 100%"
            class="m20"
            v-loading="loading"
            id="eleTable"
          >
                      <el-table-column prop="custUserId" label="用户ID" align="center" width="140" sortable></el-table-column>
                      <el-table-column prop="custUserMobile" label="客户电话" align="center" width="140"></el-table-column>
                      <el-table-column prop="type" label="电销类型" align="center" 
                        width="140"
                         :filters="[ { value: 1, text: '注册' }, { value: 2, text: '流程未走完 ' }, { value: 3, text: '重申中' }, { value: 4, text: '额度未完' }]"
                         :filter-method="filterType"                      
                      >
                        <template slot-scope="scope">
                            <el-tag
                                :type="scope.row.type==1?'success':scope.row.type==2?'info':scope.row.type==3?'warning':scope.row.type==4?'danger':''"
                            >{{scope.row.type==1?'注册':scope.row.type==2?'流程未走完':scope.row.type==3?'重申中':scope.row.type==4?'额度未完':''}}</el-tag>
                        </template>                         
                      </el-table-column>                      
                      <el-table-column prop="companyName" label="机构名" align="center" ></el-table-column>
                      <el-table-column prop="custUserName" label="客户姓名" align="center"  min-width="80"></el-table-column>
                      <el-table-column prop="money" label="所剩金额" align="center" sortable ></el-table-column>
                      <el-table-column prop="chbSale" label="电销人员" align="center"  width="140" >
                        <template slot-scope="scope" >
                            <el-tag
                                :type="scope.row.salesmanName?'success':'danger'"
                                style="width:100px"
                            >{{scope.row.salesmanName?scope.row.salesmanName:'暂无电销人员'}}</el-tag>
                        </template> 
                      </el-table-column>  
            <el-table-column type="expand" label="回访详情" width="80" >
              <template slot-scope="props" >
                <el-alert
                  title="回访记录"
                  type="success"
                  :closable="false"
                  center
                  >
                </el-alert>
                <el-table
                  :data="props.row.chbdetail"
                  border 
                  style="width: 100%"
                  >
                      <el-table-column prop="customName" label="客户姓名" align="center" sortable width="100"></el-table-column>
                      <el-table-column prop="salesmanName" label="电销员姓名" align="center" sortable width="100"></el-table-column>
                      <el-table-column prop="recallType" label="回访类型" align="center" sortable width="100"></el-table-column>
                      <el-table-column prop="recallResult" label="回访内容" align="center" sortable ></el-table-column>
                      <el-table-column prop="updateTime" label="最近回访时间" align="center" sortable width="180">
                        <template slot-scope="scope">
                            {{scope.row.updateTime|dateServer}}
                        </template>                          
                      </el-table-column>
                      <el-table-column prop="createTime" label="创建时间" align="center" sortable width="180">
                        <template slot-scope="scope">
                            {{scope.row.createTime|dateServer}}
                        </template>                          
                      </el-table-column>                      
                      <el-table-column prop="type" label="进入电销中心类型" align="center" width="180" ></el-table-column>                      
                </el-table>
              </template>
            </el-table-column>  
                    <el-table-column prop="cz"  align="center" label="操作" width="200"  >
                        <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="success"
                            @click="handleEmit(scope.$index, scope.row)"
                           >分配</el-button>
                        <el-button
                            size="mini"
                            type="success"
                            :disabled="scope.row.salesmanName?false:true"
                            @click="handleAdd(scope.$index, scope.row)"
                           >添加回访</el-button>                           
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
          title="添加电销回访"
          :visible.sync="dialogVisible"
          center
          width="40%"
          > 
            <el-row>
              <el-col :span="20" >
            <el-form :model="ruleForm1" status-icon  ref="ruleForm1" label-width="100px" :rules="rules" >
              <el-form-item label="客户姓名:" prop="userName" >
                <el-input type="input" v-model="ruleForm1.userName" auto-complete="off" disabled></el-input>
              </el-form-item>
              <el-form-item label="客户电话:" prop="userMobile" >
                <el-input type="input" v-model="ruleForm1.userMobile" auto-complete="off" disabled></el-input>
              </el-form-item>
              <el-form-item label="客户ID:" prop="custUserId" >
                <el-input v-model.number="ruleForm1.custUserId" disabled></el-input>
              </el-form-item>  
              <el-form-item label="贷款ID:" prop="loanOrderId" >
                <el-input v-model.number="ruleForm1.loanOrderId" disabled></el-input>
              </el-form-item>              
              <el-form-item label="订单ID:" prop="loanOrderId">
                <el-input v-model.number="ruleForm1.loanOrderId" disabled></el-input>
              </el-form-item>
              <el-form-item label="类型:" prop="type" >
                <el-input v-model.number="ruleForm1.type" disabled></el-input>
              </el-form-item>  
              <el-form-item label="所剩额度:" prop="money" >
                <el-input v-model.number="ruleForm1.money" disabled></el-input>
              </el-form-item>  
              <el-form-item label="电销人员:"  >
                <el-input  disabled>{{ruleForm1.salesman}}</el-input>
                <!-- <el-select v-model="ruleForm1.salesmanId" placeholder="电销人员">
                  <template v-for="(temp,index) in salesman">
                    <el-option  :key="index" :label="temp.username" :value="temp.uid">
                    </el-option>
                  </template>
                </el-select>                 -->
              </el-form-item>                            
              <el-form-item label="回访类型:" prop="recallType">
                 <el-select v-model="ruleForm1.recallType" placeholder="回访类型">
                  <template v-for="(temp,index) in recallType">
                    <el-option  :key="index" :label="temp.label" :value="temp.value">
                    </el-option>
                  </template>  
                </el-select>                
              </el-form-item>              
              <el-form-item label="备注:" prop="remark">
                 <el-input type="textarea" v-model="ruleForm1.remark" ></el-input>
              </el-form-item>
              <el-form-item label="回访结果:" prop="recallResult">
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
        <el-dialog
          title="分配电销人员"
          :visible.sync="dialogVisible2"
          center
          width="30%"
          >

            <el-row class="m20">
              <el-alert
                title="电销人员"
                type="info"
                :closable="false">
              </el-alert>   
            </el-row>
            <el-row class="m20 col-flex" style="text-align:center" >
                <el-select v-model="salesmanId" placeholder="电销人员">
                  <template v-for="(temp,index) in salesman">
                    <el-option  :key="index" :label="temp.username" :value="temp.uid">
                    </el-option>
                  </template>
                </el-select>                
              <el-button type="primary" style="margin-left:30px" @click="handleConfig">确认</el-button>
              <el-button type="primary" style="margin-left:30px" @click="quxiao2">取消</el-button>              
            </el-row>
        </el-dialog>           
    </div>
</template>

<script>
import {
  getEleUserList,
  getEleCompanyId,
  getEleSalesmanRecall,
  getSalesmanId,
  getReplies,
  getSaleman
} from "../../../service/http";
import Timer from "../../../config/timer";
import { timeFormat } from "../../../config/time";
export default {
  name: "credit",
  data() {
    return {
      companyId: null,
      keywords: "",
      time: [],
      tableData: [],
      loading: true,
      npage: 1,
      pagesize: 10,
      total: 0,
      dialogVisible: false,
      dialogVisible2: false,
      salesmanId: null,
      editSales: {},
      ruleForm1: {
        userName: "",
        userMobile: "",
        salesmanId: "",
        loanApplyId: "",
        loanOrderId: "",
        recallType: "",
        remark: "",
        recallResult: "",
        type: "",
        money: "",
        custUserId: ""
      },
      recallType: [
        { value: 1, label: "打电话" },
        { value: 2, label: "发短信" },
        { value: 3, label: "微信" },
        { value: 4, label: "qq" }
      ],
      salesman: [],
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
      }
    };
  },
  methods: {
    _getEleSalesmanRecall(
      userName,
      userMobile,
      salesmanId,
      loanApplyId,
      loanOrderId,
      recallType,
      remark,
      recallResult,
      type,
      money,
      userId
    ) {
      let _this = this;
      getEleSalesmanRecall(
        userName,
        userMobile,
        salesmanId,
        loanApplyId,
        loanOrderId,
        recallType,
        remark,
        recallResult,
        type,
        money,
        userId
      )
        .then(res => {
          let data = res.data;
          if (data.code === 200) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            _this.dialogVisible = false;
          }
        })
        .catch();
    },

    _getEleCompanyId(companyId, salesmanName) {
      let _this = this;
      getEleCompanyId(companyId, salesmanName)
        .then(res => {
          let data = res.data;
          if (data.code === 200) {
            _this.salesman = data.data;
          }
        })
        .catch();
    },
    getData(pageNumber, pageSize, startDate, endDate, keywords) {
      let _this = this;
      this.loading = true;
      getEleUserList(pageNumber, pageSize, startDate, endDate, keywords)
        .then(res => {
          let data = res.data;
          if (data.code === 200) {
            let tableData = data.data.list;
            for (let a = 0; a < tableData.length; a++) {
              getReplies(tableData[a].custUserId)
                .then(re => {
                  tableData[a].chbdetail = re.data.data;
                  // getSaleman(tableData[a].custUserId)
                  //   .then(re => {
                  //     tableData[a].chbSale = re.data.data;
                  //     _this.tableData = tableData;
                  //     _this.total = data.data.allpage;
                  //     _this.loading = false;
                  //   })
                  //   .catch();
                  tableData[a].chbSale = re.data.data;
                  _this.tableData = tableData;
                  _this.total = data.data.allsize;
                  _this.loading = false;
                })
                .catch();
            }
          } else {
          }
        })
        .catch(err => {
          _this.tableData = [];
          _this.loading = false;
        });
    },
    handleSearch() {
      if (this.time && this.time.length) {
        this.getData(
          this.npage,
          this.pagesize,
          this.time[0] + " 00:00:00",
          timeFormat(this.time[1], 1) + " 00:00:00",
          this.keywords
        );
      } else {
        this.getData(this.npage, this.pagesize, "", "", this.keywords);
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
    handleConfig() {
      let _this = this;
      let salesmanName = "";

      for (let a = 0; a < this.salesman.length; a++) {
        if (this.salesman[a].uid === this.salesmanId) {
          salesmanName = this.salesman[a].username;
        }
      }
      getSalesmanId(
        this.salesmanId,
        this.editSales.custUserId,
        this.editSales.loanOrderId,
        this.editSales.loanApplyId,
        this.editSales.custUserName,
        salesmanName
      )
        .then(res => {
          let data = res.data;
          if (data.code === 200) {
            this.$message({
              message: "分配成功",
              type: "success"
            });
            _this.editSales = null;
            _this.handleSearch();
            _this.dialogVisible2 = false;
          }
        })
        .catch();
    },
    handleAdd(index, row) {
      this.dialogVisible = true;
      let companyId = row.companyId;
      this.ruleForm1 = {
        userName: row.custUserName,
        userMobile: row.custUserMobile,
        salesmanId: row.salesmanId,
        salesman: row.salesmanName,
        loanApplyId: row.loanApplyId,
        loanOrderId: row.loanOrderId,
        recallType: "",
        remark: "",
        recallResult: "",
        type: row.type,
        money: row.money,
        custUserId: row.custUserId
      };
      this._getEleCompanyId(row.companyId);
      this.handleSearch();
    },

    handleEmit(index, row) {
      this.dialogVisible2 = true;
      this.salesmanId = null;
      this.salesmanId = row.salesmanId;
      this.username = null;
      let companyId = row.companyId;
      this._getEleCompanyId(row.companyId);
      this.editSales = row;
    },
    filterType(value, row) {
      return row.type == value;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
 
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        console.log(this.ruleForm1);
        if (valid) {
          this._getEleSalesmanRecall(
            this.ruleForm1.userName,
            this.ruleForm1.userMobile,
            this.ruleForm1.salesmanId,
            this.ruleForm1.loanApplyId,
            this.ruleForm1.loanOrderId,
            this.ruleForm1.recallType,
            this.ruleForm1.remark,
            this.ruleForm1.recallResult,
            this.ruleForm1.type,
            this.ruleForm1.money,
            this.ruleForm1.custUserId
          );
          this.dialogVisible = false;
          this.resetForm(formName);
        } else {
          return false;
        }
      });
    },
    quxiao1() {
      this.dialogVisible = false;
      this.resetForm("ruleForm1");
    },
    quxiao2() {
      this.dialogVisible2 = false;

      this.editSales = null;
    }
  },
  mounted() {
    this.getData(this.npage, this.pagesize);
  }
};
</script>
<style>
#eleTable .el-tag {
  width: 80px;
}
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
