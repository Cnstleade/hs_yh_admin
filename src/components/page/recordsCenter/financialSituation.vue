<template>
    <div class="container">
     <el-row>
            <el-alert
              title="财务状况"
              :closable="false"
              type="info">
            </el-alert>           
      </el-row>       
        <el-row class="m20">
            <el-row class="col-flex"  style="align-items:center">
              <el-col :span="14" :offset="1" >
                  <div  id="myChart1" :style="{width: '550px', height: '400px'}"></div>
              </el-col>
              <el-col :span="4" >
                  <el-card :body-style="{ padding: '0px' }">
                    <div style="padding: 14px;text-align:center;color:#fff;backgroundColor:#f8d436">
                      <h2>总客户数</h2>
                      <span>451660</span>
                    </div>
                  </el-card>
              </el-col>

         
              
            </el-row>
          <el-row class="col-flex"  style="align-items:center">
              <el-col :span="4"  :offset="4">
                  <el-card :body-style="{ padding: '0px' }">
                    <div style="padding: 14px;text-align:center;color:#fff;backgroundColor:#a7db65;">
                      <h2>总订单量</h2>
                      <span>451660</span>
                    </div>
                  </el-card>
              </el-col>            
                      <el-col :span="13" :offset="3" class="m20">
                            <div id="myChart2" :style="{width: '680px', height: '400px'}"></div>
                    </el-col>
          </el-row>
                 
        </el-row>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    drawLine(a, b, c) {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      // 绘制图表
      myChart1.setOption({
        title: {
          text: "总销售额",
          subtext: "纯属虚构",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: ["采购成本", "销售利润", "总销售额"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["20%", "35%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
                backgroundColor: "#eee",
                borderColor: "#aaa",
                borderWidth: 1,
                borderRadius: 4,
                rich: {
                  a: {
                    color: "#999",
                    lineHeight: 22,
                    align: "center"
                  },
                  hr: {
                    borderColor: "#aaa",
                    width: "100%",
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  per: {
                    color: "#eee",
                    backgroundColor: "#334455",
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              }
            },
            data: [
              { value: 95644154, name: "采购成本" },
              { value: 14445996, name: "销售利润" }
            ]
          },
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            label: {
              normal: {
                formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c} ",
                backgroundColor: "#eee",
                borderColor: "#aaa",
                borderWidth: 1,
                borderRadius: 4,
                // shadowBlur:3,
                // shadowOffsetX: 2,
                // shadowOffsetY: 2,
                // shadowColor: '#999',
                // padding: [0, 7],
                rich: {
                  a: {
                    color: "#999",
                    lineHeight: 22,
                    align: "center"
                  },
                  hr: {
                    borderColor: "#aaa",
                    width: "100%",
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  per: {
                    color: "#eee",
                    backgroundColor: "#334455",
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              }
            },
            data: [{ value: 110089850, name: "总销售额", selected: true }]
          }
        ]
      });

      myChart2.setOption({
        title: {
          text: "总销售额",
          subtext: "纯属虚构",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c}元 ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: ["已还款滞纳金", "已还款手续费", "已还款成本"]
        },
        series: [
          {
            name: "百分率",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}",
                backgroundColor: "#eee",
                borderColor: "#aaa",
                borderWidth: 1,
                borderRadius: 4,
                // shadowBlur:3,
                // shadowOffsetX: 2,
                // shadowOffsetY: 2,
                // shadowColor: '#999',
                // padding: [0, 7],
                rich: {
                  a: {
                    color: "#999",
                    lineHeight: 22,
                    align: "center"
                  },
                  hr: {
                    borderColor: "#aaa",
                    width: "100%",
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  per: {
                    color: "#eee",
                    backgroundColor: "#334455",
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              }
            },
            data: [
              { value: 2480399, name: "已还款滞纳金" },
              { value: 13522556, name: "已还款手续费" },
              { value: 90085194, name: "已还款成本" }
            ]
          }
        ]
      });
    }
  },
  mounted() {
    this.drawLine(1, 2, 3);
  }
};
</script>

<style scoped>
.image {
  display: block;
  width: 100%;
}
</style>
