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
                      		<!-- <vue-qr   :logoSrc="scope.row.chbqrcode.imagePath" :text="scope.row.chbqrcode.value" :size="20" :margin="0"></vue-qr> -->
                          <vue-qr :bgSrc='config.imagePath' :logoSrc="config.imagePath" :text="config.value" :size="20" :margin="0"></vue-qr>
                      </div>
                    </template>
                </el-table-column>
                <el-table-column prop="applyPassSum" align="center" label="机申通过数量" width="120" ></el-table-column>
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
    setTimeout(() => {
      this._getPromoterList();
    }, 20);
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

