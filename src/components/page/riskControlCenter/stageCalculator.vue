<template>
    <div class="container" id="counter">
      <template>
        <el-row>
          <el-col :span="24" align="left">分期计算器</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" align="right"><label>类型</label></el-col>
          <el-col :span="20">
            <template>
              <template>
                <el-radio-group v-model="radio">
                  <el-radio :label="1">学生</el-radio>
                  <el-radio :label="2">成人</el-radio>
                </el-radio-group>
              </template>
            </template>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" align="right"><label>资方</label></el-col>
          <el-col :span="20">
            <template>
              <el-radio v-model="radio1" :label="1">提钱付</el-radio>
            </template>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" align="right"><label>分期类型</label></el-col>
          <el-col :span="20">
            <template>
              <template>
                <el-radio-group v-model="radio2">
                  <el-radio :label="1">分期</el-radio>
                  <el-radio :label="2">帮帮</el-radio>
                  <el-radio :label="3">车险</el-radio>
                  <el-radio :label="4">租房</el-radio>
                </el-radio-group>
              </template>
            </template>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" align="right"><label>分期金额</label></el-col>
          <el-col :span="20">
            <template>
              <el-col :span="10"><el-input type="number"></el-input></el-col>
            </template>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" align="right"><label>分期数</label></el-col>
          <el-col :span="20">
            <template>
              <el-col :span="10"><el-input v-model="form.NumberStages"></el-input></el-col>
            </template>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" align="right"><label>首付</label></el-col>
          <el-col :span="20">
            <template>
              <el-col :span="10"><el-input v-model="form.downPayment"></el-input></el-col>
            </template>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" align="right"><label>月供</label></el-col>
          <el-col :span="20">
            <template>
              <el-col :span="10"><el-input v-model="form.monthPay" :readonly="true"></el-input></el-col>
            </template>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" align="right"><label>含手续费</label></el-col>
          <el-col :span="20">
            <template>
              <el-col :span="10"><el-input v-model="form.serviceCharge" :readonly="true"></el-input></el-col>
            </template>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" align="right"><label>服务费</label></el-col>
          <el-col :span="20">
            <template>
              <el-col :span="10"><el-input v-model="form.coverCharge" :readonly="true"></el-input></el-col>
            </template>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-button type="primary">计算月供</el-button>
            <el-button type="success">返回</el-button>
          </el-col>
        </el-row>
      </template>
    </div>
</template>

<script>
  export default {
    name: "stageCalculator",
    data(){
      return{
        radio: 1,
        radio1: 1,
        radio2: 1,
        form:{
          NumberStages: 12,
          downPayment: 0,
          monthPay: 0,
          serviceCharge: 0,
          coverCharge: 0
        }
      }
    }

  }
</script>

<style scoped>
#counter .el-row{
  padding: 10px 0;
}
</style>
