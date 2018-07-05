<template>
    <div class="container"   >
      <div v-if="show" >
				<div id="preloader">
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>        
      </div>
      <div v-if="!show">
        <el-row :gutter="20">
            <el-col :span="6" v-for="(item,i) in todayEventList" :key="i">
                <el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div :class="'grid-content grid-con-'+i">
                        <div class="grid-con-default grid-con-icon">{{item.count}}</div>
                        <div class="grid-cont-right">
                            <div class="grid-num">{{item.percent}}</div>
                            <div>{{item.title}}</div>
                        </div>                        
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row style=" margin-top:20px;padding-top:20px;    border-top: 2px solid #ccc">
            <el-row>
              <el-col  class="col-flex" style=" justify-content: space-around;">
                <el-button-group >
                    <el-button type="primary" icon="delete" @click="setTime(0,0)">今天</el-button>
                    <el-button type="primary" icon="delete" @click="setTime(1,1)">昨天</el-button>
                    <el-button type="primary" icon="delete" @click="setTime(7,0)">最近七天</el-button>
                    <el-button type="primary" icon="delete" @click="setTime(30,0)">最近三十天</el-button>
                </el-button-group>
                   
              <!-- <el-col :span="2" :offset="3">
                <div class="container-text">统计时间</div>
              </el-col> -->
                  <el-col class="table" :span="7">
                 风险事件统计
                   <el-tag>{{getMyDate(time[0])}}</el-tag>  
                   -
                   <el-tag>{{getMyDate(time[1])}}</el-tag> 
                   
                </el-col>
                <el-date-picker
                  class="l20"
                    v-model="time"
                    type="daterange"
                    range-separator="至"
                    @change="a"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="timestamp">
                </el-date-picker>
              </el-col>
              <!-- <el-col :span="2">
                <el-select v-model="select_cate" placeholder="事件类型" class="handle-select mr10">
                    <template v-for="(val, key, index) in comboBox" >
                       <el-option :key= "index"  :label="val" :value="key">
                       </el-option>
                    </template>
                </el-select> 
              </el-col> -->
              <!-- <el-col :span="2" style="padding-left:10px">
                <el-button type="primary" icon="delete" @click="handleSearch">搜索</el-button>
              </el-col> -->
            </el-row>

                <!-- <el-col :span="2">
                    <el-button >导出数据</el-button>          
                </el-col> -->
                <!-- <el-col :span="6" v-if="allEventList.length>0">
                  <el-tag type="success">   {{allEventList[3].title}}:
                    {{allEventList[3].count}}</el-tag>
                </el-col> -->
                

            <el-row class="table-data" >
     
                  <el-col :span="22" class="schart col-flex" style="justify-content: space-around;"  >
                    	<div id="myChart1" :style="{width: '500px', height: '600px'}"></div>
                    	<div id="myChart2" :style="{width: '500px', height: '600px'}"></div>
                  </el-col>
                <!-- <el-col :span="8" v-if="allEventList.length>0">
                  <el-col :span="24" v-for="(item,i) in allEventList" :key="i">
                    <div >
                      <div :class="'grid-content grid-con-'+i">
                          <el-progress v-if="item.percent !== -1 "   type="circle" :width="80" :percentage="item.percent===-1? 0:item.percent" :color="item.color"></el-progress>
                          <div class="grid-cont-right"  v-if="item.percent !== -1 " >
                              <div class="grid-num">{{item.count}}</div>
                             <div>{{item.title}}</div>
                          </div>                        
                      </div>
                    </div>
                  </el-col>
                </el-col>                 -->
            </el-row>
        </el-row>
      </div>
    </div>    
</template>

<script>
import "../../config/regexp";
import bus from "../../config/bus";
import { timeFormat } from "../../config/time";
import { getPlatform } from "../../service/http";
import { DingConf } from "../../util/config";
export default {
  data() {
    return {
      todayEventList: [],
      allEventList: [],
      comboBox: [],
      time: [],
      crossTime: [timeFormat(new Date()), timeFormat(new Date(new Date()), 1)],
      showTime: [],
      select_cate: "",
      options2: {
        title: "风险事件统计",
        bgColor: "#ddd",
        titleColor: "#000",
        legendColor: "#000"
      },
      show: true,
      count: 0
    };
  },
  watch: {
    time(curVal, oldVal) {
      if (this.time) {
        this.crossTime = [
          timeFormat(new Date(curVal[0])) + "00:00:00",
          timeFormat(new Date(curVal[1]), 1) + "00:00:00"
        ];
      }
    }
  },
  methods: {
    setTime(a, b) {
      this.time = [
        new Date(
          new Date(new Date().setDate(new Date().getDate() - a)).setHours(
            0,
            0,
            0,
            0
          )
        ).getTime(),
        new Date(
          new Date(new Date().setDate(new Date().getDate() - b)).setHours(
            0,
            0,
            0,
            0
          )
        ).getTime()
      ];

      setTimeout(() => {
        this.handleSearch();
      }, 100);
    },
    //转成2017-01-01
    getMyDate(str, number = 0) {
      return timeFormat(str, number);
    },
    //得到上面的4个点点
    getSummary(a, b) {
      let _this = this;
      getPlatform(a, b)
        .then(response => {
          let data = response.data;
          _this.todayEventList = [
            {
              title: "今日注册用户数",
              count: data.registersNumber,
              percent: "",
              color: "#ff6c5c"
            },
            {
              title: "今日申请贷款数",
              count: data.applyNumber,
              percent: "",
              color: "#f8d436"
            },
            {
              title: "今日放款用户数",
              count: data.lendUserNumber,
              percent: "",
              color: "#a7db65"
            },
            {
              title: "今日代办审批任务总数",
              count: data.approveNumber,
              color: "#7a8c99"
            }
          ];
          setTimeout(() => {
            _this.show = false;
          }, 2000);

          this.drawLine(
            data.lendApplyNumber,
            data.overdueApplyNumber,
            data.lendMoney,
            data.overdueMoney
          );
        })
        .catch();
    },

    //点击搜索
    handleSearch() {
      if (this.crossTime[0]) {
        this.getSummary(...this.crossTime);
      }
    },
    //画图
    drawLine(a1, b1, c1, d1) {
      // 基于准备好的dom，初始化echarts实例
      setTimeout(() => {
        let myChart1 = this.$echarts.init(document.getElementById("myChart1"));
        // 绘制图表
        myChart1.setOption({
          title: {
            text: "订单统计",
            subtext: "Order Form  Statistics",
            x: "center",
            y: "center",
            itemGap: 20,
            textStyle: {
              color: "rgba(30,144,255,0.8)",
              fontFamily: "微软雅黑",
              fontSize: 35,
              fontWeight: "bolder"
            }
          },
          tooltip: {
            show: true,
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            x: document.getElementById("myChart1").offsetWidth / 2,
            y: 45,
            itemGap: 12,
            data: ["放款订单总数", "逾期订单总数"]
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          series: [
            {
              name: "放款订单总数",
              type: "pie",
              clockWise: false,
              radius: [135, 160],
              itemStyle: {
                normal: {
                  label: { show: false },
                  labelLine: { show: false }
                }
              },
              data: [
                {
                  value: a1,
                  name: `放款订单总数${a1}`
                }
              ]
            },
            {
              name: "逾期订单总数",
              type: "pie",
              clockWise: false,
              radius: [100, 125],
              itemStyle: {
                normal: {
                  label: { show: false },
                  labelLine: { show: false }
                }
              },
              data: [
                {
                  value: b1,
                  name: `逾期订单总数${b1}`
                },
                {
                  value: a1,
                  name: "其他",
                  itemStyle: {
                    normal: {
                      color: "rgba(0,0,0,0)",
                      label: { show: false },
                      labelLine: { show: false }
                    },
                    emphasis: {
                      color: "rgba(0,0,0,0)"
                    }
                  }
                }
              ]
            }
          ]
        });
        let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
        myChart2.setOption({
          title: {
            text: "金额统计",
            subtext: "The amount of statistical",
            x: "center",
            y: "center",
            itemGap: 20,
            textStyle: {
              color: "rgba(30,144,255,0.8)",
              fontFamily: "微软雅黑",
              fontSize: 35,
              fontWeight: "bolder"
            }
          },
          tooltip: {
            show: true,
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            x: document.getElementById("myChart2").offsetWidth / 2,
            y: 45,
            itemGap: 12,
            data: ["放款金额总数", "逾期金额总数"]
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          series: [
            {
              name: "放款金额总数",
              type: "pie",
              clockWise: false,
              radius: [135, 160],
              itemStyle: {
                normal: {
                  label: { show: false },
                  labelLine: { show: false }
                }
              },
              data: [
                {
                  value: c1,
                  name: `放款金额总数${c1}`
                }
              ]
            },
            {
              name: "逾期金额总数",
              type: "pie",
              clockWise: false,
              radius: [100, 125],
              itemStyle: {
                normal: {
                  label: { show: false },
                  labelLine: { show: false }
                }
              },
              data: [
                {
                  value: d1,
                  name: `逾期金额总数${d1}`
                },
                {
                  value: c1,
                  name: "其他",
                  itemStyle: {
                    normal: {
                      color: "rgba(0,0,0,0)",
                      label: { show: false },
                      labelLine: { show: false }
                    },
                    emphasis: {
                      color: "rgba(0,0,0,0)"
                    }
                  }
                }
              ]
            }
          ]
        });
      }, 20);
    },
    a() {
      setTimeout(() => {
        this.handleSearch();
      }, 100);
    }
  },
  mounted() {
    this.setTime(30, 0);
  },
  created() {}
};
</script>



<style scoped>
.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
  font-weight: bold;
}
.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: #999;
}
.grid-con-default {
  flex: 1;
  text-align: center;
  font-size: 26px;
  line-height: 100px;
  color: #fff;
}
.grid-con-0 .grid-con-icon {
  background: #ff6c5c;
}

.grid-con-0 .grid-num {
  color: #ff6c5c;
}
.grid-con-1 .grid-con-icon {
  background: #f8d436;
}

.grid-con-1 .grid-num {
  color: #f8d436;
}
.grid-con-2 .grid-con-icon {
  background: #a7db65;
}

.grid-con-2 .grid-num {
  color: #a7db65;
}
.grid-con-3 .grid-con-icon {
  background: #7a8c99;
}

.grid-con-3 .grid-num {
  color: #7a8c99;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}
.container {
  overflow: hidden;
}
.container-text {
  line-height: 32px;
  font-size: 14px;
  color: #7a8c99;
}
.table {
  border-bottom: 2px solid #cccccc38;
  line-height: 32px;
  font-size: 14px;
  color: #7a8c99;
  text-align: center;
}
.table-data {
  padding: 20px;
}
</style>

