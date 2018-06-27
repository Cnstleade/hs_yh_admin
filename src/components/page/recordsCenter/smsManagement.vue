<template>
    <div class="container">
       <el-row>
            <el-alert
              title="平台短信管理"
              :closable="false"
              type="info">
            </el-alert>           
        </el-row> 
        <el-row class="m20">
            <el-col :span="6">
                <el-button-group>
                  <el-button type="success" >成功</el-button>
                  <el-button type="primary">失败</el-button>
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
                <el-table-column prop="id"   label="ID"   ></el-table-column>
                <el-table-column prop="zcyh"  label="注册用户"></el-table-column>
                <el-table-column prop="xtyh"  label="系统用户" ></el-table-column>
                <el-table-column prop="gx"  label="关系"  ></el-table-column>
                <el-table-column prop="lx"  label="类型" ></el-table-column>
                <el-table-column prop="sj"  label="时间" ></el-table-column>
                <el-table-column prop="hm"  label="号码" ></el-table-column>
                <el-table-column prop="nr"  label="内容" width="500" ></el-table-column>
                <el-table-column prop="cg"  label="是否成功" width="160">
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
          zcyh: "not set",
          xtyh: "无",
          gx: "系统",
          lx: "登录",
          sj: "2018-04-08-15:25:12",
          hm: "13590083709",
          nr:
            "提现验证码为254603（序号：36），有效时间5分钟，验证短信请勿转发给其他人。",
          cg: "成功"
        },
        {
          id: "5109",
          zcyh: "not set",
          xtyh: "无",
          gx: "系统",
          lx: "登录",
          sj: "2018-04-08-15:25:12",
          hm: "13590083709",
          nr:
            "提现验证码为254603（序号：36），有效时间5分钟，验证短信请勿转发给其他人。",
          cg: "成功"
        },
        {
          id: "5109",
          zcyh: "not set",
          xtyh: "无",
          gx: "系统",
          lx: "登录",
          sj: "2018-04-08-15:25:12",
          hm: "13590083709",
          nr:
            "提现验证码为254603（序号：36），有效时间5分钟，验证短信请勿转发给其他人。",
          cg: "成功"
        },
        {
          id: "5109",
          zcyh: "not set",
          xtyh: "无",
          gx: "系统",
          lx: "登录",
          sj: "2018-04-08-15:25:12",
          hm: "13590083709",
          nr:
            "提现验证码为254603（序号：36），有效时间5分钟，验证短信请勿转发给其他人。",
          cg: "成功"
        },
        {
          id: "5109",
          zcyh: "not set",
          xtyh: "无",
          gx: "系统",
          lx: "登录",
          sj: "2018-04-08-15:25:12",
          hm: "13590083709",
          nr:
            "提现验证码为254603（序号：36），有效时间5分钟，验证短信请勿转发给其他人。",
          cg: "成功"
        }
      ],
      total: 0,
      npage: 1,
      pagesize: 10
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

<style scoped>
</style>
