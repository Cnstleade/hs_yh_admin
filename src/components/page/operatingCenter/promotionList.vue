<template>
    <div class="container">
        <el-row>
            <el-alert
              title="推广情况统计"
              :closable="false"
              type="info">
            </el-alert>           
        </el-row>
        <el-row class="m20">

            <el-col  :span="14" :offset="10" class="col-flex-end">
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
                <el-table-column prop="id"  align="center" label="渠道id"  width="100" ></el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center" width="180" sortable>
                    <template slot-scope="scope">
                        {{scope.row.createTime|dateServer}}
                    </template>
                </el-table-column>       
  
                <el-table-column prop="promotionCode" align="center" label="推广码" width="200" ></el-table-column>                                    
                <el-table-column prop="spje" align="center"  label="推广二维码"  width="100">
                    <template slot-scope="scope">
                      <div @click="handleImg(scope.$index, scope.row)" style="cursor:pointer">
                      		<vue-qr   :logoSrc="scope.row.chbqrcode.imagePath" :text="scope.row.chbqrcode.value" :size="20" :margin="0"></vue-qr>

                      </div>
                    </template>
                </el-table-column>
                <el-table-column prop="applyPassSum" align="center" label="机申通过数量" ></el-table-column>
                <el-table-column prop="registeredSum"  align="center" label="注册数量"   ></el-table-column>
                <el-table-column prop="applySum"  align="center" label="申请数量"   ></el-table-column>                   

                <!-- <el-table-column prop="zt" align="center" label="查看提现" >
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="success"
                        @click="handleShow"
                        >提现情况</el-button>  
                    </template>
                </el-table-column> -->
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
                width="60%"
              title="查看提现情况"
              center
              :visible.sync="showVisible"   
            >
                <el-table
                    :data="lateFeesData"
                    border
                    style="width: 100%">  
                    <el-table-column prop="sqr" align="center" label="样式一" ></el-table-column>                    
                    <el-table-column prop="sj"  align="center" label="样式二" ></el-table-column>                    
                    <el-table-column prop="wyje" align="center" label="样式三" ></el-table-column>                    
                </el-table>                  
        </el-dialog> 
        <el-dialog 
                width="30%"
              title="二维码展示"
              center
              :visible.sync="imgVisible"   
            >
              <el-row>

              </el-row>
              <el-tabs type="border-card">
                  <el-tab-pane label="样式一" style="text-align:center">
                      <vue-qr   :logoSrc="imgSrc.imagePath" :text="imgSrc.value" :size="200" :margin="0"></vue-qr>
                      <div >
                        <span>您的二维码</span>
                      </div>                    
                  </el-tab-pane>
                  <el-tab-pane label="样式二" style="text-align:center">
                     <vue-q-art :config="imgSrc"></vue-q-art>
                      <div >
                        <span>您的二维码</span>
                      </div>                    
                  </el-tab-pane>
                  <el-tab-pane label="样式三" style="text-align:center">
                  		<vue-qr :bgSrc='config.imagePath' :logoSrc="config.imagePath" :text="config.value" :size="200" :margin="0"></vue-qr>
                      <div >
                        <span>您的二维码</span>
                      </div>                    
                  </el-tab-pane>
              </el-tabs>
                    <!-- <el-card :body-style="{ padding: '20px 0px',textAlign:'center' }">
                    
                      <vue-qr   :logoSrc="imgSrc.imagePath" :text="imgSrc.value" :size="200" :margin="0"></vue-qr>
                      <div >
                        <span>您的二维码</span>
                      </div>
                    </el-card> -->
        </el-dialog>  
    </div>
</template>
<script>
import VueQArt from "vue-qart";
import VueQr from "vue-qr";

import { getPromoterList } from "../../../service/http";
export default {
  components: {
    VueQArt,
    VueQr
  },
  data() {
    return {
      config: {
        value: "www.baidu.com", //显示的值、跳转的地址

        logo: "../../../assets/logo.png" //中间logo的地址
      },

      src2: "../../../assets/logo.png",
      imgSrc: {},
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
      tableData: [],
      total: 0,
      npage: 1,
      pagesize: 10,
      addVisible: false,
      showVisible: false,
      imgVisible: false,
      addForm: {
        id: "",
        price: "",
        hasPrice: "",
        textarea: ""
      },
      restaurants: [],
      lateFeesData: [
        {
          sqr: "	借花花",
          sj: "2018-03-08",
          wyje: "1780.00",
          qs: "14",
          khm: "蒋成富",
          spmc: "钱包取现1000元",
          sqbz: "连连支付滞纳金"
        }
      ]
    };
  },
  watch: {
    // imgVisible(newV) {
    //   console.log(newV);
    //   if (newV) {
    //     this.imgSrc = null;
    //   }
    // }
  },
  methods: {
    _config(url) {
      return {
        value: url,
        imagePath: require("../../../../static/img/img.jpg"),
        filter: "color"
      };
    },
    _getPromoterList() {
      let _this = this;
      getPromoterList()
        .then(res => {
          let data = res.data;
          let self = _this;
          for (let a = 0; a < data.length; a++) {
            console.log(_this);
            data[a].chbqrcode = self._config(data[a].qrcode);
          }
          _this.tableData = data;
          console.log(_this.tableData);
        })
        .catch();
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
    },
    handleImg(index, row) {
      this.imgSrc = null;
      if (row) {
        this.imgSrc = this._config(row.qrcode);
        console.log(this.imgSrc.imagePath);
        this.imgVisible = true;
      }
    }

    // qrcode() {
    //   let qrcode = new QRCode("qrcode", {
    //     width: 100,
    //     height: 100, // 高度
    //     text: "56663159" // 二维码内容
    //     // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
    //     // background: '#f0f'
    //     // foreground: '#ff0'
    //   });
    //   console.log(qrcode);
    // }
  },
  mounted() {
    this.restaurants = this.loadAll();
    this._getPromoterList();
  }
};
</script>
<style scoped>
.col-flex-end {
  display: flex;
  justify-content: flex-end;
}
.image {
  width: 100%;
  display: block;
}
#query {
  width: 100px;
  height: 100px;
}
#canvas {
  width: 80% !important;
  height: auto !important;
}
</style>

