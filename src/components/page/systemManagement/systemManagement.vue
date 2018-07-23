<template>
    <div class="container">
        <el-row>
            <el-alert
              title="系统参数设置"
              :closable="false"
              type="info">
            </el-alert>           
        </el-row>  
        <el-row class="m20">
               <el-button  type="primary" @click="add">添加参数</el-button>
               <el-button  type="primary" class="l20" @click="change">修改参数</el-button>
        </el-row>
        <el-row :gutter="12" class="flex m20" >
            <el-col :span="5">
                <el-card shadow="always">
                    <el-row>
                        <strong style="margin-left:30px">可提现额最小值:</strong>
                        <i style="color:red">{{chooseMoneyVo.minMoney}}</i>
                    </el-row>
                    <el-row class="m20">
                         <strong style="margin-left:30px">可提现额最大值:</strong>
                         <i style="color:red">{{chooseMoneyVo.maxMoney}}</i>
                    </el-row>
                </el-card>
             </el-col>
             <template v-for="(item,i) in list.slice(0,2)">
                   <el-col :span="5" :key="i">
                      <el-card shadow="always">
                          <el-row>
                              <strong style="margin-left:30px">借款期限:</strong>
                              <i style="color:red">{{item.rateDay}}</i>
                          </el-row>
                          <el-row class="m20">
                               <strong style="margin-left:30px">千分的利率:</strong>
                               <i style="color:red">{{item.rateAll}}</i>
                          </el-row>
                      </el-card>
                 </el-col>                
             </template>
        </el-row>
        <el-row :gutter="12" class="flex m20" >
             <template v-for="(item,i) in list.slice(2,5)">
                   <el-col :span="5" :key="i">
                      <el-card shadow="always">
                          <el-row>
                              <strong style="margin-left:30px">借款期限:</strong>
                              <i style="color:red">{{item.rateDay}}</i>
                          </el-row>
                          <el-row class="m20">
                               <strong style="margin-left:30px">千分的利率:</strong>
                               <i style="color:red">{{item.rateAll}}</i>
                          </el-row>
                      </el-card>
                 </el-col>                
             </template>
        </el-row>        
      <!-- <el-dialog
          title="参数修改"
          :visible.sync="dialogVisible1"
          center
          width="30%"
          >

            <el-form :model="roleForm" status-icon  ref="roleForm" label-width="120px"  >

              <el-form-item label="可提现额最小值:" prop="minMoney" >
                <el-input type="input"  v-model="roleForm.minMoney" ></el-input>
              </el-form-item>
              <el-form-item label="可提现额最大值:" prop="maxMoney" >
                <el-input type="number"  v-model="roleForm.maxMoney" ></el-input>
              </el-form-item> 
              <el-form-item label="借款期限:" prop="mname" >
                <el-input type="input"  v-model="roleForm.mname" ></el-input>
              </el-form-item>
   
              <template v-for="(domain, index) in roleForm.domains">
                    <el-form-item
                      
                      :label="'借款期限' + (index+1)"
                      :key="domain.key"
                      :prop="'domains.' + index + '.value'"
                      :rules="{
                        required: true, message: '域名不能为空', trigger: 'blur'
                      }"
                    >
                    
                      <el-input v-model="domain.value"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>    
                           </el-form-item>      
                       <el-form-item
                      
                      :label="'千分率'"
                      :key="domain.key"
                      :prop="'domains.' + index + '.value'"
                      :rules="{
                        required: true, message: '域名不能为空', trigger: 'blur'
                      }"
                    >
                    <el-input v-model="domain.value"></el-input>
                  </el-form-item>                                
              </template>

           <el-form-item>  
                <el-button type="primary" @click="submitForm('roleForm')">提交</el-button>
                 <el-button @click="addDomain">新增借款期限</el-button>
                <el-button type="primary" style="margin-left:30px" @click="qx1('roleForm')">取消</el-button>
              </el-form-item>
            </el-form>
        </el-dialog>    -->
      <el-dialog
          title="参数修改"
          :visible.sync="dialogVisible1"
          center
    
          width="30%"
          >

            <el-form :model="sysForm" status-icon  ref="sysForm" label-width="120px"  v-if="sysForm.chooseMoneyVo">

              <el-form-item label="可提现额最小值:" prop="minMoney" >
                <el-input type="number"   v-model="sysForm.chooseMoneyVo.minMoney" ></el-input>
              </el-form-item>
              <el-form-item label="可提现额最大值:" prop="maxMoney" >
                <el-input type="number"  v-model="sysForm.chooseMoneyVo.maxMoney" ></el-input>
              </el-form-item> 
              <template v-for="(temp, index) in sysForm.list">
                    <el-form-item
                      :label="'借款期限' + (index+1)"
                      :key="index"
                    >
                    
                      <el-input    type="number" v-model="temp.rateDay"></el-input>
                      <!-- <el-button @click.prevent="removeDomain(domain)">删除</el-button>     -->
                           </el-form-item>      
                       <el-form-item
                      :label="'千分率'"
                      :key="index"
                    >
                    <el-input v-model="temp.rateAll"></el-input>
                  </el-form-item>                                
              </template>

           <el-form-item>  
                <el-button type="primary" @click="onSubmit">提交</el-button>
                 <!-- <el-button @click="addDomain">新增借款期限</el-button> -->
                <el-button type="primary" style="margin-left:30px" @click="qx1('roleForm')">取消</el-button>
              </el-form-item>
            </el-form>
        </el-dialog>  
      <el-dialog
          title="添加参数"
          :visible.sync="dialogVisible2"
          center
    
          width="30%"
          >

            <el-form :model="sysForm" status-icon  ref="addForm" label-width="120px"  >

              <el-form-item label="总利率:" prop="rateAll" >
                <el-input type="number"   v-model="addForm.rateAll" ></el-input>
              </el-form-item>
              <el-form-item label="借款天数:" prop="borrowDay" >
                <el-input type="number"  v-model="addForm.borrowDay" ></el-input>
              </el-form-item> 
              <el-form-item label="逾期的利率:" prop="overdue_rate" >
                <el-input type="number"  v-model="addForm.overdue_rate" ></el-input>
              </el-form-item>               
           <el-form-item>  
                <el-button type="primary" @click="onSubmit1">提交</el-button>
                 <!-- <el-button @click="addDomain">新增借款期限</el-button> -->
                <el-button type="primary" style="margin-left:30px" @click="dialogVisible2=false">取消</el-button>
              </el-form-item>
            </el-form>
        </el-dialog>                 
    </div>
</template>

<script>
import {
  httpParametershow,
  httpUpdateparameter,
  httpParameteradd
} from "../../../service/http";
export default {
  data() {
    return {
      dialogVisible1: false,
      dialogVisible2: false,
      chooseMoneyVo: {},
      list: [],
      roleForm: {
        domains: [
          {
            value: ""
          }
        ]
      },
      addForm: {},
      sysForm: {}
    };
  },
  methods: {
    //系统利率增加
    _httpParameteradd(rateAll, borrowDay, overdue_rate) {
      httpParameteradd(rateAll, borrowDay, overdue_rate)
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.dialogVisible2 = false;
            this._httpParametershow();
          }
        })
        .catch();
    },
    //后台参数修改
    _httpUpdateparameter(minMoney, maxMoney, list) {
      httpUpdateparameter(minMoney, maxMoney, list)
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.dialogVisible1 = false;
            this._httpParametershow();
          }
        })
        .catch();
    },
    //得到系统参数
    _httpParametershow() {
      httpParametershow()
        .then(res => {
          let data = res.data;
          this.chooseMoneyVo = data.chooseMoneyVo;
          this.list = data.list;
        })
        .catch(err => {
          this.$message.error("网络错误请联系管理员");
        });
    },
    change() {
      this.dialogVisible1 = true;
      this.sysForm = JSON.parse(
        JSON.stringify({
          chooseMoneyVo: this.chooseMoneyVo,
          list: this.list
        })
      );
    },
    add() {
      this.addForm = {};
      this.dialogVisible2 = true;
    },
    removeDomain(item) {
      var index = this.roleForm.domains.indexOf(item);
      if (index !== -1) {
        this.roleForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.roleForm.domains.push({
        value: "",
        key: Date.now()
      });
    },
    onSubmit() {
      let list = this.sysForm.list.map((v, i, a) => {
        return { rateDay: v.rateDay, rateAll: v.rateAll };
      });

      this._httpUpdateparameter(
        this.sysForm.chooseMoneyVo.minMoney,
        this.sysForm.chooseMoneyVo.maxMoney,
        list
      );
    },
    onSubmit1() {
      this._httpParameteradd(
        this.addForm.rateAll,
        this.addForm.borrowDay,
        this.addForm.overdue_rate
      );
    }
  },
  created() {
    this._httpParametershow();
  }
};
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: space-between;
}
</style>

