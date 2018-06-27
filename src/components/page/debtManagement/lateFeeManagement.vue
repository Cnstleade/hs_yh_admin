<template>
    <div class="container">
        <el-row>
            <el-alert
              title="滞纳金管理"
              :closable="false"
              type="info">
            </el-alert>           
        </el-row>
        <el-row class="m20">
            <el-col :span="6">
                <el-button-group>
                  <el-button type="primary" @click="handleAdd">新增减免比例</el-button>
                  <el-button type="primary">已经搁置滞纳金</el-button>
                </el-button-group>                
            </el-col>
            <el-col :span="14" :offset="4" class="col-flex-end">
                    <el-select  v-model="search.role" placeholder="催收员">
                      <el-option
                        v-for="item in search.roles"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
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
                <el-table-column prop="id"   label="ID"   ></el-table-column>
                <el-table-column prop="xm"  label="姓名"></el-table-column>
                <el-table-column prop="fqsp"  label="分期商品" ></el-table-column>
                <el-table-column prop="spje"  label="商品金额" ></el-table-column>
                <el-table-column prop="sf"  label="首付" ></el-table-column>
                <el-table-column prop="yg"  label="月供" ></el-table-column>
                <el-table-column prop="fqs"  label="分期数" ></el-table-column>
                <el-table-column prop="zt"  label="状态" ></el-table-column>
                <el-table-column prop="wyts"  label="违约天数" ></el-table-column>
                <el-table-column prop="wyje"  label="违约金额" ></el-table-column>
                <el-table-column prop="jmbl"  label="减免比例" ></el-table-column>
                <el-table-column prop="sqr"  label="申请人" ></el-table-column>
                <el-table-column prop="tjsj"  label="添加时间" ></el-table-column>
                <el-table-column prop="sqr"  label="操作" width="160">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="success"
                        @click="handleShow"
                        >查看</el-button>  
                        <el-button
                        size="mini"
                        type="danger"
                        >删除</el-button>                                               
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
              width="40%"
              title="新增减免比例"
              center
              :visible.sync="addVisible"        
         >
            <el-row>
                <el-col :span="16">
                    <el-form ref="addForm" :model="addForm" label-width="150px">
                          <el-form-item label="查询账单">
                                <el-autocomplete
                                style="width:300px"
                                  v-model="addForm.id"
                                  :fetch-suggestions="querySearchAsync"
                                  placeholder="请输入账单关键字(身份证号/姓名/手机号)"
                                  @select="handleSelect"
                                ></el-autocomplete> 
                        </el-form-item>
                        <el-form-item label="减免金额">
                          <el-input v-model="addForm.price"></el-input>
                        </el-form-item> 
                        <el-form-item label="已减免金额">
                          <el-input v-model="addForm.hasPrice"></el-input>
                        </el-form-item>
                        <el-form-item label="审批凭证">
                            <el-upload
                                class="upload-demo"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :before-upload="beforeAvatarUpload"
                                multiple
                                >
                                <el-button size="small" type="primary">选择图片组</el-button>
                                <div slot="tip" class="el-upload__tip">减免比例超25%，请上传电子版申请书</div>
                            </el-upload>
                        </el-form-item>  
                        <el-form-item label="备注">
                            <el-input
                              type="textarea"
                              :autosize="{ minRows: 5}"
                              placeholder="请输入内容"
                              v-model="addForm.textarea">
                            </el-input>                            
                        </el-form-item>  
                        <el-form-item>
                          <el-button type="primary" @click="addSubmit">确定</el-button>
                          <el-button @click="addVisible = false">取消</el-button>
                        </el-form-item>                                                            
                    </el-form>
                </el-col>
            </el-row>

        </el-dialog>     
        <el-dialog 
                width="60%"
              title="查看滞纳金"
              center
              :visible.sync="showVisible"   
            >
                <el-table
                    :data="lateFeesData"
                    border
                    style="width: 100%">  
                    <el-table-column prop="sqr" align="center" label="申请人" ></el-table-column>                    
                    <el-table-column prop="sj"  align="center" label="时间" ></el-table-column>                    
                    <el-table-column prop="wyje" align="center" label="违约金额" ></el-table-column>                    
                    <el-table-column prop="qs" align="center" label="期数" ></el-table-column>                    
                    <el-table-column prop="khm" align="center"  label="客户名" ></el-table-column>                    
                    <el-table-column prop="spmc" align="center" label="商品名称" ></el-table-column>                    
                    <el-table-column prop="sqbz" align="center" label="申请备注" ></el-table-column>                    
                </el-table>                  
        </el-dialog>   
    </div>
</template>
<script>
export default {
  data() {
    return {
      timeout: null,
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
      tableData: [
        {
          id: "58078",
          xm: "蒋成富",
          fqsp: "钱包取现1000元",
          spje: "1000.00",
          sf: "0.00",
          yg: "1000.00",
          fqs: "14",
          zt: "结束",
          wyts: "89",
          wyje: "1780.00",
          jmbl: "0.00",
          sqr: "	考拉征信",
          tjsj: "2018-03-08"
        },
        {
          id: "58078",
          xm: "蒋成富",
          fqsp: "钱包取现1000元",
          spje: "1000.00",
          sf: "0.00",
          yg: "1000.00",
          fqs: "14",
          zt: "结束",
          wyts: "89",
          wyje: "1780.00",
          jmbl: "0.00",
          sqr: "	考拉征信",
          tjsj: "2018-03-08"
        },
        {
          id: "58078",
          xm: "蒋成富",
          fqsp: "钱包取现1000元",
          spje: "1000.00",
          sf: "0.00",
          yg: "1000.00",
          fqs: "14",
          zt: "结束",
          wyts: "89",
          wyje: "1780.00",
          jmbl: "0.00",
          sqr: "	考拉征信",
          tjsj: "2018-03-08"
        },        {
          id: "58078",
          xm: "蒋成富",
          fqsp: "钱包取现1000元",
          spje: "1000.00",
          sf: "0.00",
          yg: "1000.00",
          fqs: "14",
          zt: "结束",
          wyts: "89",
          wyje: "1780.00",
          jmbl: "0.00",
          sqr: "	考拉征信",
          tjsj: "2018-03-08"
        },        {
          id: "58078",
          xm: "蒋成富",
          fqsp: "钱包取现1000元",
          spje: "1000.00",
          sf: "0.00",
          yg: "1000.00",
          fqs: "14",
          zt: "结束",
          wyts: "89",
          wyje: "1780.00",
          jmbl: "0.00",
          sqr: "	考拉征信",
          tjsj: "2018-03-08"
        },        {
          id: "58078",
          xm: "蒋成富",
          fqsp: "钱包取现1000元",
          spje: "1000.00",
          sf: "0.00",
          yg: "1000.00",
          fqs: "14",
          zt: "结束",
          wyts: "89",
          wyje: "1780.00",
          jmbl: "0.00",
          sqr: "	考拉征信",
          tjsj: "2018-03-08"
        },        {
          id: "58078",
          xm: "蒋成富",
          fqsp: "钱包取现1000元",
          spje: "1000.00",
          sf: "0.00",
          yg: "1000.00",
          fqs: "14",
          zt: "结束",
          wyts: "89",
          wyje: "1780.00",
          jmbl: "0.00",
          sqr: "	考拉征信",
          tjsj: "2018-03-08"
        },        {
          id: "58078",
          xm: "蒋成富",
          fqsp: "钱包取现1000元",
          spje: "1000.00",
          sf: "0.00",
          yg: "1000.00",
          fqs: "14",
          zt: "结束",
          wyts: "89",
          wyje: "1780.00",
          jmbl: "0.00",
          sqr: "	考拉征信",
          tjsj: "2018-03-08"
        },        {
          id: "58078",
          xm: "蒋成富",
          fqsp: "钱包取现1000元",
          spje: "1000.00",
          sf: "0.00",
          yg: "1000.00",
          fqs: "14",
          zt: "结束",
          wyts: "89",
          wyje: "1780.00",
          jmbl: "0.00",
          sqr: "	考拉征信",
          tjsj: "2018-03-08"
        },        {
          id: "58078",
          xm: "蒋成富",
          fqsp: "钱包取现1000元",
          spje: "1000.00",
          sf: "0.00",
          yg: "1000.00",
          fqs: "14",
          zt: "结束",
          wyts: "89",
          wyje: "1780.00",
          jmbl: "0.00",
          sqr: "	考拉征信",
          tjsj: "2018-03-08"
        },        {
          id: "58078",
          xm: "蒋成富",
          fqsp: "钱包取现1000元",
          spje: "1000.00",
          sf: "0.00",
          yg: "1000.00",
          fqs: "14",
          zt: "结束",
          wyts: "89",
          wyje: "1780.00",
          jmbl: "0.00",
          sqr: "	考拉征信",
          tjsj: "2018-03-08"
        },        {
          id: "58078",
          xm: "蒋成富",
          fqsp: "钱包取现1000元",
          spje: "1000.00",
          sf: "0.00",
          yg: "1000.00",
          fqs: "14",
          zt: "结束",
          wyts: "89",
          wyje: "1780.00",
          jmbl: "0.00",
          sqr: "	考拉征信",
          tjsj: "2018-03-08"
        }
      ],
      total: 0,
      npage: 1,
      pagesize: 10,
      addVisible: false,
      showVisible: false,
      addForm: {
        id: "",
        price: "",
        hasPrice: "",
        textarea: ""
      },
      restaurants: [],
      lateFeesData: [{
          sqr:'考拉征信',
          sj:'2018-03-08',
          wyje:'1780.00',
          qs:"14",
          khm:"蒋成富",
          spmc:'钱包取现1000元',
          sqbz:'连连支付滞纳金'
      }]
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.npage = val;
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleAdd() {
      this.addVisible = true;
    },
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
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    addSubmit() {
      console.log("submit!");
    },
    handleShow() {
      this.showVisible = true;
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
  }
};
</script>
<style scoped>
.col-flex-end {
  display: flex;
  justify-content: flex-end;
}
</style>

