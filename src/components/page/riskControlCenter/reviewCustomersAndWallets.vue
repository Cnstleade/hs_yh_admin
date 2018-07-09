<template>
    <div class="container">
        <el-row>
            <el-alert
              :title="title"
              :closable="false"
              type="info">
            </el-alert>           
        </el-row>  
        <el-tabs v-model="activeName" @tab-click="handleClic" type="border-card" v-loading="lodings" class="m20">
            <el-tab-pane label="全部" name="first"> 
                <el-row class="m20" >
                    <el-col   class="col-flex-end">
                            <!-- <el-button-group>
                              <el-button :type="execeedtimeType==0?'info':''" @click="changeExeceedtimeType(0)">重置</el-button>
                              <el-button :type="execeedtimeType==1?'primary':''" @click="changeExeceedtimeType(1)">M1</el-button>
                              <el-button :type="execeedtimeType==2?'success':''" @click="changeExeceedtimeType(2)">M2</el-button>
                              <el-button :type="execeedtimeType==3?'warning':''" @click="changeExeceedtimeType(3)">M3</el-button>
                              <el-button :type="execeedtimeType==4?'danger':''" @click="changeExeceedtimeType(4)">M3+</el-button>
                            </el-button-group>     -->
                            <el-button  type="primary" @click="reset">重置</el-button>
                            <!-- <el-select class="l20" v-model="search.withdrawStatu" placeholder="催收人员">
                              <el-option
                                v-for="item in withdrawStatus"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                              </el-option>
                            </el-select>                       -->
                            <div class="l20">
                                <el-input
                                style="padding:0px 10px 0px 0px"
                                  placeholder="请输入用户名"
                                  v-model="search.input"
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
                    v-loading="loading"
                    id="eleTable"
                  >
                <el-table-column prop="id" label="ID" align="center"></el-table-column>
                    <el-table-column prop="userName" label="姓名" align="center" width="80"></el-table-column>
                    <el-table-column label="审核人" align="center">
                      <template slot-scope="scope">
                        <div v-if="scope.row.operatorName === ''|| scope.row.operatorName === null">
                          <el-button type="info" size="mini" @click="allotOperator(scope.row)">分配</el-button>
                        </div>
                        <span v-else>
                          {{scope.row.operatorName}}
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column label="来源" align="center">
                      <template slot-scope="scope">
                        <span>
                          {{scope.row.source==='1'?'IOS':scope.row.source==='2'?'Android':'线上'}}
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="idNo" label="身份证号" align="center" width="150"></el-table-column>
                    <el-table-column prop="mobile" label="手机号" align="center" width="120"></el-table-column>
                    <!--<el-table-column prop="mobileDetails" label="手机详情" align="center"></el-table-column>-->
                    <el-table-column label="贷款状态" align="center">
                      <template slot-scope="scope">
                        <span>
                          {{scope.row.status===0?'重申中'
                          :scope.row.status===1?'审核中'
                          :scope.row.status===2?'拒绝'
                          :scope.row.status===3?'通过审核'
                          :scope.row.status===4?'已打款'
                          :scope.row.status===5?'还款':'完结'}}
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="applyAmt" label="申请金额" align="center"></el-table-column>
                    <el-table-column prop="approveAmt" label="通过金额" align="center"></el-table-column>
                    <el-table-column label="审核结果" align="center" width="140">
                      <template slot-scope="scope">
                        <el-tag
                          :type="scope.row.approveResult ===1?''
                                :scope.row.approveResult===2?'danger'
                                :scope.row.approveResult===3?'success'
                                :scope.row.approveResult===4?'warning':'info'">
                          {{scope.row.approveResult ===1?'自动审核通过'
                          :scope.row.approveResult===2?'自动审核不通过'
                          :scope.row.approveResult===3?'人工审核通过'
                          :scope.row.approveResult===4?'人工审核不通过':'大数据风控中'}}
                        </el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column prop="approverName" label="审核经理" align="center"></el-table-column>

                    <el-table-column label="订单状态" align="center" width="140">
                      <template slot-scope="scope">
                        <span>
                          {{scope.row.applyStatus ===0?'初始'
                          :scope.row.applyStatus===1?'审核员审核中'
                          :scope.row.applyStatus===2?'审核经理审核中'
                          :scope.row.applyStatus===3?'审核订单重申中'
                          :scope.row.applyStatus===4?'高风险用户':'审核完成'}}
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="applyTime" label="申请时间" align="center" :formatter="dateFormat"
                                     width="150"></el-table-column>
                    <el-table-column prop="channel" label="渠道" align="center" width="100"></el-table-column>
                    <!-- <el-table-column label="操作" align="center" >
                      <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-info" @click="examine(scope.row)">查看</el-button>
                      </template>
                    </el-table-column> -->
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
            </el-tab-pane > 
            <el-tab-pane label="已通过" name="second"> 
                <el-row class="m20" >
                    <el-col   class="col-flex-end">
                            <!-- <el-button-group>
                              <el-button :type="execeedtimeType==0?'info':''" @click="changeExeceedtimeType(0)">重置</el-button>
                              <el-button :type="execeedtimeType==1?'primary':''" @click="changeExeceedtimeType(1)">M1</el-button>
                              <el-button :type="execeedtimeType==2?'success':''" @click="changeExeceedtimeType(2)">M2</el-button>
                              <el-button :type="execeedtimeType==3?'warning':''" @click="changeExeceedtimeType(3)">M3</el-button>
                              <el-button :type="execeedtimeType==4?'danger':''" @click="changeExeceedtimeType(4)">M3+</el-button>
                            </el-button-group>     -->
                            <el-button  type="primary" @click="reset">重置</el-button>
                            <!-- <el-select class="l20" v-model="search.withdrawStatu" placeholder="催收人员">
                              <el-option
                                v-for="item in withdrawStatus"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                              </el-option>
                            </el-select>                       -->
                            <div class="l20">
                                <el-input
                                style="padding:0px 10px 0px 0px"
                                  placeholder="请输入用户名"
                                  v-model="search.input"
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
                    v-loading="loading"
                    id="eleTable"
                  >
                <el-table-column prop="id" label="ID" align="center"></el-table-column>
                    <el-table-column prop="userName" label="姓名" align="center" width="80"></el-table-column>
                    <el-table-column label="审核人" align="center">
                      <template slot-scope="scope">
                        <div v-if="scope.row.operatorName === ''|| scope.row.operatorName === null">
                          <el-button type="info" size="mini" @click="allotOperator(scope.row)">分配</el-button>
                        </div>
                        <span v-else>
                          {{scope.row.operatorName}}
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column label="来源" align="center">
                      <template slot-scope="scope">
                        <span>
                          {{scope.row.source==='1'?'IOS':scope.row.source==='2'?'Android':'线上'}}
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="idNo" label="身份证号" align="center" width="150"></el-table-column>
                    <el-table-column prop="mobile" label="手机号" align="center" width="120"></el-table-column>
                    <!--<el-table-column prop="mobileDetails" label="手机详情" align="center"></el-table-column>-->
                    <el-table-column label="贷款状态" align="center">
                      <template slot-scope="scope">
                        <span>
                          {{scope.row.status===0?'重申中'
                          :scope.row.status===1?'审核中'
                          :scope.row.status===2?'拒绝'
                          :scope.row.status===3?'通过审核'
                          :scope.row.status===4?'已打款'
                          :scope.row.status===5?'还款':'完结'}}
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="applyAmt" label="申请金额" align="center"></el-table-column>
                    <el-table-column prop="approveAmt" label="通过金额" align="center"></el-table-column>
                    <el-table-column label="审核结果" align="center" width="140">
                      <template slot-scope="scope">
                        <el-tag
                          :type="scope.row.approveResult ===1?''
                                :scope.row.approveResult===2?'danger'
                                :scope.row.approveResult===3?'success'
                                :scope.row.approveResult===4?'warning':'info'">
                          {{scope.row.approveResult ===1?'自动审核通过'
                          :scope.row.approveResult===2?'自动审核不通过'
                          :scope.row.approveResult===3?'人工审核通过'
                          :scope.row.approveResult===4?'人工审核不通过':'大数据风控中'}}
                        </el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column prop="approverName" label="审核经理" align="center"></el-table-column>

                    <el-table-column label="订单状态" align="center" width="140">
                      <template slot-scope="scope">
                        <span>
                          {{scope.row.applyStatus ===0?'初始'
                          :scope.row.applyStatus===1?'审核员审核中'
                          :scope.row.applyStatus===2?'审核经理审核中'
                          :scope.row.applyStatus===3?'审核订单重申中'
                          :scope.row.applyStatus===4?'高风险用户':'审核完成'}}
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="applyTime" label="申请时间" align="center" :formatter="dateFormat"
                                     width="150"></el-table-column>
                    <el-table-column prop="channel" label="渠道" align="center" width="100"></el-table-column>
                    <el-table-column label="操作" align="center" >
                      <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-info" @click="examine(scope.row)">查看</el-button>
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
            </el-tab-pane > 
            <el-tab-pane label="未通过" name="three"> 
                <el-row class="m20" >
                    <el-col   class="col-flex-end">
                            <!-- <el-button-group>
                              <el-button :type="execeedtimeType==0?'info':''" @click="changeExeceedtimeType(0)">重置</el-button>
                              <el-button :type="execeedtimeType==1?'primary':''" @click="changeExeceedtimeType(1)">M1</el-button>
                              <el-button :type="execeedtimeType==2?'success':''" @click="changeExeceedtimeType(2)">M2</el-button>
                              <el-button :type="execeedtimeType==3?'warning':''" @click="changeExeceedtimeType(3)">M3</el-button>
                              <el-button :type="execeedtimeType==4?'danger':''" @click="changeExeceedtimeType(4)">M3+</el-button>
                            </el-button-group>     -->
                            <el-button  type="primary" @click="reset">重置</el-button>
                            <!-- <el-select class="l20" v-model="search.withdrawStatu" placeholder="催收人员">
                              <el-option
                                v-for="item in withdrawStatus"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                              </el-option>
                            </el-select>                       -->
                            <div class="l20">
                                <el-input
                                style="padding:0px 10px 0px 0px"
                                  placeholder="请输入用户名"
                                  v-model="search.input"
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
                    v-loading="loading"
                    id="eleTable"
                  >
                <el-table-column prop="id" label="ID" align="center"></el-table-column>
                    <el-table-column prop="userName" label="姓名" align="center" width="80"></el-table-column>
                    <el-table-column label="审核人" align="center">
                      <template slot-scope="scope">
                        <div v-if="scope.row.operatorName === ''|| scope.row.operatorName === null">
                          <el-button type="info" size="mini" @click="allotOperator(scope.row)">分配</el-button>
                        </div>
                        <span v-else>
                          {{scope.row.operatorName}}
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column label="来源" align="center">
                      <template slot-scope="scope">
                        <span>
                          {{scope.row.source==='1'?'IOS':scope.row.source==='2'?'Android':'线上'}}
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="idNo" label="身份证号" align="center" width="150"></el-table-column>
                    <el-table-column prop="mobile" label="手机号" align="center" width="120"></el-table-column>
                    <!--<el-table-column prop="mobileDetails" label="手机详情" align="center"></el-table-column>-->
                    <el-table-column label="贷款状态" align="center">
                      <template slot-scope="scope">
                        <span>
                          {{scope.row.status===0?'重申中'
                          :scope.row.status===1?'审核中'
                          :scope.row.status===2?'拒绝'
                          :scope.row.status===3?'通过审核'
                          :scope.row.status===4?'已打款'
                          :scope.row.status===5?'还款':'完结'}}
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="applyAmt" label="申请金额" align="center"></el-table-column>
                    <el-table-column prop="approveAmt" label="通过金额" align="center"></el-table-column>
                    <el-table-column label="审核结果" align="center" width="140">
                      <template slot-scope="scope">
                        <el-tag
                          :type="scope.row.approveResult ===1?''
                                :scope.row.approveResult===2?'danger'
                                :scope.row.approveResult===3?'success'
                                :scope.row.approveResult===4?'warning':'info'">
                          {{scope.row.approveResult ===1?'自动审核通过'
                          :scope.row.approveResult===2?'自动审核不通过'
                          :scope.row.approveResult===3?'人工审核通过'
                          :scope.row.approveResult===4?'人工审核不通过':'大数据风控中'}}
                        </el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column prop="approverName" label="审核经理" align="center"></el-table-column>

                    <el-table-column label="订单状态" align="center" width="140">
                      <template slot-scope="scope">
                        <span>
                          {{scope.row.applyStatus ===0?'初始'
                          :scope.row.applyStatus===1?'审核员审核中'
                          :scope.row.applyStatus===2?'审核经理审核中'
                          :scope.row.applyStatus===3?'审核订单重申中'
                          :scope.row.applyStatus===4?'高风险用户':'审核完成'}}
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="applyTime" label="申请时间" align="center" :formatter="dateFormat"
                                     width="150"></el-table-column>
                    <el-table-column prop="channel" label="渠道" align="center" width="100"></el-table-column>
                    <el-table-column label="操作" align="center">
                      <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-info" @click="examine(scope.row)">查看</el-button>
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
            </el-tab-pane >                          
        </el-tabs >                                
    <!--客户信息表-->
    <template>
      <el-dialog
        title="客户信息详情"
        :visible.sync="outerVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :data="customerInformation"
        width="70%">
        <template>
          <div id="clientDetails">
            <el-row class="title-style">
              <el-col :span="24"><h3>注册信息</h3></el-col>
            </el-row>
            <el-row>
              <el-col :span="8"><label>注册地</label><span></span></el-col>
              <el-col :span="8"><label>注册IP</label><span>{{customerInformation.ip}}</span></el-col>
              <el-col :span="8"><label>来源</label><span>{{customerInformation.source==1?'ios':customerInformation.source==2?'android':'h5'}}</span></el-col>
            </el-row>
            <el-row class="title-style">
              <el-col :span="24">
                <el-col :span="20">
                  <h3>基本信息</h3>
                </el-col>
                <!--<el-col :span="4" align="right">
                  <el-button type="primary" size="mini" @click="modifyConsumerMessage">修改</el-button>
                </el-col>-->
              </el-col>
            </el-row>
            <template v-if="customerInformation.custUserDOList">
              <el-row>
                <el-col :xl="8" :lg="8">
                  <label>姓名</label>
                  <span>{{customerInformation.custUserDOList.realName}}</span>
                </el-col>
                <el-col :xl="8" :lg="8">
                  <label>手机号</label>
                  <span>{{customerInformation.custUserDOList.phoneNumber}}</span>
                </el-col>
                <el-col :xl="8" :lg="8">
                  <label>身份证号</label>
                  <span>{{customerInformation.custUserDOList.idcard}}</span>
                </el-col>
              </el-row>
              <el-row>
                <!--<el-col :xl="8" :lg="8">
                  <label>银行卡号</label>
                  <span>{{customerInformation.custUserDOList.bankcard}}</span>
                </el-col>-->
                <el-col :xl="8" :lg="8">
                  <label>状态</label>
                  <span>
                    {{customerInformation.custUserDOList.status===0?'停用'
                    :customerInformation.custUserDOList.status===1?'业务员维护中'
                    :customerInformation.custUserDOList.status===2?'审核分配中'
                    :customerInformation.custUserDOList.status===3?'审核中':'弃用'}}
                  </span>
                </el-col>
                <el-col :xl="8" :lg="8">
                  <label>是否黑名单</label>
                  <span>
                    {{customerInformation.custUserDOList.isDel === false?'否':'是'}}
                  </span>
                </el-col>
                <el-col :xl="8" :lg="8">
                  <label>详细地址</label>
                  <span>{{customerInformation.custUserDOList.detailAddress}}</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xl="8" :lg="8">
                  <label>教育背景</label>
                  <span>
                    {{customerInformation.custUserDOList.eduBack===1?'高中'
                    :customerInformation.custUserDOList.eduBack===2?'大专'
                    :customerInformation.custUserDOList.eduBack===3?'本科'
                    :customerInformation.custUserDOList.eduBack===4?'硕士':'博士'}}
                  </span>
                </el-col>
                <el-col :xl="8" :lg="8">
                  <label>婚姻状况</label>
                  <span>
                    {{customerInformation.custUserDOList.mariage===1?'未婚'
                    :customerInformation.custUserDOList.mariage===2?'已婚':'离婚'}}
                  </span>
                </el-col>
                <el-col :xl="8" :lg="8">
                  <label>创建时间</label>
                  <span>{{customerInformation.custUserDOList.createTime}}</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xl="8" :lg="8">
                  <label>QQ号</label>
                  <span>{{customerInformation.custUserDOList.qqNumber}}</span>
                </el-col>
                <el-col :xl="8" :lg="8">
                  <label>微信号</label>
                  <span>{{customerInformation.custUserDOList.wxNumber}}</span>
                </el-col>
                <el-col :xl="8" :lg="8">
                  <label>地址</label>
                  <span>{{customerInformation.custUserDOList.address}}</span>
                </el-col>
              </el-row>
              <!--<el-row>
                <el-col :xl="24" :lg="24">
                  <label>详细地址</label>
                  <span>{{customerInformation.custUserDOList.detailAddress}}</span>
                </el-col>
              </el-row>-->
            </template>
            <el-row class="title-style">
              <el-col :span="20">
                <h3>认证信息</h3>
              </el-col>
              <!--<el-col :span="4" align="right">
                <el-button type="primary" size="mini" @click="modifyAttestationInfo">修改</el-button>
              </el-col>-->
            </el-row>
            <el-row>
              <el-col :span="2"><label>联系人信息</label></el-col>
              <el-col :span="22">
                <template v-if="customerInformation.contactUserDOList">
                  <div class="contactInfo" v-for="(item,index) in customerInformation.contactUserDOList" :key="index">
                    <el-row>
                      <el-col :span="4">姓名:<span>{{item.real_name}}</span></el-col>
                      <el-col :span="4">关系:<span>{{item.relationship}}</span></el-col>
                      <el-col :span="6">电话:<span>{{item.mob_number}}</span></el-col>
                      <!-- <el-col :span="10">地址:<span>{{item.address}}</span></el-col> -->
                    </el-row>
                  </div>
                </template>
              </el-col>
            </el-row>
            <!--<el-row>
              <el-col :span="2"><label>授权验证</label></el-col>
              <el-col :span="22">

              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2"><label>通话记录</label></el-col>
              <el-col :span="22">
                <el-button type="primary">查看通话记录</el-button>
              </el-col>
            </el-row>-->
            <el-row>
              <el-col :span="2"><label>认证资料</label></el-col>
              <el-col :span="22">
                <template v-if="customerInformation.custIdcardImageList">
                  <div v-for="(imgInfo,index) in customerInformation.custIdcardImageList" :key="index">
                    <p class="imgInfo">
                      <!--<label>身份证正面照</label>-->
                      <span class="img">
                        <img :src="imgInfo.fullfaceUrl" width="100%" @click="clickImg($event,imgInfo.fullfaceUrl)">
                      </span>
                    </p>
                    <p class="imgInfo">
                      <!--<label>身份证反面照</label>-->
                      <span class="img">
                        <img :src="imgInfo.reverseStorageUrl" width="100%"
                             @click="clickImg($event,imgInfo.reverseStorageUrl)">
                      </span>
                    </p>
                    <p class="imgInfo">
                      <!--<label>手持身份证照</label>-->
                      <span class="img">
                        <img :src="imgInfo.handStorageUrl" width="100%"
                             @click="clickImg($event,imgInfo.handStorageUrl)">
                      </span>
                    </p>

                    <!-- 放大图片 -->
                    <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
                  </div>
                </template>
              </el-col>
            </el-row>
            <el-row class="title-style">
              <el-col :span="24">
                <el-col :span="12">
                  <h3>关联信息</h3>
                </el-col>
                <!--<el-col :span="12" align="right">
                  <el-button type="danger" size="mini">刷新额度</el-button>
                  <el-button type="info" size="mini">提额项认证</el-button>
                  <el-button type="primary" size="mini" @click="modifyRelevanceInfo">修改</el-button>
                </el-col>-->
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2"><label>钱包信息</label></el-col>
              <el-col :span="22">
                <template>
                  <div class="contactInfo">
                    <el-row>
                      <el-col :span="6">钱包信息:<span></span></el-col>
                      <el-col :span="6">注册时间:<span>{{walletInfo.joinDate | dateServer}}</span></el-col>
                      <el-col :span="6">上次登录时间:<span>{{walletInfo.loginDate | dateServer}}</span></el-col>
                      <el-col :span="6">注册地:<span></span></el-col>
                    </el-row>
                    <el-row style="display: flex;align-items: center">
                      <el-col :span="6">授信额度:<span>{{walletInfo.creditLine}}</span></el-col>
                      <el-col :span="6">审核金额:<span>{{walletInfo.auditMoney}}</span></el-col>
                      <el-col :span="5">签到次数:<span>{{walletInfo.counts}}</span></el-col>
                      <el-col :span="6">电子合同:
                        <el-button type="primary">点击查看</el-button>
                      </el-col>
                      <!--<el-col :span="4">钱包联系人:
                        <el-button type="primary">93</el-button>
                      </el-col>-->
                    </el-row>
                  </div>
                </template>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2"><label>银行卡信息</label></el-col>
              <el-col :span="22">
                <template v-if="customerInformation.bankCardDTOVoList">
                  <div class="contactInfo inlineBox" v-for="(bankInfo,index) in customerInformation.bankCardDTOVoList"
                       :key="index">
                    <el-row>
                      <el-col :span="8">用户名:<span>{{bankInfo.name}}</span></el-col>
                      <el-col :span="8">银行名称:<span>{{bankInfo.bankName}}</span></el-col>
                      <el-col :span="8">类型:<span>{{bankInfo.cardType===101?'借记卡':'信用卡'}}</span></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">银行卡号:<span>{{bankInfo.cardNum}}</span></el-col>
                      <el-col :span="12">身份证号:<span>{{bankInfo.idNum}}</span></el-col>
                    </el-row>
                  </div>
                </template>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2"><label>风控信息</label></el-col>
              <el-col :span="22">
                <template v-if="customerInformation.credit">
                  <div class="contactInfo">
                    <el-row>
                      <el-col :span="8">
                        <label style="margin-right: 5px">通讯录联系人</label>
                        <el-button type="primary" @click="checkContacts">数量: {{amount}}</el-button>
                      </el-col>
                      <el-col :span="8" style="display: flex;align-items: center">
                        <label style="margin-right: 5px">声音路径:</label>
                        <template
                          v-if="customerInformation.credit.voiceUrl != '' && customerInformation.credit.voiceUrl != null">
                          <audio controls>
                            <source src="http://p9u2l229b.bkt.clouddn.com/images/20180611185031052.mp3"
                                    type="audio/mpeg">
                          </audio>
                        </template>
                        <!--<span>
                          {{customerInformation.credit.voiceUrl?'有':'无'}}
                        </span>-->
                        <!--<audio :src="customerInformation.credit.voiceUrl"></audio>-->
                        <audio src="http://p9u2l229b.bkt.clouddn.com/images/20180611185031052.mp3"></audio>
                      </el-col>
                      <el-col :span="8" style="text-align: right">
                        <el-button type="info" @click="viewRiskManagementreport">查看风控报告</el-button>
                      </el-col>
                    </el-row>
                  </div>
                </template>
              </el-col>
            </el-row>
            <!-- <el-row>
              <el-col :span="2"><label>金额统计</label></el-col>
              <el-col :span="22">
                <template>
                  <div class="contactInfo">
                    <el-row>
                      <el-col :span="8">已分期金额:<span>0</span></el-col>
                      <el-col :span="8">已还款金额:<span>0</span></el-col>
                      <el-col :span="8">未还款金额:<span>0</span></el-col>
                    </el-row>
                  </div>
                </template>
              </el-col>
            </el-row> -->
            <!-- <el-row>
              <el-col :span="2"><label>订单信息</label></el-col>
              <el-col :span="22">
                <template v-if="customerInformation.loanOrderDOList">
                  <div class="contactInfo">
                    <el-row>
                      <el-col :span="8">客户姓名:<span>{{customerInformation.loanOrderDOList.username}}</span></el-col>
                      <el-col :span="8">订单状态:<span>{{customerInformation.loanOrderDOList.orderStatus}}</span></el-col>
                      <el-col :span="8">设备名称:<span>{{customerInformation.loanOrderDOList.deviceName}}</span></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">设备成色:<span>{{customerInformation.loanOrderDOList.deviceAlloy}}</span></el-col>
                      <el-col :span="8">设备串号:<span>{{customerInformation.loanOrderDOList.serialNumber}}</span></el-col>
                      <el-col :span="8">显示详情:<span>{{customerInformation.loanOrderDOList.displayDetail}}</span></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">手机外观:<span>{{customerInformation.loanOrderDOList.phoneFacade}}</span></el-col>
                      <el-col :span="8">屏幕详情:<span>{{customerInformation.loanOrderDOList.screenDetail}}</span></el-col>
                      <el-col :span="8">维修情况:<span>{{customerInformation.loanOrderDOList.maintainDetail}}</span>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">回收价格:<span>{{customerInformation.loanOrderDOList.recoveryPrice}}</span></el-col>
                      <el-col :span="8">出租天数:<span>{{customerInformation.loanOrderDOList.days}}</span></el-col>
                      <el-col :span="8">每天单价:<span>{{customerInformation.loanOrderDOList.unitPriceDay}}</span></el-col>
                    </el-row>
                  </div>
                </template>
              </el-col>
            </el-row> -->
            <!--<el-row>
              <el-col :span="2"><label>审核金额</label></el-col>
              <el-col :span="22">
                <el-input min="1" style="width: 100px" @blur="inpBlur" v-model="walletInfo.auditMoney"></el-input>
              </el-col>
            </el-row>-->
            <el-row>
              <el-col :span="2"><label>备注</label></el-col>
              <el-col :span="22">
                <el-input type="textarea" :rows="2" placeholder="请填写备注信息"
                          v-model="customerInformation.remark"></el-input>
              </el-col>
            </el-row>
            <!--<el-row class="title-style">
              <el-col :span="2"><label></label></el-col>
              <el-col :span="22">
                <el-radio-group v-model="radio">
                  <el-radio :label="1">通过</el-radio>
                  <el-radio :label="2">驳回</el-radio>
                  <el-radio :label="3">拒绝</el-radio>
                </el-radio-group>
              </el-col>
            </el-row>-->
          </div>
        </template>

        <!--提示对话框-->
        <!--<template>
          <el-dialog
            width="30%"
            title="提示"
            :visible.sync="AlertDialog"
            append-to-body>
            <div style="text-align: center;width: 100%">审核已结束，是否修改审核结果？</div>
            <div style="text-align: right;margin-top: 20px">
              <el-button @click="AlertDialog = false">否</el-button>
              <el-button type="primary" @click="yesSure">是</el-button>
            </div>
          </el-dialog>
        </template>-->

        <!--查看通讯录联系人-->
        <template>
          <el-dialog
            width="30%"
            title="通讯录"
            :visible.sync="contactList"
            append-to-body>

            <el-table :data="contacs" border height="400">
              <el-table-column prop="name" label="姓名" align="center"></el-table-column>
              <el-table-column prop="mobile" label="号码" align="center"></el-table-column>
            </el-table>

          </el-dialog>
        </template>

        <el-dialog
          id="report"
          width="70%"
          title="风控报告"
          :visible.sync="CreditReport"
          append-to-body>
          <el-tabs v-model="activeNam" @tab-click="handleClick">
            <el-tab-pane label="芝麻信用报告" name="first" v-if="false">芝麻信用报告</el-tab-pane>
            <el-tab-pane label="同盾信用报告" name="second">
              <el-row v-if="JSON.stringify(baseInfo) !== '{}'">
                <el-row class="flx">
                  <div class="fl">
                    贷前审核报告报告编号: <span>{{baseInfo.baseInfo.reportNum}}</span>
                  </div>
                  <div class="fr">
                    报告时间:<span>{{new Date() |dateServer}}</span>
                  </div>
                </el-row>
                <el-row>
                  <el-card>
                    <el-col :span="6" :offset="2">
                      <div>
                        <div class="progress-text">
                          <strong>{{baseInfo.baseInfo.score}}</strong>
                          <p>{{baseInfo.baseInfo.suggestion == 1?'建议拒绝':(baseInfo.baseInfo.suggestion ==
                            2?'建议人工审核':'建议通过')}}</p>
                        </div>
                        <el-progress type="circle"
                                     :percentage="baseInfo.baseInfo.score>100 ?99 : baseInfo.baseInfo.score" color="red"
                                     :show-text="showText">aaaaa
                        </el-progress>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <el-row style="text-align:center;padding-top:30px">
                        <strong style="font-size:20px">
                          {{baseInfo.baseInfo.suggestion == 1?'申请用户测出高危风险建议拒绝':(baseInfo.baseInfo.suggestion ==
                          2?'申请用户测出风险建议人工审核':'申请用户建议通过')}}
                        </strong>
                        <br/><span>
                            共发现15条异常信息
                           </span>
                      </el-row>
                    </el-col>
                  </el-card>
                </el-row>
                <el-row style="margin-top:20px" v-if="baseInfo.contactInfo.length>0">
                  <el-card>
                    <el-row>
                      <h3>个人基本信息</h3>
                    </el-row>
                    <el-row style="margin-top:20px">
                      <el-col :span="12">
                        <el-row>
                          <el-col :span="5">
                            姓名：
                          </el-col>
                          <el-col :span="6">
                            {{baseInfo.baseInfo.realName}}
                          </el-col>
                        </el-row>
                      </el-col>
                      <el-col :span="12">
                        <el-row>
                          <el-col :span="5">
                            身份证号：
                          </el-col>
                          <el-col :span="6">
                            {{baseInfo.baseInfo.idNum}}
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-row>
                          <el-col :span="5">
                            手机号码：
                          </el-col>
                          <el-col :span="6">
                            {{baseInfo.baseInfo.phoneNum}}
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                    <el-row style="margin-top:20px" v-if="baseInfo.contactInfo.length==2">
                      <el-col :span="8">
                        <el-row>
                          <h3>第一个联系人</h3>
                        </el-row>
                        <el-row style="margin-top:20px">
                          <el-col :span="8">
                            姓名：
                          </el-col>
                          <el-col :span="12">
                            {{baseInfo.contactInfo[0].contactName}}
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="8">
                            手机号码：
                          </el-col>
                          <el-col :span="12">
                            {{baseInfo.contactInfo[0].contactPhone}}
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="8">
                            社会关系：
                          </el-col>
                          <el-col :span="12">
                            {{baseInfo.contactInfo[0].relationShip==1?'直系':(baseInfo.contactInfo[0].relationShip==2?'非直系':'社会')}}
                          </el-col>
                        </el-row>
                      </el-col>
                      <el-col :span="8">
                        <el-row>
                          <h3>第二个联系人</h3>
                        </el-row>
                        <el-row style="margin-top:20px">
                          <el-col :span="8">
                            姓名：
                          </el-col>
                          <el-col :span="12">
                            {{baseInfo.contactInfo[1].contactName}}
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="8">
                            手机号码：
                          </el-col>
                          <el-col :span="12">
                            {{baseInfo.contactInfo[1].contactPhone}}
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="8">
                            社会关系：
                          </el-col>
                          <el-col :span="12">
                            {{baseInfo.contactInfo[1].relationShip==1?'直系':(baseInfo.contactInfo[1].relationShip==2?'非直系':'社会')}}
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </el-card>
                </el-row>
                <el-row style="margin-top:20px">
                  <el-card>
                    <el-row>
                      <h3>归属地解析</h3>
                    </el-row>
                    <el-row style="margin-top:20px">
                      <el-col :span="5">
                        身份证所属地地址:
                      </el-col>
                      <el-col :span="12">
                        {{baseInfo.baseInfo.idCardAddress}}
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5">
                        手机所属地地址:
                      </el-col>
                      <el-col :span="12">
                        {{baseInfo.baseInfo.phoneAddress}}
                      </el-col>
                    </el-row>
                  </el-card>
                </el-row>
                <el-row style="margin-top:20px">
                  <el-card>
                    <table class="check-table" style="border-collapse: collapse">
                      <thead style="text-align:center">
                      <tr>
                        <th style="width: 15%;">&nbsp;</th>
                        <th class="row1" style="width: 37%;">检查项目</th>
                        <th class="row2 " style="width: 9%;">风险等级</th>
                        <th class="row3" style="width: 37%;">备注</th>
                      </tr>
                      </thead>
                      <tbody style="text-align:center">
                      <template v-for="(temp,index) in baseInfo.actionInfo">
                        <tr :key="temp.riskName"
                            v-bind:class="{ borderBottom1: index != baseInfo.actionInfo.length-1,borderBottom2: index == baseInfo.actionInfo.length-1 }">

                          <td :rowspan="baseInfo.actionInfo.length" v-if="index==0">客户行为检测</td>
                          <td class="risk-item-name">{{temp.riskName}}</td>
                          <td class="risk-item-level">
                            {{temp.riskLevel==1?'低':(temp.riskLevel==2?'中':'高')}}
                          </td>
                          <td v-if="temp.reportDetail.length>0">
                            <span><a href="javascript:void(0)" style="color: #2ea5ff;text-decoration: blink;">频度规则详情</a></span>
                            <ul class="risk-detail-list">
                              <span
                                v-if="temp.reportDetail[0].detail != undefined">{{temp.reportDetail[0].detail}}</span>
                              <li>
                                <span>{{temp.reportDetail[0].data}}</span>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      </template>
                      <template v-for="(temp,index1) in baseInfo.platFormInfo">
                        <tr :key="temp.riskName"
                            v-bind:class="{ borderBottom1: index1 != baseInfo.platFormInfo.length-1,borderBottom2: index1 == baseInfo.platFormInfo.length-1 }">
                          <td :rowspan="baseInfo.platFormInfo.length" v-if="index1==0">多平台借贷申请检测</td>
                          <td class="risk-item-name">{{temp.riskName}}</td>
                          <td class="risk-item-level">
                            {{temp.riskLevel==1?'低':(temp.riskLevel==2?'中':'高')}}
                          </td>
                          <td>
                            <span>总数{{temp.dimenonReports.length}}</span><br/>
                            <span><a href="javascript:void(0)" style="color: #2ea5ff;text-decoration: blink;">频度规则详情</a></span>
                            <ul class="risk-detail-list">
                              <li v-for="(tem ) in temp.dimenonReports" :key="tem.id">
                                <span>{{tem.dimension}}</span>
                                <ul>
                                  <li v-for="(te) in tem.displayReportDOS" :key="te.displayName"
                                      style="margin-left:20px">
                                    {{te.dimension}}
                                    {{te.displayName}}&nbsp;&nbsp;{{te.count}}
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      </template>
                      <template v-for="(temp,index1) in baseInfo.badInfo">
                        <tr :key="temp.riskName"
                            v-bind:class="{ borderBottom1: index1 != baseInfo.platFormInfo.length-1,borderBottom2: index1 == baseInfo.platFormInfo.length-1 }">
                          <td :rowspan="baseInfo.platFormInfo.length" v-if="index1==0">不良信息扫描</td>
                          <td class="risk-item-name">{{temp.riskName}}</td>
                          <td class="risk-item-level">
                            {{temp.riskLevel==1?'低':(temp.riskLevel==2?'中':'高')}}
                          </td>
                          <td>
                            <span style="color:red">风险类型：{{temp.riskContent}}</span>
                          </td>
                        </tr>
                      </template>

                      </tbody>
                    </table>
                  </el-card>
                </el-row>

                <!-- <el-row class="flx" >
                    <div class="fl">
                        贷前审核报告报告编号: <span>{{baseInfo.baseInfo.reportNum}}</span>
                    </div>
                    <div class="fr">
                        报告时间:<span>{{new Date() |dateServer}}</span>
                    </div>
                </el-row>
                <el-row >
                    <el-card>
                        <el-col :span="6" :offset="2">
                            <div >
                                <div class="progress-text">
                                    <strong>{{baseInfo.baseInfo.score}}</strong>
                                    <p >{{baseInfo.baseInfo.suggestion == 1?'建议拒绝':(baseInfo.baseInfo.suggestion == 2?'建议人工审核':'建议通过')}}</p>
                                </div>
                                    <el-progress type="circle" :percentage="baseInfo.baseInfo.score" color="red" :show-text="showText">aaaaa</el-progress>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <el-row style="text-align:center;padding-top:30px">
                               <strong style="font-size:20px">
                                   {{baseInfo.baseInfo.suggestion == 1?'申请用户测出高危风险建议拒绝':(baseInfo.baseInfo.suggestion == 2?'申请用户测出风险建议人工审核':'申请用户建议通过')}}
                                  </strong>
                            <br/><span>
                                共发现15条异常信息
                               </span>
                            </el-row>
                        </el-col>
                    </el-card>
                </el-row>
                <el-row style="margin-top:20px" v-if="baseInfo.contactInfo.length>0">
                    <el-card>
                        <el-row>
                            <h3>个人基本信息</h3>
                        </el-row>
                        <el-row style="margin-top:20px">
                            <el-col :span="12">
                                <el-row>
                                    <el-col :span="5">
                                        姓名：
                                    </el-col>
                                    <el-col :span="6">
                                        {{baseInfo.baseInfo.realName}}
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="12">
                                <el-row>
                                    <el-col :span="5">
                                        身份证号：
                                    </el-col>
                                    <el-col :span="6">
                                         {{baseInfo.baseInfo.idNum}}
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-row>
                                    <el-col :span="5">
                                        手机号码：
                                    </el-col>
                                    <el-col :span="6">
                                       {{baseInfo.baseInfo.phoneNum}}
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row style="margin-top:20px" v-if="baseInfo.contactInfo.length==2">
                            <el-col :span="8">
                                <el-row>
                                    <h3>第一个联系人</h3>
                                </el-row>
                                <el-row style="margin-top:20px">
                                    <el-col :span="8">
                                        姓名：
                                    </el-col>
                                   <el-col :span="12">
                                        {{baseInfo.contactInfo[0].contactName}}
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8">
                                        手机号码：
                                    </el-col>
                                   <el-col :span="12">
                                        {{baseInfo.contactInfo[0].contactPhone}}
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8">
                                       社会关系：
                                    </el-col>
                                   <el-col :span="12">
                                       {{baseInfo.contactInfo[0].relationShip==1?'直系':(baseInfo.contactInfo[0].relationShip==2?'非直系':'社会')}}
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="8">
                                <el-row>
                                    <h3>第二个联系人</h3>
                                </el-row>
                                <el-row style="margin-top:20px">
                                    <el-col :span="8">
                                        姓名：
                                    </el-col>
                                   <el-col :span="12">
                                        {{baseInfo.contactInfo[1].contactName}}
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8">
                                        手机号码：
                                    </el-col>
                                   <el-col :span="12">
                                        {{baseInfo.contactInfo[1].contactPhone}}
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8">
                                       社会关系：
                                    </el-col>
                                   <el-col :span="12">
                                       {{baseInfo.contactInfo[1].relationShip==1?'直系':(baseInfo.contactInfo[1].relationShip==2?'非直系':'社会')}}
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-row>
                <el-row style="margin-top:20px">
                    <el-card>
                        <el-row>
                            <h3>归属地解析</h3>
                        </el-row>
                        <el-row style="margin-top:20px">
                            <el-col :span="5">
                                身份证所属地地址:
                            </el-col>
                            <el-col :span="12">
                                {{baseInfo.baseInfo.idCardAddress}}
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="5">
                                手机所属地地址:
                            </el-col>
                            <el-col :span="12">
                               {{baseInfo.baseInfo.phoneAddress}}
                            </el-col>
                        </el-row>
                    </el-card>
                </el-row>
                <el-row style="margin-top:20px">
                    <el-card>

                            <table class="check-table" style="border-collapse: collapse">
                                <thead>
                                <tr>
                                    <th style="width:100px">&nbsp;</th>
                                    <th class="row1">检查项目</th>
                                    <th class="row2">风险等级</th>
                                    <th class="row3">备注</th>
                                </tr>
                                </thead>
                                <tbody>
                                <template v-for="(temp,index) in baseInfo.actionInfo" >
                                    <tr :key="temp.riskName" v-bind:class="{ borderBottom1: index != baseInfo.actionInfo.length-1,borderBottom2: index == baseInfo.actionInfo.length-1 }">

                                        <td :rowspan="baseInfo.actionInfo.length" v-if="index==0">客户行为检测</td>
                                        <td class="risk-item-name">{{temp.riskName}}</td>
                                        <td class="risk-item-level">低</td>
                                        <td v-if="temp.reportDetail.length>0">
                                            <span><a href="javascript:void(0)" style="color: #2ea5ff;text-decoration: blink;">频度规则详情</a></span>
                                            <ul class="risk-detail-list" >
                                                <span v-if="temp.reportDetail[0].detail != undefined">{{temp.reportDetail[0].detail}}</span>
                                                <li>
                                                    <span>{{temp.reportDetail[0].data}}</span>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>
                                </template>
                                <template v-for="(temp,index1) in baseInfo.platFormInfo" >
                                    <tr :key="temp.riskName" v-bind:class="{ borderBottom1: index1 != baseInfo.platFormInfo.length-1,borderBottom2: index1 == baseInfo.platFormInfo.length-1 }">
                                        <td :rowspan="baseInfo.platFormInfo.length" v-if="index1==0">多平台借贷申请检测</td>
                                        <td class="risk-item-name">{{temp.riskName}}</td>
                                        <td class="risk-item-level">低</td>
                                        <td>
                                            <span>总数{{temp.dimenonReports.length}}</span><br/>
                                            <span><a href="javascript:void(0)" style="color: #2ea5ff;text-decoration: blink;">频度规则详情</a></span>
                                            <ul class="risk-detail-list">
                                                <li v-for="(tem ) in temp.dimenonReports" :key="tem.id">
                                                    <span>{{temp.dimension}}</span>
                                                    <ul>
                                                        <li v-for="(te) in tem.displayReportDOS" :key="te.displayName">
                                                            {{te.displayName}}&nbsp;&nbsp;{{te.count}}
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>
                                </template>
                                <template v-for="(temp,index1) in baseInfo.badInfo" >
                                    <tr :key="temp.riskName" v-bind:class="{ borderBottom1: index1 != baseInfo.platFormInfo.length-1,borderBottom2: index1 == baseInfo.platFormInfo.length-1 }">
                                        <td :rowspan="baseInfo.platFormInfo.length" v-if="index1==0">不良信息扫描</td>
                                        <td class="risk-item-name">{{temp.riskName}}</td>
                                        <td class="risk-item-level">低</td>
                                        <td>
                                            <span style="color:red">风险类型：{{temp.riskContent}}</span>
                                        </td>
                                    </tr>
                                </template>

                                 </tbody>
                            </table>
                    </el-card>
                </el-row>    -->
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="运行商信用报告" name="third">
              <el-row v-if="userBasicInformation">
                <el-main id="subOutputRank-print">
                  <el-row v-show="false">
                    <canvas id="myCanvas" width="200" height="230">
                    </canvas>
                  </el-row>
                  <el-row style="padding-top:0;position:relative;">
                    <el-row id="bg" style="width:100%;height:100%;position:absolute;top:0;left:0;zIndex:9999"
                            :style="note">
                      <div>

                      </div>
                    </el-row>
                    <el-row class="report_t">
                      <div class="el-main-info l">
                        <span>报告编号：201805241119371288237</span>
                      </div>
                      <div class="el-main-info r">
                        <span>报告生成时间：2018-05-24 11:19:37</span>
                      </div>

                    </el-row>
                    <el-row>
                      <h1 style="text-align:center">
                        互联网资信报告
                      </h1>
                    </el-row>
                    <el-card class="el-card">
                      <div class="clearfix">
                        <div class="panel_title">
                          <h2>用户基本信息</h2>
                          <div class="line"></div>
                        </div>
                      </div>
                      <table cellpadding="0" cellspacing="0" class="table">
                        <tbody>
                        <tr>
                          <td>
                            <span class="item">姓名</span>
                            <span>{{userBasicInformation.name}}</span>
                            <span>{{userBasicInformation.gender?'男':'女'}}</span>
                            <span>{{userBasicInformation.age}}</span>
                            <span>{{userBasicInformation.province}}</span>
                            <span>{{userBasicInformation.city}}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span class="item">身份证</span>
                            <span>{{userBasicInformation.idcard}}</span>
                            <el-tag :type="userBasicInformation.financialBlacklist?'danger':'success'">
                              {{userBasicInformation.financialBlacklist?'在金融机构黑名单':'不在金融机构黑名单'}}
                            </el-tag>
                            <el-tag :type="userBasicInformation.courtBlacklist?'danger':'success'">
                              {{userBasicInformation.courtBlacklist?'在法院黑名单':'不在法院黑名单'}}
                            </el-tag>
                            <!-- <span class="tip_y"></span> -->

                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span class="item">手机号</span>
                            <span>1231412412</span>
                            <span>{{userBasicInformation.cellLoc}}</span>
                            <span>注册时间：</span>
                            <span>{{userBasicInformation.regTime |  dateServer}}</span>
                            <!-- <span class="tip_y"></span> -->
                            <!-- <span class="remarks">用户姓名与运营商提供的姓名[张国军]匹配成功</span> -->
                            <!-- <span class="remarks"></span> -->
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </el-card>
                    <!-- 亲属联系人信息 -->
                    <el-card class="el-card" v-if="kinsfolkTableData.length>0">
                      <!--  -->
                      <div class="clearfix">
                        <div class="panel_title">
                          <h2>亲属联系人信息</h2>
                          <div class="line"></div>
                        </div>
                      </div>
                      <el-table :data="kinsfolkTableData">
                        <el-table-column prop="relationshipType" label="关系" width="140">
                          <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.relationshipType ==1?'直系':'非直系' }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="phonenume" label="手机号">
                        </el-table-column>
                        <el-table-column prop="callMessage" label="说明">
                        </el-table-column>
                      </el-table>
                    </el-card>
                    <!-- 用户信息检测 -->
                    <el-card class="el-card" v-if="userInfo.id">
                      <!-- v-if="userInfo.id" -->
                      <div class="clearfix">
                        <div class="panel_title">
                          <h2>用户信息检测</h2>
                          <div class="line"></div>
                        </div>
                      </div>
                      <table cellpadding="0" cellspacing="0" class="table">
                        <tbody>
                        <tr>
                          <th width="100" rowspan="9"> 用户信息查询</th>
                          <td width="220"> 查询过该用户的相关企业数量</td>
                          <td><span>{{userInfo.searchedOrgCnt}}</span></td>
                        </tr>
                        <tr>
                          <td> 查询过该用户的相关企业类型</td>
                          <td>
                            {{userInfo.searchedOrgType}}
                          </td>
                        </tr>
                        <tr>
                          <td> 身份证组合过的其他姓名</td>
                          <td>
                            {{userInfo.phoneWithOtherNames}}

                          </td>
                        </tr>
                        <tr>
                          <td> 身份证组合过其他电话</td>
                          <td>
                            {{userInfo.idcardWithOtherPhones}}
                          </td>
                        </tr>
                        <tr>
                          <td> 电话号码组合过其他姓名</td>
                          <td>
                            {{userInfo.idcardWithOtherNames}}
                          </td>
                        </tr>
                        <tr>
                          <td> 电话号码组合过其他身份证</td>
                          <td>
                            {{userInfo.phoneWithOtherIdcards}}
                          </td>
                        </tr>
                        <tr>
                          <td> 电话号码注册过的相关企业数量</td>
                          <td>
                            {{userInfo.registerOrgCnt}}
                          </td>
                        </tr>
                        <tr>
                          <td> 电话号码注册过的相关企业类型</td>
                          <td>
                            {{userInfo.registerOrgType}}
                          </td>
                        </tr>
                        <tr>
                          <td> 电话号码出现过的公开网站</td>
                          <td>
                            {{userInfo.arisedOpenWeb}}
                          </td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr>
                          <th width="100" rowspan="6">黑名单信息</th>
                          <td>黑中介分数</td>
                          <td>
                            <span>{{userInfo.phoneGrayScore}}</span>
                            （分数范围0-100，参考分为10，分数越低关系越紧密）
                          </td>
                        </tr>
                        <tr>
                          <td> 直接联系人中黑名单数</td>
                          <td>
                            <span>{{userInfo.contactsClass1BlacklistCnt}}</span>
                            (直接联系人：和被查询号码有通话记录)
                          </td>
                        </tr>
                        <tr>
                          <td> 间接联系人中黑名单人数</td>
                          <td>
                            <span>{{userInfo.contactsClass2BlacklistCnt}}</span>
                            (间接联系人：和被查询号码的直接联系人有通话记录)
                          </td>
                        </tr>
                        <tr>
                          <td> 直接联系人人数</td>
                          <td>
                            <span>{{userInfo.contactsClass1Cnt}}</span>
                            (直接联系人：和被查询号码有通话记录)
                          </td>
                        </tr>
                        <tr>
                          <td> 引起黑名单的直接联系人数量</td>
                          <td>
                            <span>{{userInfo.contactsRouterCnt}}</span>
                            (直接联系人有和黑名单用户的通讯记录的号码数量)
                          </td>
                        </tr>
                        <tr>
                          <td> 直接联系人中引起间接黑名单占比</td>
                          <td>
                            <span>{{userInfo.contactsRouterRatio}}</span>
                            (直接联系人有和黑名单用户的通讯记录的号码数量在直接联系人数量中的百分比)
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </el-card>
                    <!-- 用户行为检测 -->
                    <el-card class="el-card" v-if="testTableData.length>0">
                      <!-- v-if="testTableData.length>0" -->
                      <div class="clearfix">
                        <div class="panel_title">
                          <h2>用户行为检测</h2>
                          <div class="line"></div>
                        </div>
                      </div>
                      <el-table :data="testTableData">
                        <el-table-column prop="checkPointCn" label="检测项目">
                        </el-table-column>
                        <el-table-column prop="result" label="结果">
                        </el-table-column>
                        <el-table-column prop="evidence" label="依据">
                        </el-table-column>
                      </el-table>
                    </el-card>
                    <!-- 运营商消费数据               -->
                    <el-card class="el-card" v-if="operatorTableData.length>0">
                      <!--  -->
                      <div class="clearfix">
                        <div class="panel_title">
                          <h2>运营商消费数据</h2>
                          <div class="line"></div>
                        </div>
                      </div>
                      <el-table :data="operatorTableData">
                        <el-table-column prop="cellOperatorZh" label="运行商">
                        </el-table-column>
                        <el-table-column prop="cellPhoneNum" label="号码">
                        </el-table-column>
                        <el-table-column prop="cellLoc" label="归属地">
                        </el-table-column>
                        <el-table-column prop="cellMth" label="月份">
                        </el-table-column>
                        <el-table-column prop="callOutCnt" label="主叫次数">
                        </el-table-column>
                        <el-table-column prop="callOutTime" label="主叫时间">
                        </el-table-column>
                        <el-table-column prop="callInCnt" label="被叫次数">
                        </el-table-column>
                        <el-table-column prop="callInTime" label="被叫时间">
                        </el-table-column>
                        <el-table-column prop="netFlow" label="流量消费">
                        </el-table-column>
                        <el-table-column prop="totalAmount" label="话费消费">
                        </el-table-column>
                      </el-table>
                    </el-card>
                    <!-- 联系人区域汇总                  -->
                    <el-card class="el-card" v-if="linkmanTableData.length>0">
                      <!--  -->
                      <div class="clearfix">
                        <div class="panel_title">
                          <h2>联系人区域汇总 </h2>
                          <div class="line"></div>
                        </div>
                      </div>
                      <el-table :data="linkmanTableData">
                        <el-table-column prop="regionLoc" label="地区">
                        </el-table-column>
                        <el-table-column prop="regionUniqNumCnt" label="号码次数">
                        </el-table-column>
                        <el-table-column prop="regionCallInCnt" label="呼入次数">
                        </el-table-column>
                        <el-table-column prop="regionCallOutCnt" label="呼出次数">
                        </el-table-column>
                        <el-table-column prop="regionAvgCallInTime" label="呼入时间">
                        </el-table-column>
                        <el-table-column prop="regionAvgCallOutTime" label="呼出时间">
                        </el-table-column>
                        <el-table-column prop="regionCallInCntPct" label="呼入次数比">
                        </el-table-column>
                        <el-table-column prop="regionCallOutCntPct" label="呼出次数比">
                        </el-table-column>
                        <el-table-column prop="regionCallInTimePct" label="呼入时间比">
                        </el-table-column>
                        <el-table-column prop="regionCallOutTimePct" label="呼出时间比">
                        </el-table-column>
                      </el-table>
                    </el-card>
                    <!-- 运营商数据分析                   -->
                    <el-card class="el-card" v-if="operatorDataTableData.length>0">
                      <div class="clearfix">
                        <div class="panel_title">
                          <h2>运营商数据分析 </h2>
                          <div class="line"></div>
                        </div>
                      </div>
                      <el-table :data="operatorDataTableData">
                        <el-table-column prop="phoneNum" label="号码">
                        </el-table-column>
                        <el-table-column prop="phoneNumLoc" label="归属地">
                        </el-table-column>
                        <!-- <el-table-column prop="gist" label="通话次数">
                        </el-table-column>
                        <el-table-column prop="gist" label="通话时间(分)">
                        </el-table-column> -->
                        <el-table-column prop="callOutCnt" label="主叫次数">
                        </el-table-column>
                        <el-table-column prop="callInCnt" label="被叫次数">
                        </el-table-column>
                        <el-table-column prop="contactHoliday" label="节假日通话次数">
                        </el-table-column>
                        <el-table-column prop="contactWeekend" label="周末通话次数">
                        </el-table-column>
                        <el-table-column prop="contactWeekday" label="工作日通话次数">
                        </el-table-column>
                        <el-table-column prop="contact1w" label="一周内通话次数">
                        </el-table-column>
                        <el-table-column prop="contact1m" label="一月内通话次数">
                        </el-table-column>
                        <el-table-column prop="contact3m" label="三月内通话次数">
                        </el-table-column>
                        <el-table-column prop="contact3mPlus" label="三月外通话次数">
                        </el-table-column>
                      </el-table>
                    </el-card>
                    <!-- 联系人信息                  -->
                    <el-card class="el-card" v-if="contactTableData.length>0">
                      <div class="clearfix">
                        <div class="panel_title">
                          <h2>联系人信息 </h2>
                          <div class="line"></div>
                        </div>
                      </div>
                      <el-table :data="contactTableData">
                        <el-table-column prop="testItem" label="联系人">
                        </el-table-column>
                        <el-table-column prop="result" label="最早联系时间">
                        </el-table-column>
                        <el-table-column prop="gist" label="最晚联系时间">
                        </el-table-column>
                        <el-table-column prop="gist" label="联系电话">
                        </el-table-column>
                        <el-table-column prop="gist" label="号码归属地">
                        </el-table-column>
                        <el-table-column prop="gist" label="通话时长">
                        </el-table-column>
                      </el-table>
                    </el-card>
                    <!-- 电商地址信息                  -->
                    <el-card class="el-card" v-if="esAddTableData.length>0">
                      <div class="clearfix">
                        <div class="panel_title">
                          <h2>电商地址信息 </h2>
                          <div class="line"></div>
                        </div>
                      </div>
                      <el-table :data="esAddTableData">
                        <el-table-column prop="testItem" label="地址">
                        </el-table-column>
                        <el-table-column prop="result" label="	总消费金额">
                        </el-table-column>
                        <el-table-column prop="gist" label="收货人姓名">
                        </el-table-column>
                        <el-table-column prop="gist" label="收货人手机">
                        </el-table-column>
                      </el-table>
                    </el-card>
                    <!-- 电商数据分析                  -->
                    <el-card class="el-card" v-if="esDataTableData.length>0">
                      <div class="clearfix">
                        <div class="panel_title">
                          <h2>电商数据分析</h2>
                          <div class="line"></div>
                        </div>
                      </div>
                      <el-table :data="esDataTableData">
                        <el-table-column prop="testItem" label="月份">
                        </el-table-column>
                        <el-table-column prop="result" label="消费次数">
                        </el-table-column>
                        <el-table-column prop="gist" label="消费金额">
                        </el-table-column>
                        <el-table-column prop="gist" label="品类分析">
                        </el-table-column>
                      </el-table>
                    </el-card>
                    <!-- 出行数据分析                 -->
                    <el-card class="el-card" v-if="tripTableData.length>0">
                      <div class="clearfix">
                        <div class="panel_title">
                          <h2>出行数据分析</h2>
                          <div class="line"></div>
                        </div>
                      </div>
                      <el-table :data="tripTableData">
                        <el-table-column prop="testItem" label="时间段">
                        </el-table-column>
                        <el-table-column prop="result" label="出发时间">
                        </el-table-column>
                        <el-table-column prop="gist" label="回程时间">
                        </el-table-column>
                        <el-table-column prop="gist" label="出发地">
                        </el-table-column>
                        <el-table-column prop="gist" label="目的地">
                        </el-table-column>
                      </el-table>
                    </el-card>
                  </el-row>
                </el-main>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-dialog>
        <!--<div slot="footer" class="dialog-footer">
          <el-button @click="outerVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitCustomerInfo">提 交</el-button>
        </div>-->
      </el-dialog>
    </template>   
    <!--审核员对话框-->
    <!-- <template>
      <el-dialog title="分配客户" :visible.sync="dialogAssessor">
        <el-form :model="assessorForm">
          <el-form-item label="请选择审核员">
            <el-select v-model="assessorForm.assessor" placeholder="请选择审核员">
              <template v-for="item in assessorList">
                <el-option :label="item.username" :value="item.uid"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAssessor = false">取 消</el-button>
          <el-button type="primary" @click="submitAssessorForm">确 定</el-button>
        </div>
      </el-dialog>

    </template>                               -->
    </div>
</template>

<script>
import {
  httpLoanapply,
  httpGetOverList,
  httpGetNotApplyOrder,
  httpGetCustomterMesage
} from "../../../service/http";
import { config } from "../../../util/config";
import BigImg from "./BigImg.vue";
import { timeFormat } from "../../../config/time";
export default {
  data() {
    return {
      lodings: false,
      activeName: "first",
      activeNam: "first",
      url: httpLoanapply,
      title: "审核订单池",
      search: {
        input: "",
        time: ""
      },
      tableData: [],
      loading: true,
      npage: 1,
      pagesize: 10,
      total: 0,
      withdrawStatus: [
        { label: "放款中", value: 0 },
        { label: "放款成功", value: 1 },
        { label: "逾期", value: 2 },
        { label: "还款成功", value: 3 },
        { label: "放款失败 ", value: 4 },
        { label: "还款中", value: 5 },
        { label: "还款失败", value: 6 }
      ],
      multipleSelection: [], //全部选中嘛
      outerVisible: false, // 客户信息表
      dialogAssessor: false, // 审核员列表
      contactList: false, // 通讯录列表
      CreditReport: false, // 风控报告

      dateTime: [], // 选中时间
      startTime: "", // 开始时间
      endTime: "", // 结束时间

      username: "", // 用户名搜索
      radio: 1,
      listId: null,

      currentPage: 1,
      pageSize: 10,

      iscur: 0,
      showIndex: 1,
      showImg: false,
      imgSrc: "",
      labelWidth: "200px",

      auditStatus: "", // 审核状态
      selectList: [],
      contacs: [], // 通讯录列表
      assessorForm: {
        assessor: null
      },
      assessorId: null,
      customerInformation: {}, // 客户信息表数据

      //报告
      showText: false,
      userBasicInformation: {}, //用户基本信息检测用户基本信息检测
      userInfo: {},
      kinsfolkTableData: [], //亲属联系人
      testTableData: [],
      operatorTableData: [], //运营商消费数据
      linkmanTableData: [], //联系人区域汇总
      operatorDataTableData: [], //运行商数据分析
      contactTableData: [], //联系人信息
      esAddTableData: [], //电商信息
      esDataTableData: [], //电商数据统计
      tripTableData: [],
      canvasimg: "",
      canvasShow: true,
      note: {
        backgroundImage: ""
      },
      baseInfo: {},
      row: {},
      type: 0,
      //报告
      assessorList: [],
      allCustomersData: [], // 列表数据
      salesmanTable: [
        {
          userName: "aaaa",
          name: "bbb",
          email: "ccc@136.com",
          phone: "13695412651",
          endLogTime: "2018-06-08 14:26:35"
        }
      ],
      pneumaticTable: [
        {
          callRecords: "无",
          addressList: "50",
          location: "123",
          networkInfo: "yes",
          educationInfo: "no",
          hasVoice: "yes"
        }
      ],

      // 钱包信息
      walletInfo: {
        joinDate: "", //注册时间
        loginDate: "", //登陆时间
        creditLine: "", //授信额度
        auditMoney: "" //审核金额
      },
      tabs: [
        {
          name: "全部",
          url: "/sys/loanapply"
        },
        /*{
            name: "待分配",
            url: "/sys/allocatedList"
          },
          {
            name: "审核中",
            url: "/sys/UnderReviewList"
          },
          {
            name: "待通过",
            url: "/sys/ManagerReview"
          },
          {
            name: "待驳回",
            url: "/sys/RejectedList"
          },*/
        {
          name: "已通过",
          url: "/sys/getOverList"
        },
        /*{
            name: "高风险",
            url: "/sys/RefuseList"
          },*/
        {
          name: "未通过",
          url: "/sys/getNotApplyOrder"
        }
      ]
    };
  },
  components: {
    "big-img": BigImg
  },
  methods: {
    getData(
      npage,
      pagesize,
      userName,
      startDateString,
      finshDateString,
      channel
    ) {
      let _this = this;
      this.loading;
      this.url(
        npage,
        pagesize,
        userName,
        startDateString,
        finshDateString,
        channel
      )
        .then(res => {
          let data = res.data;
          console.log(data);
          _this.tableData = data.rows;

          _this.total = data.total;
          _this.loading = false;
        })
        .catch(err => {
          _this.tableData = [];
        });
    },
    handleSearch() {
      if (this.search.time && this.search.time.length) {
        this.getData(
          this.npage,
          this.pagesize,
          this.search.input,
          this.search.time[0] + " 00:00:00",
          timeFormat(this.search.time[1], 1) + " 00:00:00"
        );
      } else {
        this.getData(this.npage, this.pagesize, this.search.input, "", "");
      }
    },
    handleAllocation(index, row) {},
    handleCurrentChange(val) {
      this.npage = val;
      this.handleSearch();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.handleSearch();
    },
    reset() {
      (this.search = {
        input: "",
        time: ""
      }),
        this.handleSearch();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    filterStauts(value, row) {
      return row.status === value;
    },
    handleClic(tab, event) {
      tab.name === "second"
        ? (this.url = httpGetOverList)
        : tab.name === "three"
          ? (this.url = httpGetNotApplyOrder)
          : (this.url = httpLoanapply);
      this.lodings = true;
      this.getData(this.npage, this.pagesize);
      setTimeout(() => {
        this.lodings = false;
      }, 500);
    },
    // 查看客户信息
    examine(val) {
      this.auditStatus = val.approveResult;
      this.listId = Number(val.id);
      this.customerInformation = {};
      this.outerVisible = true;
      let param = {
        id: this.listId
      };
      httpGetCustomterMesage(this.listId)
        .then(res => {
          let data = res.data;
          this.customerInformation = data;
          this.walletInfo.joinDate = data.applyTime; // 注册时间
          this.walletInfo.loginDate = data.createTime; // 登陆时间
          this.walletInfo.creditLine = data.applyAmt; //  授信额度
          this.walletInfo.auditMoney = data.approveAmt; //  审核金额
          this.contacs = data.credit.custMobileList; // 通讯录信息
          this.amount = data.credit.contactsCount;
        })
        .catch(err => {
          this.$message.error(err);
        });
      // $.ajax({
      //   type: "POST",
      //   url: config.baseURL + "/sys/getCustomterMesage",
      //   data: param,
      //   success: data => {
      //     this.customerInformation = data;

      //     this.walletInfo.joinDate = data.applyTime; // 注册时间
      //     this.walletInfo.loginDate = data.createTime; // 登陆时间
      //     this.walletInfo.creditLine = data.applyAmt; //  授信额度
      //     this.walletInfo.auditMoney = data.approveAmt; //  审核金额

      //     this.contacs = data.credit.custMobileList; // 通讯录信息
      //     this.amount = data.credit.contactsCount;
      //   },
      //   error: err => {
      //     Message({
      //       message: err,
      //       center: true
      //     });
      //   }
      // });
    },
    // 表格时间转换
    dateFormat: function(row, column) {
      let date = row[column.property];
      // console.log(date);
      if (date == undefined) {
        return "";
      }
      let dateTime = new Date(date),
        y = dateTime.getFullYear(),
        m = dateTime.getMonth() + 1,
        d = dateTime.getDate(),
        h = dateTime.getHours(),
        i = dateTime.getMinutes(),
        s = dateTime.getSeconds();
      return (
        y +
        "/" +
        this.getzf(m) +
        "/" +
        this.getzf(d) +
        " " +
        this.getzf(h) +
        ":" +
        this.getzf(i) +
        ":" +
        this.getzf(s)
      );
    },
    handleClick() {},
    //补0操作
    getzf(num) {
      if (parseInt(num) < 10) {
        num = "0" + num;
      }
      return num;
    },
    // 查看通讯录列表
    checkContacts() {
      this.contactList = true;
    },
    // 查看风控报告
    viewRiskManagementreport() {
      let param = {
        id: this.listId
      };
      $.ajax({
        type: "POST",
        url: config.baseURL + "/sys/getCreditReport",
        data: param,
        success: data => {
          // console.log("风控报告数据：" + data);

          if (data.tdReport) {
            this.baseInfo = data.tdReport;
          }
          if (data.mifengreport) {
            let date = data.mifengreport;
            this.userBasicInformation = date.mifengreportApplicationCheck;
            // console.log(this.userBasicInformation);
            this.testTableData = date.list1;
            this.operatorTableData = date.list2;
            this.kinsfolkTableData = date.list6;

            this.linkmanTableData = date.list4;
            this.operatorDataTableData = date.list3;
            this.userInfo = date.mifengreportUserInfoCheck;
          }
          this.CreditReport = true;
        },
        error: err => {
          Message({
            message: err,
            center: true
          });
        }
      });
    },
    viewImg() {
      this.showImg = false;
    },
    clickImg(e, src) {
      this.showImg = true;
      // 获取当前图片地址
      this.imgSrc = src;
    }
  },
  mounted() {
    this.getData(this.npage, this.pagesize);
  }
};
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
<style scoped>
.cur {
  color: #fff;
  background-color: #20a0ff;
}

#clientDetails,
#consumerMessage,
#credentials,
#relevance {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  border-bottom: none;
  overflow-y: auto;
}

#clientDetails .el-row,
#consumerMessage .el-row,
#credentials .el-row,
#relevance .el-row {
  border-bottom: 1px solid #ccc;
  padding: 10px;
}

#clientDetails label,
#consumerMessage label,
#credentials label,
#relevance label {
  color: #000;
  width: 100px;
  display: inline-block;
}

.contactInfo {
  border: 1px solid #ccc;
  margin-bottom: 2px;
}

.title-style {
  background: #ebebeb;
}

.imgInfo {
  float: left;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
}

.imgInfo label {
  text-align: center;
}

.img {
  width: 80px;
  height: 80px;
  display: flex;
}

.el-radio + .el-radio {
  margin: 0;
}

.inlineBox {
  display: inline-block;
  width: 100%;
}

.title {
  padding: 10px;
  font-weight: bold;
  font-size: 18px;
}

.input-width {
  width: 215px;
}

.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}

.el-main-info {
  color: #999;
}

.l {
  float: left;
}

.r {
  float: right;
}

.report_t {
  overflow: hidden;
  color: #999;
}

.el-card {
  margin-top: 24px;
}

.panel_title {
  margin-bottom: 10px;
  border-radius: 10px;
  position: relative;
  height: 40px;
  text-align: center;
}

.panel_title h2 {
  height: 30px;
  line-height: 30px;
  display: inline-block;
  background: #e88f08;
  color: #fff;
  border-radius: 100px;
  padding: 0;
  margin: 0;
  font-size: 16px;
  position: absolute;
  z-index: 99;
  width: 200px;
  left: 50%;
  margin-left: -100px;
}

.line {
  background: #e88f08;
  height: 4px;
  top: 13px;
  position: absolute;
  width: 100%;
  border-radius: 10px;
}

.table {
  width: 100%;
  border-radius: 2px;
  border: 1px solid #f1f1f1;
  border-bottom: none;
}

/* .table tr:hover {
    background:#c0b184 ;
  } */
.table tr td {
  padding: 10px;
  border-bottom: 1px solid #f1f1f1;
}

.table tr th {
  padding: 10px;
  border-bottom: 1px solid #f1f1f1;
  font-size: 14px;
  text-align: left;
  background: #f7f7f9;
}

.table span {
  margin-right: 20px;
  display: inline-block;
}

span.item {
  width: 60px;
  font-weight: bold;
  text-align: right;
}

.tip_y {
  background: #5cb85c;
  padding: 2px 10px;
  border-radius: 50px;
  color: #fff;
  font-size: 12px;
}

span.remarks {
  display: block;
  padding-left: 85px;
  padding-top: 5px;
  color: #c0b184;
}

.tip {
  background: #ccbfae;
  padding: 2px 10px;
  border-radius: 50px;
  color: #fff;
  font-size: 12px;
}

.wrap {
  margin: 0 auto;
  padding: 20px;
  width: 640px;
  border: 1px solid #ccc;
}

.form .row {
  padding: 10px 0 0;
}

.btn {
  display: block;
  margin: 20px auto;
  padding: 8px 16px;
}

#report .title {
  padding: 10px;
  font-weight: bold;
  font-size: 18px;
  width: 100%;
}

#report .input-width {
  width: 215px;
}

#report .flx {
  width: 85%;
  top: 0px;
  padding-top: 10px;
  overflow: hidden;
  line-height: 30px;
}

#report .fl {
  float: left;

  font-size: 24px;
  font-weight: bold;
}

#report .fl span {
  font-size: 12px;
  font-weight: normal;
}

#report .fr {
  float: right;
  font-size: 12px;
}

#report .bar {
  position: relative;
  width: 50%;
  display: inline-block;
}

#report .progress-text {
  position: absolute;
  text-align: center;
  font-size: 32px;
  line-height: 126px;
  width: 126px;
  height: 126px;
}

#report .progress-text p {
  width: 100%;
  position: absolute;
  top: 80px;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
}

#report .table {
  border-spacing: 2px;
  border-color: grey;
  font-size: 13px;
  padding-left: 20px;
  width: 100%;
  display: table;
  border-collapse: collapse;
  border: none;
}

#report thead tr {
  border-bottom: 2px solid #eaeaea;
}

#report th {
  padding-left: 10px;
  height: 36px;
  text-align: left;
}

.row1,
.row2,
.row3 {
  width: 30%;
}

#report .borderBottom1 {
  border-bottom: 1px solid #eaeaea;
}

#report .borderBottom2 {
  border-bottom: 1px solid #eaeaea;
}

#report .risk-detail-list {
  margin-left: 40px;
}

ul,
li {
  list-style: none;
}

#report .check-table {
  width: 100%;
}
</style>
