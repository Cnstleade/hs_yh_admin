<template>
    <div class="container">
        <el-row>
            <el-alert
              title="审核逾期统计"
              :closable="false"
              type="info">
            </el-alert>           
        </el-row>    
        <el-row class="m20">
            <el-table
                :data="tableData"
                border
                :span-method="objectSpanMethod"
                style="width: 100%"
                >
                <el-table-column prop="jl" align='center' label="审核经理"  ></el-table-column>                
                <el-table-column prop="tj" align='center' label="统计" width="240" ></el-table-column>                
                <el-table-column prop="yg" align='center' label="审核员"  ></el-table-column>                
                <el-table-column prop="m1" align='center' label="M1"  ></el-table-column>                
                <el-table-column prop="m1a" align='center' label="逾期率(单数)"  ></el-table-column>                
                <el-table-column prop="m1b" align='center' label="逾期率(金额)"  ></el-table-column>                
                <el-table-column prop="m2" align='center' label="M2"  ></el-table-column>                
                <el-table-column prop="m2a" align='center' label="逾期率(单数)" ></el-table-column>                
                <el-table-column prop="m2b" align='center' label="逾期率(金额)"  ></el-table-column>                
                <el-table-column prop="m3" align='center' label="M3"  ></el-table-column>                
                <el-table-column prop="m3a" align='center' label="逾期率(单数)"  ></el-table-column>                
                <el-table-column prop="m3b" align='center' label="逾期率(金额)"  ></el-table-column>                
                <el-table-column prop="m4" align='center' label="M3+"  ></el-table-column>                
                <el-table-column prop="m4a" align='center' label="逾期率(单数)"  ></el-table-column>                
                <el-table-column prop="m4b" align='center' label="逾期率(金额)" ></el-table-column>                
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
      tableData: [
        {
          jl: "王梓琴",
          tj: "总逾期率(单数8024/8027)：99.963%",
          yg: "王斌",
          m1: "0",
          m1a: "0.000%",
          m1b: "0.000%",
          m2: "0",
          m2a: "0.000%",
          m2b: "0.000%",
          m3: "0",
          m3a: "0.000%",
          m3b: "0.000%",
          m4: "1254",
          m4a: "100.000%",
          m4b: "100.000%"
        },
        {
          jl: "王梓琴",
          tj: "总逾期率(单数8024/8027)：99.963%",
          yg: "崔慧",
          m1: "0",
          m1a: "0.000%",
          m1b: "0.000%",
          m2: "0",
          m2a: "0.000%",
          m2b: "0.000%",
          m3: "0",
          m3a: "0.000%",
          m3b: "0.000%",
          m4: "812",
          m4a: "100.000%",
          m4b: "100.000%"
        },
        {
          jl: "王梓琴",
          tj: "总逾期率(单数8024/8027)：99.963%",
          yg: "王珊珊",
          m1: "0",
          m1a: "0.000%",
          m1b: "0.000%",
          m2: "0",
          m2a: "0.000%",
          m2b: "0.000%",
          m3: "0",
          m3a: "0.000%",
          m3b: "0.000%",
          m4: "62",
          m4a: "100.000%",
          m4b: "100.000%"
        },
        {
          jl: "李仙仙",
          tj: "总逾期率(单数8024/8027)：99.963%",
          yg: "李仙仙",
          m1: "0",
          m1a: "0.000%",
          m1b: "0.000%",
          m2: "0",
          m2a: "0.000%",
          m2b: "0.000%",
          m3: "0",
          m3a: "0.000%",
          m3b: "0.000%",
          m4: "62",
          m4a: "100.000%",
          m4b: "100.000%"
        },
        {
          jl: "李仙仙",
          tj: "总逾期率(单数8024/8027)：99.963%",
          yg: "王梓琴",
          m1: "0",
          m1a: "0.000%",
          m1b: "0.000%",
          m2: "0",
          m2a: "0.000%",
          m2b: "0.000%",
          m3: "0",
          m3a: "0.000%",
          m3b: "0.000%",
          m4: "62",
          m4a: "100.000%",
          m4b: "100.000%"
        },
        {
          jl: "李仙仙",
          tj: "总逾期率(单数8024/8027)：99.963%",
          yg: "朱柳钰儒",
          m1: "0",
          m1a: "0.000%",
          m1b: "0.000%",
          m2: "0",
          m2a: "0.000%",
          m2b: "0.000%",
          m3: "0",
          m3a: "0.000%",
          m3b: "0.000%",
          m4: "62",
          m4a: "100.000%",
          m4b: "100.000%"
        },
        {
          jl: "李仙仙",
          tj: "总逾期率(单数8024/8027)：99.963%",
          yg: "王志娟",
          m1: "0",
          m1a: "0.000%",
          m1b: "0.000%",
          m2: "0",
          m2a: "0.000%",
          m2b: "0.000%",
          m3: "0",
          m3a: "0.000%",
          m3b: "0.000%",
          m4: "62",
          m4a: "100.000%",
          m4b: "100.000%"
        },
        {
          jl: "李仙仙",
          tj: "总逾期率(单数8024/8027)：99.963%",
          yg: "梁贝贝",
          m1: "0",
          m1a: "0.000%",
          m1b: "0.000%",
          m2: "0",
          m2a: "0.000%",
          m2b: "0.000%",
          m3: "0",
          m3a: "0.000%",
          m3b: "0.000%",
          m4: "62",
          m4a: "100.000%",
          m4b: "100.000%"
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
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1) {
        if (rowIndex % 4 === 0) {
          return {
            rowspan: 4,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    }
  }
};
</script>
<style scoped>
</style>

