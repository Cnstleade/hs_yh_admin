<template>
    <div class="container">
        <el-row>
            <el-alert
              title="还款记录管理"
              :closable="false"
              type="info">
            </el-alert>           
        </el-row> 
        <el-row  class="m20 col-flex-end">
            <!-- <el-col :span="6">
                <el-button-group>
                  <el-button type="primary" @click="handleAdd">新增还款记录</el-button>
                  <el-button type="primary">导出</el-button>
                </el-button-group>                
            </el-col> -->
      
                    <el-select  v-model="custUserId" placeholder="催收员ID" class="l20">
                      <el-option
                        v-for="item in custUserIds"
                        :key="item.uid"
                        :label="item.username"
                        :value="item.uid">
                      </el-option>
                    </el-select>                                     
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
                    <el-button @click="handleSearch" class="l20" style="margin-left:10px" icon="el-icon-search"  type="success" circle></el-button>                     
                  
        </el-row>
        <el-alert
        v-if="tableData.length==0"
          class="m20"
          title="暂无数据显示"
          type="warning"
          description="暂无数据显示... 您可以进行新增操作"
          :closable="false"
          >
        </el-alert>  
        <el-table
            :data="tableData"  
            border  
            ref="multipleTable" 
            tooltip-effect="dark"
            style="width: 100%"
            class="m20"
            v-loading="loading"
          >
            <el-table-column prop="id" label="用户id" align="center" width="60"></el-table-column>
            <el-table-column prop="type" label="还款类型" align="center" >
                <template slot-scope="scope">
                    <el-tag
                        :type="scope.row.cash_outType===0?'warning':'danger'"
                    >{{scope.row.cash_outType===0?'线下还款':'app还款'}}</el-tag>
                </template>                
            </el-table-column>            
            <el-table-column prop="recordUrl" align="center"  label="还款记录图片"  width="100">
                <template slot-scope="scope">
                  <div @click="handleImg(scope.$index, scope.row)" style="cursor:pointer">
                    <img width="20" :src="scope.row.recordUrl" alt="">
                  </div>
                </template>
            </el-table-column>            
            <el-table-column prop="daysOverdue" label="逾期天数" align="center" ></el-table-column>
            <el-table-column prop="interestOverdue" label="逾期利息" align="center" ></el-table-column>
            <el-table-column prop="discountAmt" label="打折金额" align="center" ></el-table-column>
            <el-table-column prop="discountAmt" label="打折金额" align="center" ></el-table-column>
            <el-table-column prop="mustPayBackAmt" label="应还款" align="center" ></el-table-column>
            <el-table-column prop="actualPayBackAmt" label="实际还款" align="center" ></el-table-column>
            <el-table-column prop="backDate" label="还款日期" align="center" width="150">
                <template slot-scope="scope">
                    {{scope.row.backDate|dateServer}}
                </template>
            </el-table-column>
            <el-table-column prop="replayAmt" label="贷款金额" align="center" ></el-table-column>
            <el-table-column prop="remarks" label="备注" align="center" ></el-table-column>
            <el-table-column prop="createTime" label="记录创建时间" align="center" width="150">
                <template slot-scope="scope">
                    {{scope.row.createTime|dateServer}}
                </template>
            </el-table-column>
            <el-table-column prop="custname" label="客户名" align="center" ></el-table-column>
            <el-table-column prop="success" label="是否还款成功" align="center" >
                <template slot-scope="scope">              
                    <el-tag
                        :type="scope.row.success?'success':'danger'"
                    >{{scope.row.success?'成功':'失败'}}</el-tag>
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
              width="40%"
              title="新增减免比例"
              center
              :visible.sync="addVisible"        
         >
            <el-row>
                <el-col :span="16">
                    <el-form ref="form" :model="addForm" label-width="150px">
                        <el-form-item label="查询账单">
                                <el-autocomplete
                                style="width:300px"
                                  v-model="addForm.id"
                                  :fetch-suggestions="querySearchAsync"
                                  placeholder="请输入账单关键字(身份证号/姓名/手机号)"
                                  @select="handleSelect"
                                ></el-autocomplete> 
                        </el-form-item>     
                        <el-form-item label="操作">
                           <el-checkbox v-model="addForm.op">一次性付款</el-checkbox>
                        </el-form-item>  
                        <el-form-item label="实还本金" class="m10">
                          <el-input v-model="addForm.bj"></el-input>
                        </el-form-item>  
                        <el-form-item label="实还滞纳金" class="m10">
                          <el-input v-model="addForm.zlj"></el-input>
                        </el-form-item>  
                        <el-form-item label="还款期数" class="m10">
                          <el-input v-model="addForm.qs"></el-input>
                        </el-form-item>  
                        <el-form-item label="还款时间" class="m10">
                          <el-input v-model="addForm.sj"></el-input>
                        </el-form-item>  
                        <el-form-item label="本期滞纳金" class="m10">
                          <el-input v-model="addForm.bq"></el-input>
                        </el-form-item>  
                        <el-form-item label="未绑定金额" class="m10">
                          <el-input v-model="addForm.wbd"></el-input>
                        </el-form-item>
                        <el-form-item label="备注" class="m10">
                            <el-input
                              type="textarea"
                              :autosize="{ minRows: 5}"
                              placeholder="请输入内容"
                              v-model="addForm.textarea">
                            </el-input>                            
                        </el-form-item> 
                        <el-form-item class="m10">
                          <el-button type="primary" @click="addSubmit">确定</el-button>
                          <el-button @click="addVisible = false">取消</el-button>
                        </el-form-item>                                                                                                                                                                                                                                                                                
                    </el-form>
                </el-col>
            </el-row>

        </el-dialog>     
            <el-dialog
              id="dialog"
              width="60%"
              top="100px"
              title="还款记录图片"
              :visible.sync="innerImgVisible"
              >
                    
                          <img  :src="imgRul" class="imgCenter">
                          <!-- <div style="padding: 14px;text-align:center">
                            <span>{{o.label}}</span>
                          </div>                                     -->
                    
                  
            </el-dialog>        
    </div>
</template>

<script>
import {
  getLoanRepaymentFindAll,
  httpGetrevewerlist,
  httpGetUserDetail
} from "../../../service/http";
import { timeFormat } from "../../../config/time";
export default {
  data() {
    return {
      imgRul:'',
      innerImgVisible:false,
      addVisible: false,
      addForm: {
        id: "",
        op: false,
        sj: "",
        bq: "",
        wbd: "",
        textarea: "",
        zlj: "",
        qs: "",
        bj: ""
      },
      search: {
        time: [],
        input: "",
        role: "",
        roles: [
          {
            value: "0",
            label: "催收员"
          },
          {
            value: "1",
            label: "无催收员"
          },
          {
            value: "2",
            label: "潘月"
          },
          {
            value: "3",
            label: "王怡婷"
          }
        ],
        role: ""
      },
      tableData: [],
      npage: 1,
      pagesize: 10,
      total: 0,
      loading: true,
      custUserIds: [],
      custUserId: null
    };
  },
  methods: {
    getData(npage, pagesize, custUserId, startDate, endDate) {
      let _this = this;
      this.loading = true;
      getLoanRepaymentFindAll(npage, pagesize, custUserId, startDate, endDate)
        .then(res => {
          let data = res.data;
          _this.tableData = data.rows;
          _this.total = data.total;
          _this.loading = false;
        })
        .catch();
    },
    getCustUserIds() {
      let _this = this;
      httpGetrevewerlist()
        .then(res => {
          let data = res.data;
          _this.custUserIds = data;
          console.log(1, res);
        })
        .catch();
    },
    handleSearch() {
      if (this.search.time && this.search.time.length) {
        this.getData(
          this.npage,
          this.pagesize,
          this.custUserId,
          this.search.time[0],
          timeFormat(this.search.time[1], 1)
        );
      } else {
        this.getData(this.npage, this.pagesize, this.custUserId, "", "");
      }
    },
    handleCurrentChange(val) {
      this.npage = val;
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleAdd() {
      this.addVisible = true;
    },
    addSubmit() {},
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    loadAll() {
      return [
        { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号"
        },
        {
          value: "新旺角茶餐厅",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
        },
        { value: "泷千家(天山西路店)", address: "天山西路438号" },
        {
          value: "胖仙女纸杯蛋糕（上海凌空店）",
          address: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"
        },
        { value: "贡茶", address: "上海市长宁区金钟路633号" },
        {
          value: "豪大大香鸡排超级奶爸",
          address: "上海市嘉定区曹安公路曹安路1685号"
        },
        {
          value: "茶芝兰（奶茶，手抓饼）",
          address: "上海市普陀区同普路1435号"
        },
        { value: "十二泷町", address: "上海市北翟路1444弄81号B幢-107" },
        { value: "星移浓缩咖啡", address: "上海市嘉定区新郁路817号" },
        { value: "阿姨奶茶/豪大大", address: "嘉定区曹安路1611号" },
        { value: "新麦甜四季甜品炸鸡", address: "嘉定区曹安公路2383弄55号" },
        {
          value: "Monica摩托主题咖啡店",
          address: "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F"
        },
        {
          value: "浮生若茶（凌空soho店）",
          address: "上海长宁区金钟路968号9号楼地下一层"
        },
        { value: "NONO JUICE  鲜榨果汁", address: "上海市长宁区天山西路119号" },
        { value: "CoCo都可(北新泾店）", address: "上海市长宁区仙霞西路" },
        {
          value: "快乐柠檬（神州智慧店）",
          address: "上海市长宁区天山西路567号1层R117号店铺"
        },
        {
          value: "Merci Paul cafe",
          address: "上海市普陀区光复西路丹巴路28弄6号楼819"
        },
        {
          value: "猫山王（西郊百联店）",
          address: "上海市长宁区仙霞西路88号第一层G05-F01-1-306"
        },
        { value: "枪会山", address: "上海市普陀区棕榈路" },
        { value: "纵食", address: "元丰天山花园(东门) 双流路267号" },
        { value: "钱记", address: "上海市长宁区天山西路" },
        { value: "壹杯加", address: "上海市长宁区通协路" },
        {
          value: "唦哇嘀咖",
          address: "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元"
        },
        { value: "爱茜茜里(西郊百联)", address: "长宁区仙霞西路88号1305室" },
        {
          value: "爱茜茜里(近铁广场)",
          address:
            "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺"
        },
        {
          value: "鲜果榨汁（金沙江路和美广店）",
          address: "普陀区金沙江路2239号金沙和美广场B1-10-6"
        },
        {
          value: "开心丽果（缤谷店）",
          address: "上海市长宁区威宁路天山路341号"
        },
        { value: "超级鸡车（丰庄路店）", address: "上海市嘉定区丰庄路240号" },
        { value: "妙生活果园（北新泾店）", address: "长宁区新渔路144号" },
        { value: "香宜度麻辣香锅", address: "长宁区淞虹路148号" },
        {
          value: "凡仔汉堡（老真北路店）",
          address: "上海市普陀区老真北路160号"
        },
        { value: "港式小铺", address: "上海市长宁区金钟路968号15楼15-105室" },
        { value: "蜀香源麻辣香锅（剑河路店）", address: "剑河路443-1" },
        { value: "北京饺子馆", address: "长宁区北新泾街道天山西路490-1号" },
        {
          value: "饭典*新简餐（凌空SOHO店）",
          address: "上海市长宁区金钟路968号9号楼地下一层9-83室"
        },
        {
          value: "焦耳·川式快餐（金钟路店）",
          address: "上海市金钟路633号地下一层甲部"
        },
        { value: "动力鸡车", address: "长宁区仙霞西路299弄3号101B" },
        { value: "浏阳蒸菜", address: "天山西路430号" },
        { value: "四海游龙（天山西路店）", address: "上海市长宁区天山西路" },
        {
          value: "樱花食堂（凌空店）",
          address: "上海市长宁区金钟路968号15楼15-105室"
        },
        { value: "壹分米客家传统调制米粉(天山店)", address: "天山西路428号" },
        {
          value: "福荣祥烧腊（平溪路店）",
          address: "上海市长宁区协和路福泉路255弄57-73号"
        },
        {
          value: "速记黄焖鸡米饭",
          address: "上海市长宁区北新泾街道金钟路180号1层01号摊位"
        },
        { value: "红辣椒麻辣烫", address: "上海市长宁区天山西路492号" },
        {
          value: "(小杨生煎)西郊百联餐厅",
          address: "长宁区仙霞西路88号百联2楼"
        },
        { value: "阳阳麻辣烫", address: "天山西路389号" },
        {
          value: "南拳妈妈龙虾盖浇饭",
          address: "普陀区金沙江路1699号鑫乐惠美食广场A13"
        }
      ];
    },
    handleImg(index,row){
      this.imgRul = null;
      this.imgRul = row.recordUrl;
      this.innerImgVisible=true;
    }
    
  },
  created() {
    this.getCustUserIds();
    this.getData(this.npage, this.pagesize);
  },
  mounted() {}
};
</script>

<style scoped>
.imgCenter {
  clear: both;
  display: block;
  margin: auto;
}
</style>
