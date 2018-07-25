<template>
    <div class="container">
        <el-row>
            <el-alert
              title="快速操作面板"
              :closable="false"
              type="info">
            </el-alert>           
        </el-row> 
        <el-row class="m20">
            <el-col  >
                <el-button type="primary">正常<strong style="color:#fff;margin-left:10px">10</strong></el-button>
                <el-button type="success">M1<strong style="color:#fff;margin-left:10px">10</strong></el-button>
                <el-button type="info">M2<strong style="color:#fff;margin-left:10px">10</strong></el-button>
                <el-button type="warning">M3<strong style="color:#fff;margin-left:10px">10</strong></el-button>
                <el-button type="danger">M3以上<strong style="color:#fff;margin-left:10px">10</strong></el-button>
                <el-button type="primary">结束<strong style="color:#fff;margin-left:10px">10</strong></el-button>
            </el-col>
        </el-row>
        <el-row class="m20">
            <el-alert
              title="请选择你的查询方式按查询按钮点击查询"
                type="success"
                center
              :closable="false"
              >
            </el-alert>           
        </el-row>        
        <el-row class="m20" >
            <el-col :span="3" :offset="4">
                <h3 style="text-align:center" >模糊查询</h3>
            </el-col>
            <el-col :span="9" class="col-flex" >
                <div class="l20" style="width:440px">
                    <el-input
                    style="padding:0px 10px 0px 0px；width:300px"
                      placeholder="请输入电话、姓名、身份证、工作单位、地址等信息"
                      v-model="search.mhcx"
                      clearable>
                    </el-input> 
                </div>  
                <el-button class="l20" style="margin-left:10px" icon="el-icon-search"  type="success" circle></el-button> 
            </el-col>
        </el-row>
        
        <el-row class="m20">
            <el-col :span="3" :offset="4">
                <h3 style="text-align:center">精准查询</h3>
            </el-col>            
            <el-col :span="9" class="col-flex" >
                <el-date-picker
                  class="l20"
                     style="width:350px"
                  v-model="search.jzcxTime"
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
                      v-model="search.jzcx"
                      clearable>
                    </el-input> 
                </div>  
                <el-button class="l20" style="margin-left:10px" icon="el-icon-search"  type="success" circle></el-button> 
            </el-col>               
        </el-row>        
        <!-- <el-row class="m20">
            <el-col :span="3" >
                <h3 style="text-align:center" >模糊查询</h3>
            </el-col>
            <el-col :span="9" class="col-flex" >
                <div class="l20" style="width:440px">
                    <el-input
                    style="padding:0px 10px 0px 0px；width:300px"
                      placeholder="请输入电话、姓名、身份证、工作单位、地址等信息"
                      v-model="search.mhcx"
                      clearable>
                    </el-input> 
                </div>  
                <el-button class="l20" style="margin-left:10px" icon="el-icon-search"  type="success" circle></el-button> 
            </el-col>
            <el-col :span="3" >
                <h3 style="text-align:center">精准查询</h3>
            </el-col>
            <el-col :span="9" class="col-flex" >
                <el-date-picker
                  class="l20"
                     style="width:340px"
                  v-model="search.jzcxTime"
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
                      v-model="search.jzcx"
                      clearable>
                    </el-input> 
                </div>  
                <el-button class="l20" style="margin-left:10px" icon="el-icon-search"  type="success" circle></el-button> 
            </el-col>            
        </el-row> -->
        <el-row class="m20">
            <el-col :span="3" :offset="4">
                <h3 style="text-align:center">订单类型查询</h3>
            </el-col>
            <el-col :span="9" class="col-flex" >
                <el-select class="l20" v-model="search.ddlx" placeholder="订单类型">
                  <el-option
                    v-for="item in search.ddlxs"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>  
                <el-select class="l20" v-model="search.ddlxzt" placeholder="全部状态">
                  <el-option
                    v-for="item in search.ddlxzts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>                       
                <el-button class="l20" style="margin-left:10px" icon="el-icon-search"  type="success" circle></el-button> 
            </el-col>
           
        </el-row> 
        <el-row class="m20">
            <el-col :span="3" :offset="4">
                <h3 style="text-align:center">订单状态查询</h3>
            </el-col>
            <el-col :span="9" class="col-flex" >
 
                <el-select class="l20" v-model="search.ddlxzt" placeholder="全部状态">
                  <el-option
                    v-for="item in search.ddlxzts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>      
                <el-select class="l20" v-model="search.csy" placeholder="催收员">
                  <el-option
                    v-for="item in search.csys"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>                                  
                <el-button class="l20" style="margin-left:10px" icon="el-icon-search"  type="success" circle></el-button> 
            </el-col> 
        </el-row>
        <el-row class="m20">
            <el-col :span="3" :offset="4">
                <h3 style="text-align:center">处置类型查询</h3>
            </el-col>
            <el-col :span="9" class="col-flex" >
                <el-select class="l20" v-model="search.cscz" placeholder="==催收处置==">
                  <el-option
                    v-for="item in search.csczs"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>  
                <el-select class="l20" v-model="search.ddlxzt" placeholder="全部状态">
                  <el-option
                    v-for="item in search.ddlxzts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>                       
                <el-button class="l20" style="margin-left:10px" icon="el-icon-search"  type="success" circle></el-button> 
            </el-col>   
        </el-row>  
        <el-row class="m20">
            <el-col :span="3" :offset="4">
                <h3 style="text-align:center">分属区域经理</h3>
            </el-col>
            <el-col :span="9" class="col-flex" >
                <el-select class="l20" v-model="search.qyjl" placeholder="区域经理">
                  <el-option
                    v-for="item in search.qyjls"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>  
                <el-select class="l20" v-model="search.ddlxzt" placeholder="全部状态">
                  <el-option
                    v-for="item in search.ddlxzts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>                       
                <el-button class="l20" style="margin-left:10px" icon="el-icon-search"  type="success" circle></el-button> 
            </el-col> 
        </el-row>
        <el-row class="m20">
            <el-col :span="3" :offset="4">
                <h3 style="text-align:center">分属资方</h3>
            </el-col>
            <el-col :span="9" class="col-flex" >
                <el-select class="l20" v-model="search.qyjl" placeholder="==选择类型==">
                  <el-option
                    v-for="item in search.qyjls"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>  
                <el-select class="l20" v-model="search.ddlxzt" placeholder="全部状态">
                  <el-option
                    v-for="item in search.ddlxzts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>                       
                <el-button class="l20" style="margin-left:10px" icon="el-icon-search"  type="success" circle></el-button> 
            </el-col>               
        </el-row>     
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      search: {
        mhcx: "",
        jzcxTime: [],
        jzcx: "",
        ddlx: "",
        ddlxs: [{ label: "提前付", value: 1 }],
        ddlxzt: "",
        ddlxzts: [{ label: "全部状态", value: 1 },{ label: "正常", value: 2 },{ label: "还款不及时", value: 3 },{ label: "再次欠款", value: 4 },{ label: "严重欠款", value: 5 },{ label: "已结束", value: 6 }],
        csy:'',
        csys:[{ label: "催收员", value: 1 },{ label: "无催收员", value: 2 },{ label: "潘月", value: 3 },{ label: "王怡婷", value: 4 },{ label: "严重欠款", value: 5 },{ label: "已结束", value: 6 }],
        csczs:[{ label: "催收员", value: 1 },{ label: "无催收员", value: 2 },{ label: "潘月", value: 3 },{ label: "王怡婷", value: 4 },{ label: "严重欠款", value: 5 },{ label: "已结束", value: 6 }],
        qyjls:[{ label: "催收员", value: 1 },{ label: "无催收员", value: 2 },{ label: "潘月", value: 3 },{ label: "王怡婷", value: 4 },{ label: "严重欠款", value: 5 },{ label: "已结束", value: 6 }]

      }
    };
  }
};
</script>

<style>
</style>

