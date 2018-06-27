<template>
    <div class="container" >
        <template>
            <el-row class="title">
                <el-col :span="24">{{headName}}</el-col>
            </el-row>

           
            <el-row class="flex1" v-model="operateData">
                <el-col :span="6" class="divFlex" v-for="(item,index) in operateData" :key="index">
                    <div class="borderStyle">
                        <div class="center divTitle">{{item.name}}</div>
                    <el-row>
                        <el-col class="fontStyle" :span="12" v-for="(childItem,i) in item.arry" :key="i">
                            <div class="center">{{childItem.argument}}个</div>
                            <div class="center">{{childItem.date}}</div>
                        </el-col>
                    </el-row>
                    </div>
                </el-col>
            </el-row>

            <el-row class="title">
                <el-col :span="24">{{headName1}}</el-col>
            </el-row>

            <el-row class="flex2" v-model="platformData">
                <el-col :span="6" class="divFlex" v-for="(item,index) in platformData" :key="index">
                    <div class="borderStyle">
                        <div class="center divTitle">{{item.name}}</div>
                        <div class="center fontStyle">{{item.number}}个</div>
                    </div>
                </el-col>
            </el-row>
        </template>
    </div>
</template>

<script>
import '../../config/regexp';
export default {
  name: "myWorkbench",
  data() {
    return {
      headName: "运营数据",
      headName1: "平台数据",
      operateData: [
        {
          name: "注册用户数",
          arry: [
            {
              argument: 0,
              date: "当日"
            },
            {
              argument: 0,
              date: "历史"
            }
          ]
        },
        {
          name: "申请用户数",
          arry: [
            {
              argument: 0,
              date: "当日"
            },
            {
              argument: 0,
              date: "历史"
            }
          ]
        },
        {
          name: "放款用户数",
          arry: [
            {
              argument: 0,
              date: "当日"
            },
            {
              argument: 0,
              date: "历史"
            }
          ]
        },
        {
          name: "放款金额",
          arry: [
            {
              argument: 0,
              date: "当日"
            },
            {
              argument: 0,
              date: "历史"
            }
          ]
        }
      ],
      platformData: [
        {
          name: "代办审批任务总数",
          number: 0
        },
        {
          name: "昨日还款失败总笔数",
          number: 0
        },
        {
          name: "昨日还款成功总笔数",
          number: 0
        },
        {
          name: "还款失败总笔数",
          number: 0
        },
        {
          name: "待还款总数",
          number: 0
        },
        {
          name: "待还款总金额",
          number: 0
        },
        {
          name: "逾期待还款总数",
          number: 0
        },
        {
          name: "逾期待还款总金额",
          number: 0
        }
      ]
    };
  }
};
</script>

<style scoped>
#homePage {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.title {
  background: #ccc;
  font-size: 1.4rem;
  height: 3rem;
  line-height: 3rem;
  padding-left: 5px;
}
.flex1 {
  display: flex;
  flex: 1;
  margin: 1rem 0;
}
.flex2 {
  display: flex;
  flex: 2;
  flex-wrap: wrap;
  margin: 1rem 0;
}
.divFlex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
}
.divTitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}
.center {
  text-align: center;
}
.borderStyle {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #ccc;
}
.fontStyle{
    font-size: 1rem;
}
</style>
