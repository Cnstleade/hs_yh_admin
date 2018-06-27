<template>
    <div class="container">
        <el-row>
            <el-alert
              title="客户列表"
              :closable="false"
              type="info">
            </el-alert>           
        </el-row> 
        <el-row class="m20">
            <el-col  class="col-flex-end">
                    <el-select class="l20" v-model="search.source" placeholder="订单状态">
                      <el-option
                        v-for="item in search.sources"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>                
                    <div class="l20">
                        <el-input
                        style="padding:0px 10px 0px 0px"
                          placeholder="请输入姓名"
                          v-model="search.realName"
                          clearable>
                        </el-input> 
                    </div> 
                    <div class="l20">
                        <el-input
                        style="padding:0px 10px 0px 0px"
                          placeholder="请输入手机号码"
                          v-model="search.phoneNumber"
                          clearable>
                        </el-input> 
                    </div> 
                    <div class="l20">
                        <el-input
                        style="padding:0px 10px 0px 0px"
                          placeholder="请输入身份证 "
                          v-model="search.idcard"
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
                    style="width: 100%"
                      v-loading="loading"
              >
                <el-table-column prop="id"  align="center" label="ID"  width="60" sortable></el-table-column>
                <el-table-column prop="realName"  align="center" label="姓名"  width="100" ></el-table-column>
                <el-table-column prop="source"  align="center" label="来源"  width="80"
                         :filters="[{ value: 1, text: '苹果' }, { value: 2, text: '安卓' }, { value: 3, text: '网页' }]"
                         :filter-method="filterSource"                   
                   >
                  <template slot-scope="scope">
                      <el-tag
                          :type="scope.row.source===1?'':scope.row.source===2?'success':'danger'"
                      >{{scope.row.source===1?'苹果':scope.row.source===2?'安卓':'网页'}}</el-tag>
                  </template> 
                </el-table-column>
                <!-- <el-table-column prop="xb"  align="center" label="性别"   ></el-table-column> -->
                <el-table-column prop="idcard"  align="center" label="身份证号" width="150" ></el-table-column>
                <!-- <el-table-column prop="em"  align="center" label="Email"   ></el-table-column> -->
                <el-table-column prop="phoneNumber"  align="center" label="手机号"  width="120" ></el-table-column>
                <el-table-column prop="wxNumber"  align="center" label="微信号"   ></el-table-column>                
                <el-table-column prop="qqNumber"  align="center" label="qq号"   ></el-table-column>                
                <el-table-column prop="detailAddress"  align="center" label="详细地址"   ></el-table-column>
                <el-table-column prop="createTime"  align="center" label="注册时间"  width="150"  sortable>
                  <template slot-scope="scope">
                      {{scope.row.createTime|dateServer}}
                  </template>                  
                </el-table-column>
                <el-table-column prop="mariage"  align="center" label="婚姻状况"  width="100"
                         :filters="[{ value: 1, text: '未婚' }, { value: 2, text: '已婚' }, { value: 3, text: '离婚' }]"
                         :filter-method="filterMariage"                 
                 >
                  <template slot-scope="scope">
                      <el-tag
                          :type="scope.row.mariage===1?'':scope.row.mariage===2?'success':'danger'"
                      >{{scope.row.mariage===1?'未婚':scope.row.mariage===2?'已婚':'离婚'}}</el-tag>
                  </template>                     
                </el-table-column>
                <el-table-column prop="eduBack"  align="center" label="教育背景"   width="100"
                         :filters="[{ value: 1, text: '高中' }, { value: 2, text: '大专' }, { value: 3, text: '本科' }, { value: 4, text: '硕士' }, { value: 5, text: '博士' }]"
                         :filter-method="filterEduBack"                   
                  >
                  <template slot-scope="scope">
                      <el-tag
                          :type="scope.row.eduBack===1?'':scope.row.eduBack===2?'success':scope.row.eduBack===3?'info':scope.row.eduBack===4?'warning':scope.row.eduBack===5?'danger':''"
                      >{{scope.row.eduBack===1?'高中':scope.row.eduBack===2?'大专':scope.row.eduBack===3?'本科':scope.row.eduBack===4?'硕士':scope.row.eduBack===5?'博士':'其它'}}</el-tag>
                  </template>   
                </el-table-column>
                <el-table-column prop="isDel"  align="center" label="是否黑名单"  width="90" 
                  >
                 
                </el-table-column>  
                <el-table-column prop="status"  align="center" label="状态"   width="150"
                         :filters="[{ value: 1, text: '业务员维护中' }, { value: 2, text: '审核分配中 ' }, { value: 3, text: '审核中' }, { value: 4, text: '弃用' }, { value: 0, text: '停用' }]"
                         :filter-method="filterStatus"                 
                  >
                  <template slot-scope="scope">
                      <el-tag
                          :type="scope.row.status===1?'':scope.row.status===2?'success':scope.row.status===3?'info':scope.row.status===4?'warning':'danger'"
                      >{{scope.row.status===1?'业务员维护中':scope.row.status===2?'审核分配中':scope.row.status===3?'审核中':scope.row.status===4?'弃用':'停用'}}</el-tag>
                  </template>   
                </el-table-column>                          
                <el-table-column prop="cz"  align="center" label="操作"  width="80" >
                    <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="success"
                        @click="handleDetail(scope.$index, scope.row)">详情</el-button>
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
                                <el-table-column prop="xm" label="姓名" align="center" ></el-table-column>
                                <el-table-column prop="xb" label="性别" align="center" ></el-table-column>
                                <el-table-column prop="khzt" label="客户状态" align="center" ></el-table-column>
                                <el-table-column prop="sfzh" label="身份证号" align="center"></el-table-column>
                                <el-table-column prop="sjh" label="手机号" align="center" ></el-table-column>
                                <el-table-column prop="khh" label="开户行" align="center" ></el-table-column>
                                <el-table-column prop="yhkh" label="银行卡号" align="center" ></el-table-column>
                                <el-table-column prop="wx" label="微信号" align="center" ></el-table-column>
                                <el-table-column prop="qq" label="QQ" align="center" ></el-table-column>
                                <el-table-column prop="gzdw" label="工作单位" align="center" width="500"></el-table-column>
                                <el-table-column prop="xszh" label="学生证号" align="center" ></el-table-column>
                                <el-table-column prop="ly" label="来源" align="center" ></el-table-column>
                            </el-table>
                        </td>
                    </tr>
                    <tr>
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
                    </tr>
                    <tr>
                        <th  class="bgcolor">联系人信息</th>
                        <td colspan="5" >
                            <table class="table table_2">
                                &nbsp;
                            </table>
                        </td>
                    </tr>
                    <tr>
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
                    </tr>
                    <tr>
                        <th  class="bgcolor">认证资料</th>
                        <td colspan="5" >
                            <el-row >
                                <el-col :span="3"   v-for="(o, index) in idCardImgs" :key="o.label" :offset="index > 0 ? 1 : 0">
                                    <template>
                                        <el-card :body-style="{ padding: '0px' }" shadow="hover">
                                            <img @click="handleImgShow" :src="o.src" class="image">
                                            <div style="padding: 14px;text-align:center">
                                                <span>{{o.label}}</span>
                                            </div>
                                        </el-card>
                                    </template>
                                </el-col>
                            </el-row>
                        </td>
                    </tr>
                    <tr>
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
                    </tr>
                    <tr>
                        <th  class="bgcolor">分期账单信息</th>
                        <td colspan="5" >
                            <el-table
                                    :data="fqzdData"
                                    border
                                    style="width: 100%">
                                <el-table-column prop="id"   label="ID"  width="50" ></el-table-column>
                                <el-table-column prop="ht"  label="合同号" width="200"></el-table-column>
                                <el-table-column prop="sp"  label="商品" ></el-table-column>
                                <el-table-column prop="jg"  label="价格" ></el-table-column>
                                <el-table-column prop="sf"  label="首付" ></el-table-column>
                                <el-table-column prop="yg"  label="月供" ></el-table-column>
                                <el-table-column prop="fqs"  label="分期数" ></el-table-column>
                                <el-table-column prop="yhqs"  label="已还期数" ></el-table-column>
                                <el-table-column prop="yhkr"  label="应还款日" ></el-table-column>
                                <el-table-column prop="sjhk"  label="实际还款时间" ></el-table-column>
                                <el-table-column prop="zt"  label="状态" ></el-table-column>
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
                                <el-table-column prop="xh"   label="序号"  width="50" ></el-table-column>
                                <el-table-column prop="id"  label="订单ID" width="200"></el-table-column>
                                <el-table-column prop="hkje"  label="还款金额" ></el-table-column>
                                <el-table-column prop="qs"  label="期数" ></el-table-column>
                                <el-table-column prop="hklx"  label="还款类型" ></el-table-column>
                                <el-table-column prop="zlj"  label="滞纳金" ></el-table-column>
                                <el-table-column prop="hksj"  label="还款时间" ></el-table-column>
                                <el-table-column prop="cz"  label="操作" ></el-table-column>
                            </el-table>
                        </td>
                    </tr>
                    <tr>
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
                    </tr>
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
                                <el-table-column prop="xh"  align="center" label="序号" width="100"></el-table-column>
                                <el-table-column prop="hfsj" align="center" label="回访时间" width="100" ></el-table-column>
                                <el-table-column prop="hfr" align="center" label="回访人" width="100" ></el-table-column>
                                <el-table-column prop="jg"  align="center" label="结果" width="100"></el-table-column>
                                <el-table-column prop="bz"  align="center" label="备注" ></el-table-column>
                                <el-table-column prop="fj" align="center" label="附件" width="100" ></el-table-column>
                            </el-table>
                        </td>
                    </tr>
                    <tr>
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
                    </tr>
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
import { getCustUserList } from "../../../service/http";
export default {
  data() {
    return {
      tableData: [],
      loading: true,
      checkVisible: false,
      innerImgVisible: false,
      imgIndex: 0,
      total: 0,
      npage: 1,
      pagesize: 10,
      userData: [
        {
          xm: "田焕楠",
          xb: "女",
          khzt: "启用",
          sfzh: "320882199209091219",
          sjh: "13770771244",
          khh: "--",
          yhkh: "6212261103004606571",
          wx: "xuebingqq14",
          qq: "1516213615",
          gzdw:
            "无锡尤尼斯科技有限公司(江苏省无锡市锡山区坊前街道纺城大道289号15-115)",
          xszh: "未填写",
          ly: "网络"
        }
      ],
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
      idCardImgs: [
        {
          src: "static/img/img.jpg",
          label: "身份证正面"
        },
        {
          src: "static/img/demo1.jpg",
          label: "身份证反面"
        },
        {
          src: "static/img/img1.jpg",
          label: "人脸识别照"
        },
        {
          src: "static/img/img2.jpg",
          label: "银行卡照片"
        }
      ],
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
      fqzdData: [
        {
          id: "1",
          ht: "	QB1083-20170328160408",
          sp: "钱包取现500元",
          jg: "	500.00",
          sf: "0.00",
          yg: "500.00",
          fqs: "14(天)",
          yhqs: "0",
          yhkr: "2017-04-11",
          sjhk: "2017-04-11",
          zt: "启用"
        },
        {
          id: "1",
          ht: "	QB1083-20170328160408",
          sp: "钱包取现500元",
          jg: "	500.00",
          sf: "0.00",
          yg: "500.00",
          fqs: "14(天)",
          yhqs: "0",
          yhkr: "2017-04-11",
          sjhk: "2017-04-11",
          zt: "启用"
        },
        {
          id: "1",
          ht: "	QB1083-20170328160408",
          sp: "钱包取现500元",
          jg: "	500.00",
          sf: "0.00",
          yg: "500.00",
          fqs: "14(天)",
          yhqs: "0",
          yhkr: "2017-04-11",
          sjhk: "2017-04-11",
          zt: "启用"
        }
      ],
      hkjlData: [
        {
          xh: "253",
          id: "254",
          hkje: 500.0,
          qs: 14,
          hklx: "分月",
          zlj: "40.00",
          hksj: "2017-03-28 15:06:49",
          cz: "查看"
        }
      ],
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
      search: {
        source: null,
        sources: [{label: "全部", value: null },{ label: "android", value: 2 }, { label: "ios", value: 1 }, { label: "网页", value: 3 }],
        realName: null,
        phoneNumber: null,
        idcard: null
      }
    };
  },
  methods: {
    getData(npage, pagesize, source, realName, phoneNumber, idcard) {
      this.loading = true;
      getCustUserList(npage, pagesize, source, realName, phoneNumber, idcard)
        .then(res => {
          let data = res.data;
          this.tableData = data.rows;
          this.total = data.total;
          this.loading = false;
        })
        .catch(err => {});
    },
    handleSearch() {
      this.getData(
        this.npage,
        this.pagesize,
        this.search.source,
        this.search.realName,
        this.search.phoneNumber,
        this.search.idcard
      );
    },
    handleDetail() {
      this.checkVisible = true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    log() {
      console.log(this.multipleSelection);
    },
    handleCurrentChange(val) {
      this.npage = val;
      this.handleSearch();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.handleSearch();
    },

    handleImgShow() {
      this.innerImgVisible = true;
    },
    changImgIndex(i) {
      console.log(this.imgIndex, this.idCardImgs.length);
      this.imgIndex = (this.imgIndex + i) % this.idCardImgs.length;
    },
    onSubmit() {},
    filterSource(value, row){
       return row.source === value;   
    },
    filterMariage(value, row){
       return row.mariage === value;   
    },
    filterEduBack(value, row){
       return row.eduBack === value;   
    }  ,
    filterStatus(value, row){
       return row.status === value;  
    }      
  
  },
  mounted() {
    this.getData(this.npage, this.pagesize);
  }
};
</script>

<style scoped>
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

<style>
#tb1 .el-table thead {
  display: none;
}
</style>

<style scoped>
.col-flex {
  display: flex;
  justify-content: flex-start;
}
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
