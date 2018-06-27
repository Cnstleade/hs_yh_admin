<template>
    <div class="container">
      <el-row>
            <el-alert
              title="滞纳金账单"
              :closable="false"
              type="info">
            </el-alert>           
      </el-row> 
      <el-row class="m20">
            <el-col :span="6">
                <el-button-group>
                  <el-button type="primary" >刷新</el-button>
                </el-button-group>                
            </el-col>
            <el-col :span="14" :offset="4" class="col-flex-end">
                    <el-date-picker
                      class="l20"
                         style="width:340px"
                      v-model="search.time"
                      type="daterange"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>       
                    <div class="l20">
                        <el-input
                        style="padding:0px 10px 0px 0px"
                          placeholder="请输入关键词"
                          v-model="search.input"
                          clearable>
                        </el-input> 
                    </div>                                
                    <el-button class="l20" style="margin-left:10px" icon="el-icon-search"  type="success" circle></el-button>                   
            </el-col>            
      </el-row>   
      <el-row class="m20">
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column prop="id"   label="序号"   ></el-table-column>
                <el-table-column prop="fqsp"  label="分期商品"></el-table-column>
                <el-table-column prop="spje"  label="商品金额" ></el-table-column>
                <el-table-column prop="sf"  label="首付"  ></el-table-column>
                <el-table-column prop="yg"  label="月供" ></el-table-column>
                <el-table-column prop="fqs"  label="分期数" ></el-table-column>
                <el-table-column prop="zt"  label="状态" ></el-table-column>
                <el-table-column prop="wyqs"  label="违约期数"  ></el-table-column>
                <el-table-column prop="wyje"  label="违约金额" ></el-table-column>
                <el-table-column prop="jmbl"  label="减免比例" ></el-table-column>
                <el-table-column prop="sqr"  label="申请人" ></el-table-column>
                <el-table-column prop="tjsj"  label="添加时间" ></el-table-column>
                <el-table-column prop="cg"  label="操作" >
                      <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="success"
                        @click="handleShow"
                        >查看</el-button>  
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
            :visible.sync="showVisible"
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
                        <th valign="middle" colspan="6" class="bgcolor">
                            订单信息
                        </th>
                    </tr>                    
                    <tr>
                        <th  class="bgcolor "  >订单信息</th>
                        <td colspan="5" id="progressprogress">
                            <el-table
                                    :data="rzData"
                                    border
                                    
                                    style="width: 100%">
                                <el-table-column prop="xm"   align="center" label="ID"></el-table-column>
                                <el-table-column prop="lx" align="center" label="类型"></el-table-column>
                                <el-table-column prop="sp"  align="center" label="商品"></el-table-column>
                                <el-table-column prop="jg"  align="center" label="价格"></el-table-column>
                                <el-table-column prop="sf"  align="center" label="首付"></el-table-column>
                                <el-table-column prop="wzd"  align="center" label="完整度" >
                                    <template slot-scope="scope" >
                                        <el-progress  :text-inside="true" :stroke-width="18" :percentage="scope.row.wzd" :status="scope.row.wzd==100?'success':'exception'"></el-progress>                                      
                                    </template>
                                </el-table-column>
                                <el-table-column prop="gxsj"  align="center" label="更新时间"></el-table-column>
                                <el-table-column prop="zt"  align="center" label="状态"></el-table-column>
                                <el-table-column prop="cz"  align="center" label="操作">
                                    <template slot-scope="scope">
                                        <el-button  icon="el-icon-search" type="success"  size="mini">查看</el-button>                                      
                                    </template>                                  
                                </el-table-column>
                            </el-table>
                        </td>
                    </tr>
                    <tr>
                        <th valign="middle" colspan="6" class="bgcolor">
                            还款
                        </th>
                    </tr>                    
                    <tr>
                        <th  class="bgcolor">还款记录</th>
                        <td colspan="5" >
                            <el-table
                                    :data="hkjlData"
                                    border
                                    style="width: 100%">
                                <el-table-column prop="xh" align="center"   label="序号"  width="50" ></el-table-column>
                                <el-table-column prop="hkje" align="center"  label="还款金额" ></el-table-column>
                                <el-table-column prop="qs" align="center"  label="期数" ></el-table-column>
                                <el-table-column prop="zlj" align="center"  label="滞纳金" ></el-table-column>
                                <el-table-column prop="hksj" align="center"   label="还款时间" ></el-table-column>
                                <el-table-column prop="hkbz" align="center"  label="还款备注" ></el-table-column>
                 
                            </el-table>
                        </td>
                    </tr>
                    <tr>
                        <th valign="middle" colspan="6" class="bgcolor">
                            滞纳金
                        </th>
                    </tr>                    
                    <tr>
                        <th  class="bgcolor">滞纳金</th>
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
                        <th  class="bgcolor" style="color: #436EEE">回访</th>
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
                        <th valign="middle" colspan="6" style="color: #436EEE;background-color: #f3f3f3;">
                            通话信息
                        </th>
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
                        <th valign="middle" colspan="6" style="color: #436EEE;background-color: #f3f3f3;">
                            信用变更及调整
                        </th>
                    </tr>                    
                    <tr>
                        <th  class="bgcolor">信用变更记录</th>
                        <td colspan="5" >
                            <el-table
                                    :data="xybgData"
                                    border
                                    style="width: 100%">
                                <el-table-column prop="xh"  align="center" label="序号" ></el-table-column>
                                <el-table-column prop="sj" align="center" label="时间"  ></el-table-column>
                                <el-table-column prop="czr" align="center" label="操作人"  ></el-table-column>
                                <el-table-column prop="lx"  align="center" label="类型" ></el-table-column>
                                <el-table-column prop="fz"  align="center" label="分值" ></el-table-column>
                                <el-table-column prop="yy" align="center" label="原因"  ></el-table-column>
                            </el-table>                            
                        </td>
                    </tr>
                </table>
            </el-row> 
        </el-dialog>             
    </div>
</template>

<script>
export default {
  data() {
    return {
      search: {
        time: [],
        input: ""
      },
      tableData: [
        {
          id: "5109",
          fqsp: "钱包取现1000元",
          spje: "1780.00",
          sf: "0.00",
          yg: "1000.00",
          fqs: "14",
          zt: "结束",
          wyqs: "14",
          wyje: "1780.00",
          jmbl: "0.00%",
          sqr: "考拉征信",
          tjsj: "2018-03-08 17:20:23"
        },
        {
          id: "5109",
          fqsp: "钱包取现1000元",
          spje: "1780.00",
          sf: "0.00",
          yg: "1000.00",
          fqs: "14",
          zt: "结束",
          wyqs: "14",
          wyje: "1780.00",
          jmbl: "0.00%",
          sqr: "考拉征信",
          tjsj: "2018-03-08 17:20:23"
        },
        {
          id: "5109",
          fqsp: "钱包取现1000元",
          spje: "1780.00",
          sf: "0.00",
          yg: "1000.00",
          fqs: "14",
          zt: "结束",
          wyqs: "14",
          wyje: "1780.00",
          jmbl: "0.00%",
          sqr: "考拉征信",
          tjsj: "2018-03-08 17:20:23"
        },
        {
          id: "5109",
          fqsp: "钱包取现1000元",
          spje: "1780.00",
          sf: "0.00",
          yg: "1000.00",
          fqs: "14",
          zt: "结束",
          wyqs: "14",
          wyje: "1780.00",
          jmbl: "0.00%",
          sqr: "考拉征信",
          tjsj: "2018-03-08 17:20:23"
        }
      ],
      total: 0,
      npage: 1,
      pagesize: 10,
      showVisible: false,
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
          lx: "r43w",
          sp: "钱包取现800元",
          jg: "800.00",
          sf: "0.00",
          wzd: 100,
          gxsj: "2017-10-14",
          zt: "	结束",
          cz: ""
        },
        {
          xm: "薄祥周",
          lx: "r43w",
          sp: "钱包取现800元",
          jg: "800.00",
          sf: "0.00",
          wzd: 98,
          gxsj: "2017-10-14",
          zt: "	结束",
          cz: ""
        },
        {
          xm: "薄祥周",
          lx: "r43w",
          sp: "钱包取现800元",
          jg: "800.00",
          sf: "0.00",
          wzd: 30,
          gxsj: "2017-10-14",
          zt: "	结束",
          cz: ""
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
          cz: "查看",
          hkbz: "我没钱没钱没钱"
        },
        {
          xh: "253",
          id: "254",
          hkje: 500.0,
          qs: 14,
          hklx: "分月",
          zlj: "40.00",
          hksj: "2017-03-28 15:06:49",
          cz: "查看",
          hkbz: "我没钱没钱没钱"
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
      search: "",
      xybgData: [
        {
          xh: "407367",
          sj: "2017-10-14",
          czr: "考拉征信",
          lx: "2",
          fz: "100",
          yy: "他没钱没钱没钱"
        }
      ]
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.npage = val;
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleShow() {
      this.showVisible = true;
    },
    addSubmit() {}
  }
};
</script>
<style>
#progressprogress .el-progress-bar__inner {
  text-align: center;
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
