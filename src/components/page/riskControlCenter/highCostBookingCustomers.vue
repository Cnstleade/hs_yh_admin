<template>
  <div class="container">
    <template>
      <el-row>
        <el-col :span="12">
          <el-button-group>
            <el-button>全部</el-button>
            <el-button>已驳回</el-button>
            <el-button>已通过</el-button>
            <el-button>已付款</el-button>
            <el-button>采购中</el-button>
          </el-button-group>
        </el-col>
        <el-col :span="12" style="text-align: right">
          <el-date-picker
            v-model="dateTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp">
          </el-date-picker>
          <el-input placeholder="请输入关键字" style="width: 200px"></el-input>
          <el-button icon="el-icon-search" type="primary" @cleck="searchTable"></el-button>
        </el-col>
      </el-row>
    </template>
    <template>
      <el-table class="m20" :data="tableData" border height="600">
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="client" label="客户" align="center"></el-table-column>
        <el-table-column label="审核员" align="center">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" plain @click="handleAssessor(scope.row)">{{scope.row.assessor}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="publisher" label="发布人" align="center"></el-table-column>
        <el-table-column prop="type" label="类型" align="center"></el-table-column>
        <el-table-column prop="commodity" label="商品" align="center"></el-table-column>
        <el-table-column prop="price" label="价格" align="center" width="150"></el-table-column>
        <el-table-column prop="downPayment" label="首付" align="center"></el-table-column>
        <el-table-column label="完整度" align="center" width="200">
          <template slot-scope="scope">
            <el-progress :text-inside="true" :stroke-width="15" :percentage="scope.row.integrity"></el-progress>
          </template>
        </el-table-column>
        <el-table-column prop="turnoverTime" label="更新时间" align="center" width="200"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.state===1?'warning':'success'">
              {{scope.row.state ===1?'结束':'未结束'}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-info" @click="examine">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template>
      <el-pagination
        style="margin-top: 10px;text-align: right;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </template>

    <!--审核员对话框-->
    <template>
      <el-dialog title="分配客户" :visible.sync="dialogAssessor">
        <el-form>
          <el-form-item label="请选择审核员">
            <el-select placeholder="请选择审核员">
              <el-option label="审核员A" value="1"></el-option>
              <el-option label="审核员B" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAssessor = false">取 消</el-button>
          <el-button type="primary" @click="dialogAssessor = false">确 定</el-button>
        </div>
      </el-dialog>

    </template>

    <!--客户信息表-->
    <template>
      <el-dialog
        title="客户信息详情"
        :visible.sync="outerVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        width="70%">
        <template>
          <div id="clientDetails">
            <el-row class="title-style">
              <el-col :span="24"><h3>注册信息</h3></el-col>
            </el-row>
            <el-row>
              <el-col :span="8"><label>注册地</label><span></span></el-col>
              <el-col :span="8"><label>注册IP</label><span></span></el-col>
              <el-col :span="8"><label>来源</label>
                <el-tag>网络</el-tag>
              </el-col>
            </el-row>
            <el-row class="title-style">
              <el-col :span="24">
                <el-col :span="20">
                  <h3>基本信息</h3>
                </el-col>
                <el-col :span="4" align="right">
                  <el-button type="primary" size="mini" @click="modifyConsumerMessage">修改</el-button>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xl="8" :lg="8"><label>姓名</label><span>嵇跃耀</span></el-col>
              <el-col :xl="8" :lg="8"><label>性别</label><span>男</span></el-col>
              <el-col :xl="8" :lg="8"><label>客户状态</label><span>审核中</span></el-col>
            </el-row>
            <el-row>
              <el-col :xl="8" :lg="8"><label>身份证号</label><span>320921199311042053</span></el-col>
              <el-col :xl="8" :lg="8"><label>手机号</label><span>18752032008</span></el-col>
              <el-col :xl="8" :lg="8"><label>备用号</label><span>020-846464846</span></el-col>
            </el-row>
            <el-row>
              <el-col :xl="8" :lg="8"><label>开户行</label><span>---</span></el-col>
              <el-col :xl="8" :lg="8"><label>银行卡号</label><span>6214832504146502</span></el-col>
              <el-col :xl="8" :lg="8"><label>出生日期</label><span>1993-11-04</span></el-col>
            </el-row>
            <el-row>
              <el-col :xl="8" :lg="8"><label>电子邮箱</label><span>未填写</span></el-col>
              <el-col :xl="8" :lg="8"><label>微信号</label><span>JYY224600</span></el-col>
              <el-col :xl="8" :lg="8"><label>QQ</label><span>738592521</span></el-col>
            </el-row>
            <el-row>
              <el-col :xl="8" :lg="8"><label>单位/院校</label><span>地高性能和</span></el-col>
              <el-col :xl="8" :lg="8"><label>部门/班级</label><span>大专</span></el-col>
              <el-col :xl="8" :lg="8"><label>工号/学号</label><span>未填写</span></el-col>
            </el-row>
            <el-row>
              <el-col :xl="8" :lg="8"><label>入职/入学时间</label><span>未填写</span></el-col>
              <el-col :xl="8" :lg="8"><label>职务</label><span>未填写</span></el-col>
              <el-col :xl="8" :lg="8"><label>单位/寝室地址</label><span>262栋105室</span></el-col>
            </el-row>
            <el-row>
              <el-col :xl="8" :lg="8"><label>籍贯</label><span>江苏</span></el-col>
              <el-col :xl="8" :lg="8"><label>月收入/生活费</label><span>10000<span>元</span></span></el-col>
              <el-col :xl="8" :lg="8"><label>其他收入</label><span>8000<span>元</span></span></el-col>
            </el-row>
            <el-row>
              <el-col :xl="8" :lg="8"><label>身份证到期时间</label><span>无</span></el-col>
              <el-col :xl="8" :lg="8"><label>钱包录音</label><span>无</span></el-col>
            </el-row>
            <el-row class="title-style">
              <el-col :span="20">
                <h3>认证信息</h3>
              </el-col>
              <el-col :span="4" align="right">
                <el-button type="primary" size="mini" @click="modifyAttestationInfo">修改</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2"><label>联系人信息</label></el-col>
              <el-col :span="22">
                <template>
                  <div class="contactInfo">
                    <el-row>
                      <el-col :span="8">姓名:<span>嵇培中</span></el-col>
                      <el-col :span="8">住址:<span>江苏省南京市中央路298号33室</span></el-col>
                      <el-col :span="8">电话:<span>15715115167</span></el-col>
                    </el-row>
                  </div>
                </template>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2"><label>授权验证</label></el-col>
              <el-col :span="22">

              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2"><label>通话记录</label></el-col>
              <el-col :span="22">
                <el-button type="primary">查看通话记录</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2"><label>认证资料</label></el-col>
              <el-col :span="22">

              </el-col>
            </el-row>
            <el-row class="title-style">
              <el-col :span="24">
                <el-col :span="12">
                  <h3>关联信息</h3>
                </el-col>
                <el-col :span="12" align="right">
                  <el-button type="danger" size="mini">刷新额度</el-button>
                  <el-button type="info" size="mini">提额项认证</el-button>
                  <el-button type="primary" size="mini" @click="modifyRelevanceInfo">修改</el-button>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2"><label>钱包信息</label></el-col>
              <el-col :span="22">
                <template>
                  <div class="contactInfo">
                    <el-row>
                      <el-col :span="6">钱包信息:<span></span></el-col>
                      <el-col :span="6">注册时间:<span>2018-03-08 09:47:06</span></el-col>
                      <el-col :span="6">上次登录时间:<span>	2018-04-08 16:10:02</span></el-col>
                      <el-col :span="6">注册地:<span></span></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5">授信额度:<span>0.00</span></el-col>
                      <el-col :span="5">分期额度:<span>0</span></el-col>
                      <el-col :span="5">签到额度:<span>10.00</span></el-col>
                      <el-col :span="5">电子合同:
                        <el-button type="primary">点击查看</el-button>
                      </el-col>
                      <el-col :span="4">钱包联系人:
                        <el-button type="primary">93</el-button>
                      </el-col>
                    </el-row>
                  </div>
                </template>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2"><label>风控信息</label></el-col>
              <el-col :span="22">
                <template>
                  <el-table :data="pneumaticTable" style="width: 100%;border: 1px solid #ccc">
                    <el-table-column prop="callRecords" label="是否有通话记录" align="center"></el-table-column>
                    <el-table-column prop="addressList" label="是否有通讯录" align="center"></el-table-column>
                    <el-table-column prop="location" label="客户位置" align="center"></el-table-column>
                    <el-table-column prop="networkInfo" label="是否有学信网信息" align="center"></el-table-column>
                    <el-table-column prop="educationInfo" label="是否有学历信息" align="center"></el-table-column>
                    <el-table-column prop="hasVoice" label="客户声音是否存在" align="center"></el-table-column>
                  </el-table>
                </template>
              </el-col>
            </el-row>
            <el-row>
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
            </el-row>
            <el-row>
              <el-col :span="2"><label>订单信息</label></el-col>
              <el-col :span="22">
                无订单信息
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2"><label>审核意见</label></el-col>
              <el-col :span="22">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入审核意见"
                  v-model="auditOpinion">
                </el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2"><label>备注</label></el-col>
              <el-col :span="22">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入备注内容"
                  v-model="remarks">
                </el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2"><label></label></el-col>
              <el-col :span="22">
                <el-select v-model="value" placeholder="请选择快速回复语句">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row class="title-style">
              <el-col :span="24" align="right">
                <el-button type="info" size="mini">搁置客户</el-button>
                <el-button type="primary" size="mini">弃用客户</el-button>
                <el-button type="danger" size="mini">删除客户</el-button>
                <el-button type="warning" size="mini">驳回客户</el-button>
              </el-col>
            </el-row>
          </div>
        </template>

        <!--内置弹出层-修改客户信息-->
        <template>
          <el-dialog
            width="50%"
            title="修改客户信息"
            :visible.sync="modifyConsumerInfo"
            append-to-body>
            <template>
              <div id="consumerMessage">
                <el-row>
                  <el-col :xl="12" :lg="12"><label>姓名</label><span>嵇跃耀</span></el-col>
                  <el-col :xl="12" :lg="12"><label>性别</label><span>男</span></el-col>
                </el-row>
                <el-row>
                  <el-col :xl="12" :lg="12"><label>身份证号</label><span>320921199311042053</span></el-col>
                  <el-col :xl="12" :lg="12"><label>手机号</label><span>18752032008</span></el-col>
                </el-row>
                <el-row>
                  <el-col :xl="12" :lg="12"><label>开户行</label><span>---</span></el-col>
                  <el-col :xl="12" :lg="12"><label>银行卡号</label><span>6214832504146502</span></el-col>
                </el-row>
                <el-row>
                  <el-col :xl="12" :lg="12"><label>电子邮箱</label><span>未填写</span></el-col>
                  <el-col :xl="12" :lg="12"><label>微信号</label><span>JYY224600</span></el-col>
                </el-row>
                <el-row>
                  <el-col :xl="12" :lg="12"><label>单位/院校</label><span>地高性能和</span></el-col>
                  <el-col :xl="12" :lg="12"><label>部门/班级</label><span>大专</span></el-col>
                </el-row>
                <el-row>
                  <el-col :xl="12" :lg="12"><label>入职/入学时间</label><span>未填写</span></el-col>
                  <el-col :xl="12" :lg="12"><label>职务</label><span>未填写</span></el-col>
                </el-row>
                <el-row>
                  <el-col :xl="12" :lg="12"><label>籍贯</label><span>江苏</span></el-col>
                  <el-col :xl="12" :lg="12"><label>月收入/生活费</label><span>10000<span>元</span></span></el-col>
                </el-row>
                <el-row>
                  <el-col :xl="12" :lg="12"><label>身份证到期时间</label><span>无</span></el-col>
                  <el-col :xl="12" :lg="12"><label>钱包录音</label><span>无</span></el-col>
                </el-row>
              </div>
            </template>
          </el-dialog>
        </template>
        <!--内置弹出层-修改客户认证信息-->
        <template>
          <el-dialog
            width="50%"
            title="修改客户认证信息"
            :visible.sync="modifyCredentials"
            append-to-body>
            <template>
              <div id="credentials">
                <el-row>
                  <el-col :xl="12" :lg="12"><label>姓名</label><span>嵇跃耀</span></el-col>
                  <el-col :xl="12" :lg="12"><label>性别</label><span>男</span></el-col>
                </el-row>
                <el-row>
                  <el-col :xl="12" :lg="12"><label>身份证号</label><span>320921199311042053</span></el-col>
                  <el-col :xl="12" :lg="12"><label>手机号</label><span>18752032008</span></el-col>
                </el-row>
                <el-row>
                  <el-col :xl="12" :lg="12"><label>开户行</label><span>---</span></el-col>
                  <el-col :xl="12" :lg="12"><label>银行卡号</label><span>6214832504146502</span></el-col>
                </el-row>
                <el-row>
                  <el-col :xl="12" :lg="12"><label>电子邮箱</label><span>未填写</span></el-col>
                  <el-col :xl="12" :lg="12"><label>微信号</label><span>JYY224600</span></el-col>
                </el-row>
                <el-row>
                  <el-col :xl="12" :lg="12"><label>单位/院校</label><span>地高性能和</span></el-col>
                  <el-col :xl="12" :lg="12"><label>部门/班级</label><span>大专</span></el-col>
                </el-row>
                <el-row>
                  <el-col :xl="12" :lg="12"><label>入职/入学时间</label><span>未填写</span></el-col>
                  <el-col :xl="12" :lg="12"><label>职务</label><span>未填写</span></el-col>
                </el-row>
                <el-row>
                  <el-col :xl="12" :lg="12"><label>籍贯</label><span>江苏</span></el-col>
                  <el-col :xl="12" :lg="12"><label>月收入/生活费</label><span>10000<span>元</span></span></el-col>
                </el-row>
                <el-row>
                  <el-col :xl="12" :lg="12"><label>身份证到期时间</label><span>无</span></el-col>
                  <el-col :xl="12" :lg="12"><label>钱包录音</label><span>无</span></el-col>
                </el-row>
              </div>
            </template>
          </el-dialog>
        </template>
        <!--内置弹出层-修改客户关联信息-->
        <template>
          <el-dialog
            width="50%"
            title="修改客户关联信息"
            :visible.sync="modifyAlevanceInfo"
            append-to-body>
            <template>
              <div id="relevance">
                <el-row>
                  <el-col :xl="12" :lg="12"><label>姓名</label><span>嵇跃耀</span></el-col>
                  <el-col :xl="12" :lg="12"><label>性别</label><span>男</span></el-col>
                </el-row>
                <el-row>
                  <el-col :xl="12" :lg="12"><label>身份证号</label><span>320921199311042053</span></el-col>
                  <el-col :xl="12" :lg="12"><label>手机号</label><span>18752032008</span></el-col>
                </el-row>
                <el-row>
                  <el-col :xl="12" :lg="12"><label>开户行</label><span>---</span></el-col>
                  <el-col :xl="12" :lg="12"><label>银行卡号</label><span>6214832504146502</span></el-col>
                </el-row>
                <el-row>
                  <el-col :xl="12" :lg="12"><label>电子邮箱</label><span>未填写</span></el-col>
                  <el-col :xl="12" :lg="12"><label>微信号</label><span>JYY224600</span></el-col>
                </el-row>
                <el-row>
                  <el-col :xl="12" :lg="12"><label>单位/院校</label><span>地高性能和</span></el-col>
                  <el-col :xl="12" :lg="12"><label>部门/班级</label><span>大专</span></el-col>
                </el-row>
                <el-row>
                  <el-col :xl="12" :lg="12"><label>入职/入学时间</label><span>未填写</span></el-col>
                  <el-col :xl="12" :lg="12"><label>职务</label><span>未填写</span></el-col>
                </el-row>
                <el-row>
                  <el-col :xl="12" :lg="12"><label>籍贯</label><span>江苏</span></el-col>
                  <el-col :xl="12" :lg="12"><label>月收入/生活费</label><span>10000<span>元</span></span></el-col>
                </el-row>
                <el-row>
                  <el-col :xl="12" :lg="12"><label>身份证到期时间</label><span>无</span></el-col>
                  <el-col :xl="12" :lg="12"><label>钱包录音</label><span>无</span></el-col>
                </el-row>
              </div>
            </template>
          </el-dialog>
        </template>
        <div slot="footer" class="dialog-footer">
          <el-button @click="outerVisible = false">取 消</el-button>
          <el-button type="primary" @click="outerVisible = false">提 交</el-button>
        </div>
      </el-dialog>
    </template>
  </div>
</template>

<script>
  import {timeFormat} from '../../../config/time';

  export default {
    name: "highCostBookingCustomers",
    data() {
      return {
        dialogAssessor: false,
        outerVisible: false,
        modifyConsumerInfo: false,
        modifyCredentials: false,
        modifyAlevanceInfo: false,
        auditOpinion: '',
        remarks: '',
        currentPage: 1,
        pageSize: 10,
        total: null,
        labelWidth: '200px',
        dateTime: [],
        tableData: [
          {
            id: 451885,
            client: '李仙仙',
            assessor: 'admin',
            salesman: '张三',
            publisher: '发布人',
            type: '',
            commodity: '钱包取现500元',
            price: '500.00',
            downPayment: '200.00',
            integrity: '80',
            turnoverTime: '2018-06-09',
            source: '网络',
            gender: '男',
            IDNumber: '341125199208197778',
            telephone: '15178445235',
            organization: '南京火影云数据服务有限公司',
            state: 1,
            eContracting: 1,
            ApplicationDate: '2018-06-08'
          },
          {
            id: 451885,
            client: '李仙仙',
            assessor: 'admin',
            salesman: '张三',
            publisher: '发布人',
            type: '',
            commodity: '钱包取现500元',
            price: '500.00',
            downPayment: '200.00',
            integrity: '80',
            turnoverTime: '2018-06-09',
            source: '网络',
            gender: '男',
            IDNumber: '341125199208197778',
            telephone: '15178445235',
            organization: '南京火影云数据服务有限公司',
            state: 1,
            eContracting: 1,
            ApplicationDate: '2018-06-08'
          },
          {
            id: 451885,
            client: '李仙仙',
            assessor: 'admin',
            salesman: '张三',
            publisher: '发布人',
            type: '',
            commodity: '钱包取现500元',
            price: '500.00',
            downPayment: '200.00',
            integrity: '80',
            turnoverTime: '2018-06-09',
            source: '网络',
            gender: '男',
            IDNumber: '341125199208197778',
            telephone: '15178445235',
            organization: '南京火影云数据服务有限公司',
            state: 1,
            eContracting: 1,
            ApplicationDate: '2018-06-08'
          }
        ],
        salesmanTable: [
          {
            userName: 'aaaa',
            name: 'bbb',
            email: 'ccc@136.com',
            phone: '13695412651',
            endLogTime: '2018-06-08 14:26:35'
          }
        ],
        pneumaticTable: [
          {
            callRecords: '无',
            addressList: '50',
            location: '123',
            networkInfo: 'yes',
            educationInfo: 'no',
            hasVoice: 'yes'
          }
        ],
        options: [
          {
            value: '1',
            label: '资料属实，允许通过'
          }, {
            value: '2',
            label: '信用评分不足，不通过'
          }, {
            value: '3',
            label: '审核有误，驳回'
          }
        ],
        value: ''
      }
    },
    methods: {

      //转成2017-01-01
      getMyDate(str) {
        var oDate = new Date(str),
          oYear = oDate.getFullYear(),
          oMonth = oDate.getMonth() + 1,
          oDay = oDate.getDate(),
          oHour = oDate.getHours(),
          oMin = oDate.getMinutes(),
          oSen = oDate.getSeconds(),
          oTime = oYear + "-" + this.getzf(oMonth) + "-" + this.getzf(oDay); //最后拼接时间
        return oTime;
      },
      //补0操作
      getzf(num) {
        if (parseInt(num) < 10) {
          num = "0" + num;
        }
        return num;
      },

      //默认日期显示一周
      setDefaultDate() {
        let newDate = new Date();
        let year = newDate.getFullYear(),
          month = newDate.getMonth() + 1,
          day = newDate.getDate(),
          defualtDate = year + "-" + this.getzf(month) + "-" + this.getzf(day),
          defualtEndDate = timeFormat(defualtDate, -6);
        this.dateTime.push(new Date(defualtEndDate).getTime(), new Date(defualtDate).getTime());
      },

      //点击审核员
      handleAssessor(data) {
        this.dialogAssessor = true;
      },
      //点击业务员
      handleSalesman(data) {
        this.dialogSalesman = true;
      },
      //查看
      examine() {
        this.outerVisible = true;
      },

      //修改客户信息
      modifyConsumerMessage(){
        this.modifyConsumerInfo = true;
      },

      //修改认证信息
      modifyAttestationInfo(){
        this.modifyCredentials = true;
      },

      //修改客户关联信息
      modifyRelevanceInfo(){
        this.modifyAlevanceInfo = true;
      },

    },
    mounted() {
      this.setDefaultDate();

    }
  }
</script>

<style scoped>
  #clientDetails,#consumerMessage,#credentials,#relevance {
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    border-bottom: none;
    overflow-y: auto;
  }

  #clientDetails .el-row,#consumerMessage .el-row,#credentials .el-row,#relevance .el-row{
    border-bottom: 1px solid #ccc;
    padding: 10px;
  }

  #clientDetails label,#consumerMessage label,#credentials label,#relevance label{
    color: #000;
    width: 120px;
    display: inline-block;
  }

  .contactInfo {
    border: 1px solid #ccc;
  }

  .title-style {
    background: #EBEBEB;
  }
</style>
