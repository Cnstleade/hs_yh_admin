<template>
    <div class="container">
        <el-row>
            <el-alert
              title="逾期列表展示"
              :closable="false"
              type="info">
            </el-alert>           
        </el-row>        
        <el-row class="m20" >
            <el-col   class="col-flex-end">
                    <el-button-group>
                      <el-button type="info" @click="changeExeceedtimeType(0)">重置</el-button>
                      <el-button type="primary" @click="changeExeceedtimeType(1)">M1</el-button>
                      <el-button type="success" @click="changeExeceedtimeType(2)">M2</el-button>
                      <el-button type="warning" @click="changeExeceedtimeType(3)">M3</el-button>
                      <el-button type="danger" @click="changeExeceedtimeType(4)">M3+</el-button>
                    </el-button-group>    
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
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>        
       
            <el-table-column prop="id" label="订单号" align="center"  sortable></el-table-column>
            <el-table-column prop="userName" label="姓名" align="center" ></el-table-column>
            <el-table-column prop="mobile" label="手机号" align="center" ></el-table-column>
            <el-table-column prop="idNo" label="身份证号" align="center" width="200"></el-table-column>
            <el-table-column prop="applyTime" label="申请时间" align="center" width="180" sortable>
                <template slot-scope="scope">
                    {{scope.row.applyTime|dateServer}}
                </template>
            </el-table-column>
            <el-table-column prop="approveAmt" label="审核金额" align="center" sortable ></el-table-column>
            <el-table-column type="expand" label="更多详情" width="80" >
              <template slot-scope="props" >
                <el-alert
                  title="提现情况"
                  type="success"
                  :closable="false"
                  center
                  >
                </el-alert>
                <el-table
                  :data="props.row.detail.withdraws?props.row.detail.withdraws:[]"
                  border 
                  style="width: 100%"
                  >
                      <el-table-column prop="id" label="id" align="center" sortable></el-table-column>
                      <el-table-column prop="withdrawMoney" label="提现金额" align="center" sortable></el-table-column>
                      <el-table-column prop="borrowTime" label="提现时间" align="center" sortable>
                        <template slot-scope="scope">
                            {{scope.row.borrowTime|dateServer}}
                        </template>                          
                      </el-table-column>
                      <el-table-column prop="status" label="是否逾期" align="center" 
                         :filters="[{ value: 1, text: '借款' }, { value: 2, text: '逾期' }, { value: 3, text: '归还' }]"
                         :filter-method="filterStauts"                      
                      >
                        <template slot-scope="scope">
                            <el-tag
                                :type="scope.row.status===1?'':scope.row.status===2?'danger':'success'"
                            >{{scope.row.status===1?'借款':scope.row.status===2?'逾期':'归还 '}}</el-tag>
                        </template>                         
                      </el-table-column>
                      <el-table-column prop="overdue.overdueDay" label="逾期天数" align="center" sortable></el-table-column>
                      <el-table-column prop="overdue.lateFee" label="违约金" align="center" sortable></el-table-column>
                </el-table>
                <el-alert
                  title="催收情况"
                  type="success"
                  :closable="false"
                  center
                  class="m20"
                  >
                </el-alert>                
                <el-table
                  :data="props.row.detail.loanCollectionRecords?props.row.detail.loanCollectionRecords:[]"
                  border 
                  style="width: 100%"
                  >
                      <el-table-column prop="id" label="id" align="center" ></el-table-column>
                      <el-table-column prop="operatorName" label="催收员姓名" align="center" ></el-table-column>
                      <el-table-column prop="remark" label="描述（备注）" align="center" ></el-table-column>
                      <el-table-column prop="result" label="结果" align="center" >
                        <template slot-scope="scope">
                            <el-tag
                                :type="scope.row.status===1?'':scope.row.status===2?'danger':'success'"
                            >{{scope.row.status===1?'成功':scope.row.status===2?'失败':'进行中 '}}</el-tag>
                        </template>                         
                      </el-table-column>
                      <el-table-column prop="type" label="催收方式" align="center" >
                        <template slot-scope="scope">
                            <el-tag
                                :type="scope.row.status===1?'':scope.row.status===2?'danger':'success'"
                            >{{scope.row.status===1?'电话':scope.row.status===2?'短信':'其他 '}}</el-tag>
                        </template>                         
                      </el-table-column>                      
                </el-table>                
              </template>
            </el-table-column> 
                <el-table-column prop="cz"  align="center" label="操作"   >
                    <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="success"
                        @click="handleAllocation(scope.$index, scope.row)"
                       >分配</el-button>
                    </template> 
                </el-table-column>            
        </el-table>  
        <el-row class="m20" v-if="total>0">
            <el-button type="primary" style="float:left" @click="handelConfigAll" :disabled="multipleSelection.length==0">批量分配</el-button>
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
          title="分配催收员"
          :visible.sync="dialogVisible"
          center
          width="40%"
          >
            <div id="elTag">
              <el-alert
                title="订单号"
                type="info"
                :closable="false">
              </el-alert>               
              <el-tag
                :key="tag"
                v-for="tag in dynamicTags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
                {{tag}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <!-- <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 正确订单号</el-button>   -->
             
            </div>
            <el-row class="m20">
              <el-alert
                title="催收员"
                type="info"
                :closable="false">
              </el-alert>   
            </el-row>
            <el-row class="m20 col-flex" >
              <el-select v-model="trevewer" placeholder="请选择催收员">
                <el-option
                  v-for="item in trevewerlist"
                  :key="item.uid"
                  :label="item.username"
                  :value="item.uid">
                </el-option>
              </el-select>  
              <el-button type="primary" style="margin-left:30px" @click="handleConfig">确认</el-button>
              <el-button type="primary" style="margin-left:30px" @click="dialogVisible=false">取消</el-button>
            </el-row>
        </el-dialog>                  
    </div>
</template>

<script>
import {
  getExeceedtimeapplyList,
  httpExeceedtimeapplydetail,
  httpGetrevewerlist,
  execeedtimeDistribute
} from "../../../service/http";
import Timer from "../../../config/timer";
import { timeFormat } from "../../../config/time";
export default {
  name: "credit",
  data() {
    return {
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
    getData(
      npage,
      pagesize,
      begainTimeString,
      endTimeString,
      phoneNumber,
      execeedtimeType
    ) {
      let _this = this;
      getExeceedtimeapplyList(
        npage,
        pagesize,
        begainTimeString,
        endTimeString,
        phoneNumber,
        execeedtimeType
      )
        .then(res => {
          let data = res.data;
          let tableData = data.list;

          for (let a = 0; a < data.list.length; a++) {
            httpExeceedtimeapplydetail(data.list[a].id)
              .then(re => {
                tableData[a].detail = re.data;
              })
              .catch();
          }
          _this.tableData = tableData;
          _this.total = data.allsize;
        })
        .catch();
    },
    handleSearch() {
      if (this.search.time && this.search.time.length) {
        if (this.execeedtimeType == 0) {
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
            this.search.time[0] + " 00:00:00",
            timeFormat(this.search.time[1], 1) + " 00:00:00",
            this.search.phoneNumber,
            this.execeedtimeType
          );
        }
      } else {
        if (this.execeedtimeType == 0) {
          this.getData(
            this.npage,
            this.pagesize,
            "",
            "",
            this.search.phoneNumber
          );
        } else {
          this.getData(
            this.npage,
            this.pagesize,
            "",
            "",
            this.search.phoneNumber,
            this.execeedtimeType
          );
        }
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
        .catch(err => {
          this.$message.error("催收员列表获取失败请刷新页面或联系客服");
        });
    },
    handleConfig() {
      if (this.trevewer) {
        execeedtimeDistribute(this.dynamicTags.join(","), this.trevewer)
          .then(res => {
            console.log(res);
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
    filterStauts(value, row){
      return row.status === value;      
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
