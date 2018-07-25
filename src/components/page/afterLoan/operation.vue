<template>
    <div class="container">
        <el-row>
            <el-alert
              title="还款操作管理"
              :closable="false"
              type="info">
            </el-alert>           
        </el-row>     
  <el-tabs v-model="activeName" type="border-card" class="m20" @tab-click="handleClick" v-loading="lodings">
    <el-tab-pane label="进行中催收订单" name="first">
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
                      <el-table-column   prop="id" label="等级" align="center" width="100">
                        <template slot-scope="scope">
                            <el-tag
                                :type="(scope.row.overdue===null||scope.row.overdue.overdueDay===0||scope.row.overdue.overdueDay===null)?'success':scope.row.overdue.overdueDay <  11 ?'primary':scope.row.status < 21?'info':scope.row.status < 31?'warning':'danger'"
                            >
                            {{(scope.row.overdue===null||scope.row.overdue.overdueDay===0||scope.row.overdue.overdueDay===null)?'无':scope.row.overdue.overdueDay <  11 ?'M1':scope.row.status < 21?'M2':scope.row.status < 31?'M3':'M3+'}}
                            </el-tag>
                        </template> 
                      </el-table-column>
                      <el-table-column prop="id" label="id" align="center" sortable></el-table-column>
                      <el-table-column prop="withdrawMoney" label="实际到账金额" align="center" sortable></el-table-column>
                      <el-table-column prop="raiseMoney" label="提现金额" align="center" sortable></el-table-column>
                      <el-table-column prop="borrowTime" label="提现时间" align="center" sortable>
                        <template slot-scope="scope">
                            {{scope.row.creatime|dateServer}}
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
                      <el-table-column  prop="overdue.overdueDay" label="逾期天数" align="center" sortable></el-table-column>
                      <el-table-column  prop="overdue.lateFee" label="违约金" align="center" sortable></el-table-column>
                      <el-table-column  prop="overdue.lateFee" label="线下还款申请情况" align="center"  >
                        <template slot-scope="scope">
                            <el-tag
                                :type="scope.row.loanRepaymentApplyId==1?'success':scope.row.loanRepaymentApplyId==2?'':'danger'"
                            >{{scope.row.loanRepaymentApplyId==1?'已申请':scope.row.loanRepaymentApplyId==2?'申请成功':'没申请'}}</el-tag>
                        </template>   
                      </el-table-column>
                      <el-table-column prop="cz"  align="center" label="操作"   >
                          <template slot-scope="scope">
                          <el-button
                              size="mini"
                              v-if="!scope.row.loanRepaymentApplyId"
                              type="success"
                              :disabled="scope.row.status===0?true:scope.row.status===1?false:scope.row.status===2?false:scope.row.status===3?true:scope.row.status===4?true:scope.row.status===5?false:true"
                              @click="handlehk(scope.$index, scope.row)"
                             >还款申请
                             </el-button>
                          <el-button
                              v-if="scope.row.loanRepaymentApplyId==1"
                              size="mini"
                              type="success"
                              :disabled="scope.row.status===0?true:scope.row.status===1?false:scope.row.status===2?false:scope.row.status===3?true:scope.row.status===4?true:scope.row.status===5?false:true"
                              @click="handleXK(scope.$index, scope.row)"
                             >申请修改
                             </el-button>   
                          <el-button
                              size="mini"
                              v-if="scope.row.loanRepaymentApplyId==2"
                              type="success"
                              :disabled="scope.row.status===0?true:scope.row.status===1?false:scope.row.status===2?false:scope.row.status===3?true:scope.row.status===4?true:scope.row.status===5?false:true"
                              @click="handlehk(scope.$index, scope.row)"
                             >再次申请
                             </el-button>                                                       
                          </template> 
                      </el-table-column> 
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
                       >添加记录</el-button>
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
    </el-tab-pane>
    <el-tab-pane label="已完成催收订单" name="second">
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
                      <el-table-column   prop="id" label="等级" align="center" width="100">
                        <template slot-scope="scope">
                            <el-tag
                                :type="(scope.row.overdue===null||scope.row.overdue.overdueDay===0||scope.row.overdue.overdueDay===null)?'success':scope.row.overdue.overdueDay <  11 ?'primary':scope.row.status < 21?'info':scope.row.status < 31?'warning':'danger'"
                            >
                            {{(scope.row.overdue===null||scope.row.overdue.overdueDay===0||scope.row.overdue.overdueDay===null)?'无':scope.row.overdue.overdueDay <  11 ?'M1':scope.row.status < 21?'M2':scope.row.status < 31?'M3':'M3+'}}
                            </el-tag>
                        </template> 
                      </el-table-column>
                      <el-table-column prop="id" label="id" align="center" sortable></el-table-column>
                      <el-table-column prop="withdrawMoney" label="实际到账金额" align="center" sortable></el-table-column>
                      <el-table-column prop="raiseMoney" label="提现金额" align="center" sortable></el-table-column>
                      <el-table-column prop="borrowTime" label="提现时间" align="center" sortable>
                        <template slot-scope="scope">
                            {{scope.row.creatime|dateServer}}
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
                      <el-table-column  prop="overdue.overdueDay" label="逾期天数" align="center" sortable></el-table-column>
                      <el-table-column  prop="overdue.lateFee" label="违约金" align="center" sortable></el-table-column>
                  
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
    </el-tab-pane>
  </el-tabs>        
        <!-- <el-row class="m20" >
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
                         :filters="[{ value: 0, text: '放款中 ' }, { value: 1, text: '放款成功' }, { value: 2, text: '逾期' }, { value: 3, text: '还款成功' }, { value: 4, text: '放款失败' }, { value: 5, text: '还款中' }, { value: 6, text: '还款失败' }]"
                         :filter-method="filterStauts"                      
                      >
                        <template slot-scope="scope">
                            <el-tag
                                :type="scope.row.status===0?'':scope.row.status===1?'success':scope.row.status===2?'danger':scope.row.status===4?'success':scope.row.status===4?'info':scope.row.status===5?'':'warning'"
                            >{{scope.row.status===0?'放款中':scope.row.status===1?'放款成功':scope.row.status===2?'逾期':scope.row.status===3?'还款成功':scope.row.status===4?'放款失败':scope.row.status===5?'还款中':'还款失败'}}</el-tag>
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
                       >添加记录</el-button>
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
        </el-row> -->
        <el-dialog
          title="提交还款申请"
          :visible.sync="dialogVisible1"
          center
          width="40%"
          >
            <el-row>  
            <el-form  :model="editForm"  ref="editForm"   label-width="150px" :rules="rules">
                <el-form-item label="提现id：" >
                  <el-input v-model="editForm.withdrawId"    disabled></el-input>
                </el-form-item>
                <el-form-item label="需要还款金额：" >
                  <el-input v-model="editForm.yMoney"   disabled></el-input>
                </el-form-item>                   
                <el-form-item label="申请实际还款金额：" prop="realMoney">
                  <el-input v-model="editForm.realMoney"   placeholder="请输入申请实际还款金额"></el-input>
                </el-form-item>   
                <el-form-item label="备注：" prop="remark">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入还款申请备注"
                    v-model="editForm.remark">
                  </el-input>
                </el-form-item>                                                                                
                <el-form-item label="图片凭证：" >
                 <el-col >
                    <el-upload
                        action="123"
                      class="upload-demo"
                      ref="upload"
                      :limit="1"
                      :on-exceed="handleExceed"
                      :on-change="handleChange"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
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
        <el-dialog
          title="添加催收记录"
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
                >
                {{dynamicTags[0]}}
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
                title="催收描述"
                type="info"
                :closable="false">
              </el-alert>   
            </el-row>
            <el-input
              class="m20"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入催收描述"
              v-model="textarea">
            </el-input>            
            <el-row class="m20">
              <el-alert
                title="催收结果"
                type="info"
                :closable="false">
              </el-alert>   
            </el-row>
            <el-row class="m20 col-flex" >
              <el-select v-model="trevewer" placeholder="催收结果">
                <el-option
                  v-for="item in trevewerlist"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>  
              <el-button type="primary" style="margin-left:30px" @click="handleConfig">确认</el-button>
              <el-button type="primary" style="margin-left:30px" @click="dialogVisible=false">取消</el-button>
              <span style="margin-left:20px;font-size:12px;line-height:30px;color:#999">Tips: 必须上传支付凭证</span>
            </el-row>
        </el-dialog>  
            <!-- <el-form  :model="editForm"  ref="editForm"   label-width="150px" :rules="rules">
                <el-form-item label="提现id：" >
                  <el-input v-model="editForm.withdrawId"    disabled></el-input>
                </el-form-item>
                <el-form-item label="需要还款金额：" >
                  <el-input v-model="editForm.yMoney"   disabled></el-input>
                </el-form-item>                   
                <el-form-item label="申请实际还款金额：" prop="realMoney">
                  <el-input v-model="editForm.realMoney"   placeholder="请输入申请实际还款金额"></el-input>
                </el-form-item>   
                <el-form-item label="备注：" prop="remark">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入还款申请备注"
                    v-model="editForm.remark">
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
                      <div slot="tip" class="el-upload__tip">（必须上传图片，且大小为4M以内），且不超过4M</div>
                    </el-upload>                    
                 </el-col>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onAddSubmit('editForm')">提交</el-button>
                  <el-button @click="changeDialog()">取消</el-button>
                </el-form-item>                                                                  
            </el-form>                           -->

        <el-dialog
          title="提交还款申请"
          :visible.sync="dialogVisible2"
          center
          width="40%"
          >

            <el-row>  
            <el-form   :model="editForm"  ref="editForm"   label-width="150px" :rules="rules">
                <el-form-item label="提现id：" >
                  <el-input v-model="editForm.withdrawId"    disabled></el-input>
                </el-form-item>
                <el-form-item label="上传申请时间：" >
                  <el-input v-model="editForm.time"    disabled>
                    {{editForm.time | dateServer}}
                  </el-input>
                </el-form-item>                
                <el-form-item label="需要还款金额：" >
                  <el-input v-model="editForm.yMoney"   disabled></el-input>
                </el-form-item>                   
                <el-form-item label="申请实际还款金额：" prop="realMoney">
                  <el-input v-model="editForm.realMoney"   placeholder="请输入申请实际还款金额"></el-input>
                </el-form-item>   
                <el-form-item label="备注：" prop="remark">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入还款申请备注"
                    v-model="editForm.remark">
                  </el-input>
                </el-form-item>                                                                                
                <el-form-item label="图片凭证：" >
                 <el-col >
                    <el-upload
                        action="123"
                      class="upload-demo"
                        :limit="1"
                      ref="upload1"
                      :on-exceed="handleExceed"
                      :on-change="handleChange"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                  
                        :before-remove="beforeRemove"
                        :file-list="fileList2"
                      :before-upload="beforeAvatarUpload1"
                      list-type="picture"
                      :auto-upload="false" >
                      <el-button slot="trigger" size="small" type="primary">重新上传</el-button>
                      <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
                      <div slot="tip" class="el-upload__tip">（必须上传图片，且大小为4M以内），且不超过4M</div>
                    </el-upload>                    
                 </el-col>
                </el-form-item>
                <!-- <input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update"/>   -->
                <el-form-item>
                  <el-button type="primary" @click="onAddSubmit1('editForm')">提交</el-button>
                  <el-button @click="changeDialog()">取消</el-button>
                              <span style="margin-left:20px;font-size:12px;line-height:30px;color:#999">Tips: 必须上传支付凭证</span>
                </el-form-item>                                                                  
            </el-form>              
            </el-row>
        </el-dialog>          
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from "axios";
import {
  getExec,
  httpExeceedtimeapplydetail,
  httpGetrevewerlist,
  execeedtimeDistribute,
  getAddcollectdetail,
  getOfflinePaymentapplydetail,
  getOfflinePaymentapplyUpdata
} from "../../../service/http";
import Timer from "../../../config/timer";
import { timeFormat } from "../../../config/time";
export default {
  name: "credit",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value <= 0 || isNaN(value)) {
        callback(new Error("请输入大于0的数且不为汉字或字符"));
      } else {
        // this.$refs.editForm.validateField("realMoney");
      }
      callback();
    };
    return {
      imgAdd: true,
      dialogVisible2: false,
      fileList2: [],
      rules: {
        remark: [{ required: true, message: "请填写备注", trigger: "blur" }],
        title: [
          { required: true, message: "请选择电销人员", trigger: "change" }
        ],
        realMoney: [
          { required: true, validator: validatePass, trigger: "change" }
        ]
        // recallType: [
        //   { required: true, message: "请选择类型", trigger: "change" }
        // ]
      },
      editForm: {
        upload: null,
        realMoney: "",
        withdrawId: "",
        remark: "",
        num: ""
      },
      dialogVisible1: false,
      lodings: false,
      distributionStatus: 2,
      activeName: "first",
      textarea: "",
      search: {
        textarea: "",
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
      trevewerlist: [
        { label: "成功", value: "1" },
        { label: "失败", value: "2" },
        { label: "进行中", value: "3" }
      ],
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
      execeedtimeType,
      distributionStatus
    ) {
      let _this = this;
      getExec(
        npage,
        pagesize,
        begainTimeString,
        endTimeString,
        phoneNumber,
        execeedtimeType,
        distributionStatus
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
        .catch(err => {
          _this.tableData = [];
          _this.loading = false;
        });
    },
    handleSearch() {
      if (this.search.time && this.search.time.length) {
        if (this.execeedtimeType == 0) {
          this.getData(
            this.npage,
            this.pagesize,
            this.search.time[0] + " 00:00:00",
            timeFormat(this.search.time[1], 1) + " 00:00:00",
            this.search.phoneNumber,
            "",
            this.distributionStatus
          );
        } else {
          this.getData(
            this.npage,
            this.pagesize,
            this.search.time[0] + " 00:00:00",
            timeFormat(this.search.time[1], 1) + " 00:00:00",
            this.search.phoneNumber,
            this.execeedtimeType,
            this.distributionStatus
          );
        }
      } else {
        if (this.execeedtimeType == 0) {
          this.getData(
            this.npage,
            this.pagesize,
            "",
            "",
            this.search.phoneNumber,
            "",
            this.distributionStatus
          );
        } else {
          this.getData(
            this.npage,
            this.pagesize,
            "",
            "",
            this.search.phoneNumber,
            this.execeedtimeType,
            this.distributionStatus
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
    // getrevewerlist() {
    //   httpGetrevewerlist()
    //     .then(res => {
    //       let data = res.data;
    //       this.trevewerlist = data;
    //     })
    //     .catch(err => {
    //       this.$message.error("催收员列表获取失败请刷新页面或联系客服");
    //     });
    // },
    handleConfig() {
      let _this = this;
      if (this.textarea !== "" && this.trevewer) {
        getAddcollectdetail(this.dynamicTags[0], this.textarea, this.trevewer)
          .then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: "催收记录添加成",
                type: "success"
              });
            } else {
              this.$message.error("催收描述和催收结果不能为空");
            }
          })
          .catch(err => {
            this.$message.error("催收描述和催收结果不能为空");
          });
      } else {
        this.$message.error("催收描述和催收结果不能为空");
      }
      this.dialogVisible = false;
      this.textarea = "";
      this.trevewer = null;

      // if (this.trevewer) {
      //   execeedtimeDistribute(
      //     this.dynamicTags.length == 1
      //       ? this.dynamicTags[0] + ","
      //       : this.dynamicTags.join(","),
      //     this.trevewer
      //   )
      //     .then(res => {
      //       if (res.data.code == 200) {
      //         this.$message({
      //           message: "分配成功",
      //           type: "success"
      //         });
      //         _this.dialogVisible = false;
      //         _this.getData(
      //           this.npage,
      //           this.pagesize,
      //           "",
      //           "",
      //           "",
      //           "",
      //           this.distributionStatus
      //         );
      //       }
      //     })
      //     .catch(err => {
      //       this.$message.error("催收员必须存在");
      //     });
      // } else {
      //   this.$message.error("催收员必须存在");
      // }
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
      tab.name === "second"
        ? (this.distributionStatus = 1)
        : (this.distributionStatus = 2);
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
    },
    handlehk(index, row) {
      this.editForm.withdrawId = row.id;
      this.editForm.yMoney = row.overdue
        ? Number(row.withdrawMoney) + Number(row.overdue.lateFee)
        : Number(row.withdrawMoney);

      this.dialogVisible1 = true;
    },
    handleXK(index, row) {
      let id = row.id;
      let _this = this;
      this.editForm.withdrawId = row.id;
      this.editForm.yMoney = row.overdue
        ? Number(row.withdrawMoney) + Number(row.overdue.lateFee)
        : Number(row.withdrawMoney);
      getOfflinePaymentapplydetail(id)
        .then(res => {
          let data = res.data.data;
          _this.editForm.realMoney = data.realMoney;
          _this.editForm.remark = data.remark;
          _this.editForm.time = data.createtime;
          _this.editForm.urlRemark = data.urlRemark;
          _this.fileList2 = [
            {
              name: "凭证照片",
              url: data.urlRemark
            }
          ];

          _this.dialogVisible2 = true;
        })
        .catch();
    },
    beforeAvatarUpload(file) {
      //将文件 的所有的内容都添加在这一起上传
      let fd = new FormData();
      fd.append("upload", file);
      fd.append("realMoney", Number(this.editForm.realMoney)); //其他参数
      fd.append("withdrawId", Number(this.editForm.withdrawId)); //其他参数
      // fd.append("discountAmt", Number(this.editForm.discountAmt)); //其他参数
      // fd.append("mustPayBackAmt", Number(this.editForm.mustPayBackAmt)); //其他参数
      // fd.append("actualPayBackAmt", Number(this.editForm.actualPayBackAmt)); //其他参数
      fd.append("remark", this.editForm.remark); //其他参数
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
      this.dialogVisible1 = false;
      this.resetForm("editForm");
      axios.post("/sys/offlinePaymentapply", fd, {});
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

    onAddSubmit1(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (_this.imgAdd) {
            getOfflinePaymentapplyUpdata(
              _this.editForm.realMoney,
              _this.editForm.urlRemark,
              _this.editForm.withdrawId,
              _this.editForm.remark
            )
              .then(res => {
                console.log(res);
                _this.dialogVisible2 = false;
                _this.resetForm("editForm");
                _this.imgAdd = true;
              })
              .catch();
          } else {
            this.$refs.upload1.submit();
          }
        } else {
          return false;
        }
      });
    },
    beforeAvatarUpload1(file) {
      //将文件 的所有的内容都添加在这一起上传
      let fd = new FormData();
      fd.append("upload", file);
      fd.append("realMoney", Number(this.editForm.realMoney)); //其他参数
      fd.append("withdrawId", Number(this.editForm.withdrawId)); //其他参数
      // fd.append("discountAmt", Number(this.editForm.discountAmt)); //其他参数
      // fd.append("mustPayBackAmt", Number(this.editForm.mustPayBackAmt)); //其他参数
      // fd.append("actualPayBackAmt", Number(this.editForm.actualPayBackAmt)); //其他参数
      fd.append("remark", this.editForm.remark); //其他参数
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
      this.dialogVisible2 = false;
      this.resetForm("editForm");
      this.imgAdd = true;
      axios.post("/sys/offlinePaymentapplyupdate", fd, {});
      return isJPG && isLt2M;
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {
      this.imgAdd = false;
      this.$message.error("必须上传图片凭证");
      console.log(file, fileList);
    },
    handlePreview(file) {},
    handleChange(file, fileList) {},
    changeDialog() {
      this.dialogVisible = false;
      this.resetForm("editForm");
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
