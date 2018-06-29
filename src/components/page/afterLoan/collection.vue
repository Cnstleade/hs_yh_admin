<template>
    <div class="container">
        <el-row>
            <el-alert
              title="逾期列表展示"
              :closable="false"
              type="info">
            </el-alert>           
        </el-row>  
        <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card" v-loading="lodings" class="m20">
            <el-tab-pane label="未分配" name="first">
        <el-row class="m20" >
            <el-col   class="col-flex-end">
                    <el-button-group>
                      <el-button :type="execeedtimeType==0?'info':''" @click="changeExeceedtimeType(0)">重置</el-button>
                      <el-button :type="execeedtimeType==1?'primary':''" @click="changeExeceedtimeType(1)">M1</el-button>
                      <el-button :type="execeedtimeType==2?'success':''" @click="changeExeceedtimeType(2)">M2</el-button>
                      <el-button :type="execeedtimeType==3?'warning':''" @click="changeExeceedtimeType(3)">M3</el-button>
                      <el-button :type="execeedtimeType==4?'danger':''" @click="changeExeceedtimeType(4)">M3+</el-button>
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
            <el-table-column prop="collectorUserName" label="催收员" align="center"  >
                <template slot-scope="scope">
                    {{scope.row.collectorUserName?scope.row.collectorUserName:'暂无催收员'}}
                </template>
            </el-table-column>            
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
                      <el-table-column v-if="props.row.detail.withdraws.overdue&&props.row.detail.withdraws.overdue.overdueDay"  prop="id" label="等级" align="center" width="100">
                        <template slot-scope="scope">
                            <el-tag
                                :type="(scope.row.overdue.overdueDay===0||scope.row.overdue.overdueDay===null)?'success':scope.row.overdue.overdueDay <  11 ?'primary':scope.row.status < 21?'info':scope.row.status < 31?'warning':'danger'"
                            >
                            {{(scope.row.overdue.overdueDay===0||scope.row.overdue.overdueDay===null)?'无':scope.row.overdue.overdueDay <  11 ?'M1':scope.row.status < 21?'M2':scope.row.status < 31?'M3':'M3+'}}
                            </el-tag>
                        </template> 
                      </el-table-column>
                      <el-table-column prop="id" label="id" align="center" sortable></el-table-column>
                      <el-table-column prop="withdrawMoney" label="提现金额" align="center" sortable></el-table-column>
                      <el-table-column prop="borrowTime" label="提现时间" align="center" sortable>
                        <template slot-scope="scope">
                            {{scope.row.borrowTime|dateServer}}
                        </template>                          
                      </el-table-column>
                      <el-table-column prop="status" label="是否逾期" align="center" 
                         :filters="[{ value: 0, text: '放款中 ' }, { value: 1, text: '放款成功' }, { value: 2, text: '逾期' }, { value: 3, text: '还款成功' }, { value: 4, text: '放款失败' }, { value: 5, text: '还款中' }, { value: 6, text: '还款失败' }]"
                         :filter-method="filterStauts"                      
                      >
                        <template slot-scope="scope">
                            <el-tag
                                :type="scope.row.status===0?'':scope.row.status===1?'success':scope.row.status===2?'danger':scope.row.status===4?'success':scope.row.status===4?'info':scope.row.status===5?'':'warning'"
                            >{{scope.row.status===0?'放款中':scope.row.status===1?'放款成功':scope.row.status===2?'逾期':scope.row.status===3?'还款成功':scope.row.status===4?'放款失败':scope.row.status===5?'还款中':'还款失败'}}</el-tag>
                        </template>                         
                      </el-table-column>
                      <el-table-column v-if="props.row.detail.withdraws.overdue&&props.row.detail.withdraws.overdue.overdueDay" prop="overdue.overdueDay" label="逾期天数" align="center" sortable></el-table-column>
                      <el-table-column v-if="props.row.detail.withdraws.overdue&&props.row.detail.withdraws.overdue.lateFee" prop="overdue.lateFee" label="违约金" align="center" sortable></el-table-column>
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
               
            </el-tab-pane>
            <el-tab-pane label="已经分配" name="second">
        <el-row class="m20" >
            <el-col   class="col-flex-end">
                    <el-button-group>
                      <el-button :type="execeedtimeType==0?'info':''" @click="changeExeceedtimeType(0)">重置</el-button>
                      <el-button :type="execeedtimeType==1?'primary':''" @click="changeExeceedtimeType(1)">M1</el-button>
                      <el-button :type="execeedtimeType==2?'success':''" @click="changeExeceedtimeType(2)">M2</el-button>
                      <el-button :type="execeedtimeType==3?'warning':''" @click="changeExeceedtimeType(3)">M3</el-button>
                      <el-button :type="execeedtimeType==4?'danger':''" @click="changeExeceedtimeType(4)">M3+</el-button>
                    </el-button-group>  
                    <el-select class="l20" v-model="collectorId" placeholder="请选择催收员">
                      <el-option
                        v-for="item in trevewerlist"
                        :key="item.uid"
                        :label="item.username"
                        :value="item.uid">
                      </el-option>
                    </el-select>                        
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
            <!-- <el-table-column
              type="selection"
              width="55">
            </el-table-column>         -->
       
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
            <el-table-column prop="collectorUserName" label="催收员" align="center"  >
                <template slot-scope="scope">
                    {{scope.row.collectorUserName?scope.row.collectorUserName:'暂无催收员'}}
                </template>
            </el-table-column>            
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
                      <el-table-column v-if="props.row.detail.withdraws.overdue&&props.row.detail.withdraws.overdue.overdueDay"  prop="id" label="等级" align="center" width="100">
                        <template slot-scope="scope">
                            <el-tag
                                :type="(scope.row.overdue.overdueDay===0||scope.row.overdue.overdueDay===null)?'success':scope.row.overdue.overdueDay <  11 ?'primary':scope.row.status < 21?'info':scope.row.status < 31?'warning':'danger'"
                            >
                            {{(scope.row.overdue.overdueDay===0||scope.row.overdue.overdueDay===null)?'无':scope.row.overdue.overdueDay <  11 ?'M1':scope.row.status < 21?'M2':scope.row.status < 31?'M3':'M3+'}}
                            </el-tag>
                        </template> 
                      </el-table-column>                  
                      <el-table-column prop="id" label="id" align="center" sortable></el-table-column>
                      <el-table-column prop="withdrawMoney" label="提现金额" align="center" sortable></el-table-column>
                      <el-table-column prop="borrowTime" label="提现时间" align="center" sortable>
                        <template slot-scope="scope">
                            {{scope.row.borrowTime|dateServer}}
                        </template>                          
                      </el-table-column>
                      <el-table-column prop="status" label="是否逾期" align="center" 
                         :filters="[{ value: 0, text: '放款中 ' }, { value: 1, text: '放款成功' }, { value: 2, text: '逾期' }, { value: 3, text: '还款成功' }, { value: 4, text: '放款失败' }, { value: 5, text: '还款中' }, { value: 6, text: '还款失败' }]"
                         :filter-method="filterStauts"                      
                      >
                        <template slot-scope="scope">
                            <el-tag
                                :type="scope.row.status===0?'':scope.row.status===1?'success':scope.row.status===2?'danger':scope.row.status===4?'success':scope.row.status===4?'info':scope.row.status===5?'':'warning'"
                            >{{scope.row.status===0?'放款中':scope.row.status===1?'放款成功':scope.row.status===2?'逾期':scope.row.status===3?'还款成功':scope.row.status===4?'放款失败':scope.row.status===5?'还款中':'还款失败'}}</el-tag>
                        </template>                         
                      </el-table-column>
                      <el-table-column v-if="props.row.detail.withdraws.overdue&&props.row.detail.withdraws.overdue.overdueDay" prop="overdue.overdueDay" label="逾期天数" align="center" sortable></el-table-column>
                      <el-table-column v-if="props.row.detail.withdraws.overdue&&props.row.detail.withdraws.overdue.lateFee" prop="overdue.lateFee" label="违约金" align="center" sortable></el-table-column>
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
                       >重新分配</el-button>
                    </template> 
                </el-table-column>            
        </el-table>  
        <el-row class="m20" v-if="total>0">
            <!-- <el-button type="primary" style="float:left" @click="handelConfigAll" :disabled="multipleSelection.length==0">批量分配</el-button> -->
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
            
            </el-tab-pane>
        </el-tabs>      
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
  execeedtimeDistribute,
  getExeceedtimeapplyListbycollectorR
} from "../../../service/http";
import Timer from "../../../config/timer";
import { timeFormat } from "../../../config/time";
export default {
  name: "credit",
  data() {
    return {
      collectorId: null,
      distributionStatus: 1,
      lodings: false,
      activeName: "first",
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
      phonenumber,
      execeedtimeType,
      distributionStatus,
      collectorId
    ) {
      let _this = this;
      getExeceedtimeapplyList(
        npage,
        pagesize,
        begainTimeString,
        endTimeString,
        phonenumber,
        execeedtimeType,
        distributionStatus,
        collectorId
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
          this.collectorId = null;
          this.getData(
            this.npage,
            this.pagesize,
            this.search.time[0] + " 00:00:00",
            timeFormat(this.search.time[1], 1) + " 00:00:00",
            this.search.phoneNumber,
            "",
            this.distributionStatus,
            this.collectorId
          );
        } else {
          this.getData(
            this.npage,
            this.pagesize,
            this.search.time[0] + " 00:00:00",
            timeFormat(this.search.time[1], 1) + " 00:00:00",
            this.search.phoneNumber,
            this.execeedtimeType,
            this.distributionStatus,
            this.collectorId
          );
        }
      } else {
        if (this.execeedtimeType == 0) {
          this.collectorId = null;
          this.getData(
            this.npage,
            this.pagesize,
            "",
            "",
            this.search.phoneNumber,
            "",
            this.distributionStatus,
            this.collectorId
          );
        } else {
          this.getData(
            this.npage,
            this.pagesize,
            "",
            "",
            this.search.phoneNumber,
            this.execeedtimeType,
            this.distributionStatus,
            this.collectorId
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
          console.log(trevewerlist);
        })
        .catch(err => {});
    },
    handleConfig() {
      let _this = this;
      if (this.trevewer) {
        if (this.distributionStatus == 1) {
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
          getExeceedtimeapplyListbycollectorR(
            this.trevewer,
            this.dynamicTags[0]
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
            .catch();
        }
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
    handleClick(tab, event) {
      console.log(tab.name);
      tab.name === "second"
        ? (this.distributionStatus = 2)
        : (this.distributionStatus = 1);
      this.lodings = true;
      this.getData(
        this.npage,
        this.pagesize,
        "",
        "",
        "",
        "",
        this.distributionStatus
      );
      setTimeout(() => {
        this.lodings = false;
      }, 500);
    }
  },
  mounted() {
    this.getData(
      this.npage,
      this.pagesize,
      "",
      "",
      "",
      "",
      this.distributionStatus
    );
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
