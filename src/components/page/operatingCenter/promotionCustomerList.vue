<template>
    <div class="container"  v-loading="sloading">
        <el-row>
            <el-alert
              title="推广客户列表"
              :closable="false"
              
              type="info">
            </el-alert>           
        </el-row>        
        <el-row class="m20">
            <el-col :span="10" :offset="14" class="col-flex-end">
                <div class="l20">
                    <el-input
                    style="padding:0px 10px 0px 0px"
                      placeholder="请输入关键词"
                      v-model="keywords"
                      clearable>
                    </el-input> 
                </div>  
                <el-button @click="handleSearch" class="l20" style="margin-left:10px" icon="el-icon-search"  type="success" circle></el-button>   
            </el-col>
        </el-row>
        <el-row class="m20">
            <el-table
                    :data="tableData"
                    border
                    v-loading="loading"
                    style="width: 100%">
                <el-table-column prop="id"  align="center" label="ID"  width="80" sortable></el-table-column>
                <el-table-column prop="username"  align="center" label="姓名" width="130"></el-table-column>
                <el-table-column prop="source"  align="center" label="来源" width="100"></el-table-column>
                <el-table-column prop="idCard" align="center"  label="身份证号" width="170"></el-table-column>
                <el-table-column prop="mobile" align="center"  label="手机号" width="110" ></el-table-column>
                <el-table-column prop="wx"  align="center" label="微信" ></el-table-column>
                <el-table-column prop="qq"  align="center" label="qq" ></el-table-column>
                <el-table-column prop="createTime" align="center" label="创建时间" sortable width="160"></el-table-column>
                <el-table-column prop="promoter" align="center" label="催收员" width="130"></el-table-column>
                <el-table-column prop="status" align="center" label="客户状态" width="130"></el-table-column>
                <el-table-column prop="cz"  align="center" label="操作" width="130">
                    <template slot-scope="scope">
                        <el-button   type="success"  @click="handleShow(scope.row)" size="mini">详情</el-button>                                      
                    </template>                                  
                </el-table-column>
            </el-table>             
        </el-row>
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
            :visible.sync="checkVisible"
              width="95%"
              title="客户信息表"
              center
         >

            <el-row style="overflow: hidden;">
                <table class="table" >
                    <tr>
                        <th valign="middle" colspan="6" class="bgcolor">
                            客户基本信息
                        </th>
                    </tr>
                    <tr class="title_6" >
                        <td colspan="6">
                            <el-table
                                    :data="userData"
                                    border
                                    style="width: 100%"
                            >
                                <el-table-column prop="id" label="ID" align="center" width="100"></el-table-column>                            
                                <el-table-column prop="username" label="姓名" align="center" width="160"></el-table-column>
                                <el-table-column prop="status" label="客户状态" align="center" width="160"></el-table-column>
                                <el-table-column prop="idCard" label="身份证号" align="center" width="200"></el-table-column>
                                <el-table-column prop="mobile" label="手机号" align="center" width="160"></el-table-column>
                                <el-table-column prop="qq" label="qq" align="center" ></el-table-column>
                                <el-table-column prop="wx" label="微信号" align="center" ></el-table-column>
                                <el-table-column prop="createTime" label="注册时间" align="center" width="190"></el-table-column>
                                <!-- <el-table-column prop="gzdw" label="工作单位" align="center" width="300"></el-table-column>
                                <el-table-column prop="xszh" label="学生证号" align="center" ></el-table-column> -->
                                <el-table-column prop="source" label="来源" align="center" width="130"></el-table-column>
                            </el-table>
                        </td>
                    </tr>
                    <!-- <tr>
                        <th  class="bgcolor "  >认证信息</th>
                        <td colspan="5" id="tb1">
                            <el-table
                                    :data="rzData"
                                    border
                                    style="width: 100%">
                                <el-table-column prop="xm"   width="100"></el-table-column>
                                <el-table-column prop="zz" ></el-table-column>
                                <el-table-column prop="dh"   ></el-table-column>
                            </el-table>
                        </td>
                    </tr> -->
                    <tr>
                        <th  class="bgcolor">联系人信息</th>
                        <td colspan="5" >
                            <el-table
                                    :data="relationShips"
                                    border
                                    style="width: 100%">
                                <el-table-column prop="relationship"  label="与客户关系"  align="center" width="160" ></el-table-column>
                                <el-table-column prop="userName"  label="联系人姓名"  align="center" width="160" ></el-table-column>
                                <el-table-column prop="phoneNumber"  label="联系人手机号码"  align="center"  width="160"></el-table-column>
                                <el-table-column prop="detailAddress"  label="详细地址"  align="center"  ></el-table-column>
                            </el-table>
                        </td>
                    </tr>
                    <!-- <tr>
                        <th  class="bgcolor">授权验证</th>
                        <td colspan="5" >
                            <el-table
                                    :data="sqData"
                                    border
                                    style="width: 100%">
                                <el-table-column prop="xxw"   label="学信网密码"   ></el-table-column>
                                <el-table-column prop="sjfw"  label="手机服务密码"></el-table-column>
                                <el-table-column prop="tbzh"  label="淘宝帐号" ></el-table-column>
                                <el-table-column prop="tbmm"  label="淘宝密码" ></el-table-column>
                                <el-table-column prop="jdzh"  label="京东帐号" ></el-table-column>
                                <el-table-column prop="jdmm"  label="京东密码" ></el-table-column>
                            </el-table>
                        </td>
                    </tr> -->
                    <tr>
                        <th  class="bgcolor">认证资料</th>
                        <td colspan="5" >
                            <el-row >
                                <el-col :span="3"   v-for="(o, index) in idCardImgs" :key="o.label" :offset="index > 0 ? 1 : 0">
                                    <template>
                                        <el-card :body-style="{ padding: '0px' }" shadow="hover">
                                            <img @click="handleImgShow(index)" :src="o.src" class="image">
                                            <div style="padding: 14px;text-align:center">
                                                <span>{{o.label}}</span>
                                            </div>
                                        </el-card>
                                    </template>
                                </el-col>
                            </el-row>
                        </td>
                    </tr>
                    <!-- <tr>
                        <th valign="middle" colspan="6" style="color: #436EEE;background-color: #f3f3f3;">
                            关联信息
                        </th>
                    </tr>
                    <tr>
                        <th  class="bgcolor">钱包信息</th>
                        <td colspan="5" >
                            <el-table
                                    :data="qbData"
                                    border
                                    style="width: 100%">
                                <el-table-column prop="qbzt"   label="钱包状态"   ></el-table-column>
                                <el-table-column prop="zcsj"  label="注册时间"></el-table-column>
                                <el-table-column prop="scdl"  label="上次登录时间" ></el-table-column>
                                <el-table-column prop="zcd"  label="注册地" ></el-table-column>
                                <el-table-column prop="sqed"  label="当前授信额度" ></el-table-column>
                                <el-table-column prop="sxfqed"  label="当前授信分期额度" ></el-table-column>
                                <el-table-column prop="dzht"  label="电子合同" ></el-table-column>
                            </el-table>
                        </td>
                    </tr> -->
                    <tr>
                        <th  class="bgcolor">分期账单信息</th>
                        <td colspan="5" >
                            <el-table
                                    :data="fqzdData"
                                    border
                                    style="width: 100%">
                                <el-table-column prop="id"   label="贷款ID"  width="90" align="center" sortable></el-table-column>
                                <el-table-column prop="contractNo"  label="贷款合同" width="200" align="center"></el-table-column>
                                <el-table-column prop="applyDate"  label="贷款日期" align="center" width="140" sortable>
                                    <template slot-scope="scope">
                                        {{scope.row.applyDate|dateServer}}
                                    </template>   
                                </el-table-column>
                                <el-table-column prop="applyAmt"  label="贷款金额" align="center" sortable width="93"></el-table-column>
                                <el-table-column prop="approveTime"  label="审核通过时间" align="center" width="140" sortable></el-table-column>
                                <el-table-column prop="purpose"  label="贷款用途" align="center"></el-table-column>
                                <el-table-column prop="approveAmt"  label="审核通过金额" align="center" width="120" sortable></el-table-column>
                                <el-table-column prop="approveTerm"  label="审核通过天数" align="center" width="120" sortable> </el-table-column>
                                <el-table-column prop="loanOrderId"  label="订单ID" align="center" sortable width="100"></el-table-column>
                                <el-table-column prop="updateTime"  label="最后一次更新时间" align="center" width="150" sortable></el-table-column>
                                <el-table-column prop="repayMethod"  label="还款方式" align="center"></el-table-column>
                                <el-table-column prop="operatorName"  label="初审人姓名" align="center" width="90"></el-table-column>
                                <el-table-column prop="approverName"  label="终审人姓名" align="center" width="90"></el-table-column>
                                <el-table-column prop="backDate"  label="还款日期" align="center" width="140" sortable></el-table-column>
                                <el-table-column prop="mustBackDate"  label="应还款日期" align="center" width="140" sortable></el-table-column>
                            </el-table>
                        </td>
                    </tr>
                    <tr>
                        <th  class="bgcolor">还款记录</th>
                        <td colspan="5" >
                            <el-table
                                    :data="hkjlData"
                                    border
                                    style="width: 100%">
                                <el-table-column prop="id"   label="还款ID"  align="center" width="90" sortable></el-table-column>
                                <el-table-column prop="loanApplyId" align="center" label="订单ID" width="90" sortable></el-table-column>
                                <el-table-column prop="type" align="center" label="还款类型" width="90"></el-table-column>
                                <el-table-column prop="recordUrl" align="center" label="还款明细证据(线下还款）"  width="120"></el-table-column>
                                <el-table-column prop="daysOverdue" align="center" label="逾期天数" width="90"></el-table-column>
                                <el-table-column prop="interestOverdue" align="center" label="逾期利息" width="90"></el-table-column>
                                <el-table-column prop="discountAmt" align="center" label="打折金额" width="90"></el-table-column>
                                <el-table-column prop="mustPayBackAmt" align="center" label="应还款" width="90"></el-table-column>
                                <el-table-column prop="actualPayBackAmt" align="center" label="实际还款" width="90"></el-table-column>
                                <el-table-column prop="backDate" align="center" label="还款日期" width="140"></el-table-column>
                                <el-table-column prop="replayAmt" align="center" label="贷款金额" sortable></el-table-column>
                                <el-table-column prop="remarks" align="center" label="备注" ></el-table-column>
                                <el-table-column prop="createTime" align="center" label="创建日期" width="140" sortable></el-table-column>
                                <el-table-column prop="createBy" align="center" label="创建人" width="90"></el-table-column>
                            </el-table>
                        </td>
                    </tr>
                    <!-- <tr>
                        <th  class="bgcolor">滞纳金记录</th>
                        <td colspan="5" >
                            <el-table
                                    :data="zljData"
                                    border
                                    style="width: 100%">
                                <el-table-column prop="xh"   label="序号"  width="50" ></el-table-column>
                                <el-table-column prop="fqsp"  label="分期商品" ></el-table-column>
                                <el-table-column prop="spje"  label="商品金额" ></el-table-column>
                                <el-table-column prop="sf"  label="首付" ></el-table-column>
                                <el-table-column prop="yg"  label="月供" ></el-table-column>
                                <el-table-column prop="fqs"  label="分期数" ></el-table-column>
                                <el-table-column prop="zt"  label="状态" ></el-table-column>
                                <el-table-column prop="wyqs"  label="违约期数" ></el-table-column>
                                <el-table-column prop="wyje"  label="违约金额" ></el-table-column>
                                <el-table-column prop="jmbl"  label="减免比例" ></el-table-column>
                                <el-table-column prop="sqr"  label="申请人" ></el-table-column>
                                <el-table-column prop="tjsj"  label="添加时间" ></el-table-column>
                            </el-table>
                        </td>
                    </tr> -->
                    <tr>
                        <th valign="middle" colspan="6" style="color: #436EEE;background-color: #f3f3f3;">
                            客户回访
                        </th>
                    </tr>
                    <tr>
                        <th  class="bgcolor" style="color: #436EEE">回访记录</th>
                        <td colspan="5" >
                            <el-table
                                    :data="hfjlData"
                                    border
                                    style="width: 100%">
                                <el-table-column prop="id"  align="center" label="序号" width="50"></el-table-column>
                                <el-table-column prop="callBackDate" align="center" label="回访时间"  width="140"></el-table-column>
                                <el-table-column prop="callBackUserName" align="center" label="回访人"  width="130"></el-table-column>
                                <el-table-column prop="result "  align="center" label="结果" ></el-table-column>
                                <el-table-column prop="remark"  align="center" label="备注" ></el-table-column>
                            </el-table>
                        </td>
                    </tr>
                    <!-- <tr>
                        <th  class="bgcolor">通话记录</th>
                        <td colspan="5" >
                            <table class="table table_2">
                                &nbsp;
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <th  class="bgcolor">信用变更记录</th>
                        <td colspan="5" >
                            <table class="table table_2">
                                &nbsp;
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <th  class="bgcolor">客户信用调整</th>
                        <td colspan="5" >
                            <el-row >
                                <el-col :span="3">
                                  当前信用度：<strong style="color:red">{{score.score}}</strong>
                                </el-col>                                
                                <el-col :span="21">
                                   <el-form :inline="true" :model="score" class="demo-form-inline">

                                    <el-form-item >
                                      <el-select v-model="score.method" placeholder="加">
                                            <el-option
                                                    v-for="item in score.methods"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                      </el-select>
                                    </el-form-item>
                                    <el-form-item >
                                      <el-select v-model="score.scores" placeholder="1分">
                                            <el-option
                                                    v-for="item in score.scoress"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                      </el-select>
                                    </el-form-item> 
                                    <el-form-item label="调整原因">
                                      <el-input v-model="score.message" placeholder="请输入调整原因"></el-input>
                                    </el-form-item>                                                                       
                                    <el-form-item>
                                      <el-button type="primary" @click="onSubmit">确定</el-button>
                                    </el-form-item>
                                   </el-form>
                                </el-col>
                            </el-row>
                        </td>
                    </tr> -->
                </table>
            </el-row> 
            <el-dialog
              id="dialog"
              width="60%"
              top="100px"
              title="照片信息"
              :visible.sync="innerImgVisible"
              append-to-body>
                    <template v-for="(o,index) in idCardImgs">
                      <el-card v-if="index==  Math.abs(imgIndex)"  :key="o.label" :body-style="{ padding: '0px' }"  shadow="never">
                          <img @click="handleImgShow" :src="o.src" class="imgCenter">
                          <!-- <div style="padding: 14px;text-align:center">
                            <span>{{o.label}}</span>
                          </div>                                     -->
                      </el-card>
                    </template>

                    <button type="button" @click="changImgIndex(-1)" class="el-carousel__arrow el-carousel__arrow--left"><i class="el-icon-arrow-left"></i></button>   
                    <button type="button"   @click="changImgIndex(1)" class="el-carousel__arrow el-carousel__arrow--right"><i class="el-icon-arrow-right"></i></button>                       
            </el-dialog>              
        </el-dialog>                 
    </div>
</template>
<script>
import { httpGetPromoters, httpGetUserDetail } from "../../../service/http";
export default {
  data() {
    return {
      keywords: "",
      tableData: [],
      total: 0,
      npage: 1,
      pagesize: 10,
      checkVisible: false,
      innerImgVisible: false,
      imgIndex: 0,
      userData: [],
      relationShips: [],
      rzData: [
        {
          xm: "薄祥周",
          zz: "住址：江苏省无锡市锡山区东亭街道华夏中路金锡南苑15栋301",
          dh: "电话：138-6175-9537"
        },
        {
          xm: "薄祥周",
          zz: "住址：江苏省无锡市锡山区东亭街道华夏中路金锡南苑15栋301",
          dh: "电话：138-6175-9537"
        },
        {
          xm: "薄祥周",
          zz: "住址：江苏省无锡市锡山区东亭街道华夏中路金锡南苑15栋301",
          dh: "电话：138-6175-9537"
        }
      ],
      sqData: [
        {
          xxw: "-",
          sjfw: "-",
          tbzh: "-",
          tbmm: "-",
          jdzh: "-",
          jdmm: "-"
        }
      ],
      idCardImgs: [],
      qbData: [
        {
          qbzt: "已通过",
          zcsj: "	2017-03-10 09:32:16",
          scdl: "	2017-03-10 09:32:16",
          zcd: "上海市松江区",
          sqed: "0.00",
          sxfqed: "1600",
          dzht: "点击查看"
        }
      ],
      fqzdData: [],
      hkjlData: [],
      zljData: [
        {
          xh: "7022",
          fqsp: "钱包取现500元",
          spje: "40.00",
          sf: "0.00",
          yg: "500.00",
          fqs: "14",
          zt: "结束",
          wyqs: "14",
          wyje: "40.00",
          jmbl: "0.00%",
          sqr: "借花花",
          tjsj: "2017-03-28"
        }
      ],
      hfjlData: [
        {
          xh: "28663",
          hfsj: "2017-05-10",
          hfr: "潘月",
          jg: "1",
          bz:
            "致电客户父亲电话称客户喜欢赌博，年前已经帮客户还了很多欠款了，客户去年离婚的，小孩自己在带，要求我司正常程序催缴客户还款，自己无力偿还",
          fj: "查看附件"
        },
        {
          xh: "28663",
          hfsj: "2017-05-10",
          hfr: "潘月",
          jg: "1",
          bz:
            "致电客户父亲电话称客户喜欢赌博，年前已经帮客户还了很多欠款了，客户去年离婚的，小孩自己在带，要求我司正常程序催缴客户还款，自己无力偿还",
          fj: "查看附件"
        },
        {
          xh: "28663",
          hfsj: "2017-05-10",
          hfr: "潘月",
          jg: "1",
          bz:
            "致电客户父亲电话称客户喜欢赌博，年前已经帮客户还了很多欠款了，客户去年离婚的，小孩自己在带，要求我司正常程序催缴客户还款，自己无力偿还",
          fj: "查看附件"
        },
        {
          xh: "28663",
          hfsj: "2017-05-10",
          hfr: "潘月",
          jg: "1",
          bz:
            "致电客户父亲电话称客户喜欢赌博，年前已经帮客户还了很多欠款了，客户去年离婚的，小孩自己在带，要求我司正常程序催缴客户还款，自己无力偿还",
          fj: "查看附件"
        },
        {
          xh: "28663",
          hfsj: "2017-05-10",
          hfr: "潘月",
          jg: "1",
          bz:
            "致电客户父亲电话称客户喜欢赌博，年前已经帮客户还了很多欠款了，客户去年离婚的，小孩自己在带，要求我司正常程序催缴客户还款，自己无力偿还",
          fj: "查看附件"
        }
      ],
      score: {
        score: 100,
        method: "",
        scores: "",
        methods: [{ value: 1, label: "加" }, { value: 0, label: "减" }],
        scoress: [
          { value: 1, label: "1分" },
          { value: 2, label: "2分" },
          { value: 3, label: "3分" },
          { value: 4, label: "4分" },
          { value: 5, label: "5分" },
          { value: 6, label: "6分" },
          { value: 7, label: "7分" },
          { value: 8, label: "8分" },
          { value: 9, label: "9分" },
          { value: 10, label: "10分" }
        ],
        message: ""
      },
      search: "",
      loading: true,
      sloading: false
    };
  },
  methods: {
    getData(pageNumber, pageSize, keywords) {
      let _this = this;
      this.loading = true;
      httpGetPromoters(pageNumber, pageSize, keywords)
        .then(res => {
          let data = res.data.data;
          _this.tableData = data.list;
          _this.total = data.allsize;
          _this.loading = false;
        })
        .catch();
    },
    handleSearch() {
      this.getData(this.npage, this.pagesize, this.keywords);
    },
    handleCurrentChange(val) {
      this.npage = val;
      this.getData(this.npage, this.pagesize, this.keywords);
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getData(this.npage, this.pagesize, this.keywords);
    },
    onSubmit() {},
    handleShow(row) {
      let _this = this;
      let id = row.id;
      this.userData.length = 0;
      this.relationShips.length = 0;
      this.hkjlData.length = 0;
      this.fqzdData.length = 0;
      this.hfjlData.length = 0;
      this.sloading = true;
      this.idCardImgs.length = 0;
      httpGetUserDetail(id)
        .then(res => {
          let data = res.data.data;
          _this.userData.push(data);
          _this.relationShips = data.relationShips;
          _this.hkjlData = data.loanRepayments;
          _this.fqzdData = data.loanApplies;
          _this.hfjlData = data.loanCollectionRecords;
          _this.idCardImgs.push({
            src: data.fullFaceUrl,
            label: "身份证正面"
          });
          _this.idCardImgs.push({
            src: data.reverseUrl,
            label: "身份证反面照"
          });
          _this.idCardImgs.push({
            src: data.handUrl,
            label: "身份证手持照"
          });
          this.sloading = false;
          _this.checkVisible = true;
        })
        .catch();
    },
    changImgIndex(i) {
      this.imgIndex = (this.imgIndex + i) % this.idCardImgs.length;
    },
    handleImgShow(i) {
      this.imgIndex = i;
      this.innerImgVisible = true;
    }
  },
  mounted() {
    this.getData(this.npage, this.pagesize);
  }
};
</script>
<style>
#tb1 .el-table thead {
  display: none;
}
</style>
<style>
#dialog .el-dialog__header {
  display: none;
}
#dialog .el-dialog {
  padding: 0;
  background: rgba(0, 0, 0, 0);
}
#dialog .el-dialog__body {
  padding: 0;
  background: rgba(0, 0, 0, 0.1);
}
#dialog .el-card__body {
  background: rgba(0, 0, 0, 0.1);
}
#dialog .el-card {
  background: rgba(0, 0, 0, 0.1);
  border: none;
}
</style>

<style scoped>
.table {
  border: double 3px #555;
  margin: 5px auto;
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  table-layout: fixed;
  border-collapse: separate;
}
.table tr th,
.table tr td {
  padding: 8px;
  line-height: 1.42857143;
  vertical-align: top;
  border-top: 1px solid #ddd;
}

.title_6 {
  padding: 10px;
}
.table_2 {
  border: double 0px #d3d3d3;
  margin: 5px auto;
  line-height: 30px;
}
.table tbale {
  background-color: #fff;
}
.image {
  width: 100%;
  height: 180px;
  display: block;
  cursor: pointer;
}
.imgCenter {
  clear: both;
  display: block;
  margin: auto;
}
.bgcolor {
  color: #436eee;
  background-color: #f3f3f3;
}
.w100 {
  width: 20%;
}
</style>

