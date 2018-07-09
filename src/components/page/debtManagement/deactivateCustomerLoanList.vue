<template>
    <div class="container">
        <el-row>
            <el-alert
              title="停用客户借款列表"
              :closable="false"
              type="info">
            </el-alert>           
        </el-row>        
        <el-row class="m20">
            <el-col :span="14">
                  <el-button  icon="el-icon-plus" @click="export2Excel">导出excel</el-button>
            </el-col>
            <el-col :span="10"  class="col-flex-end">
                <div >
                    <el-input
                    style="padding:0px 10px 0px 0px"
                      placeholder="请输入关键词"
                      v-model="search"
                      clearable>
                    </el-input> 
                </div>  
                <el-button  style="margin-left:10px" icon="el-icon-search"  type="success" circle></el-button>   
            </el-col>
        </el-row>
        <el-row class="m20">
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column prop="id"  align="center" label="ID"   ></el-table-column>
                <el-table-column prop="xm"  align="center" label="姓名"></el-table-column>
                <el-table-column prop="xb"  align="center" label="性别" ></el-table-column>
                <el-table-column prop="sfz" align="center"  label="身份证号" ></el-table-column>
                <el-table-column prop="sjh" align="center"  label="手机号" ></el-table-column>
                <el-table-column prop="ty"  align="center" label="停用时订单量" ></el-table-column>
                <el-table-column prop="dq"  align="center" label="当前剩余订单量" ></el-table-column>
                <el-table-column prop="sj" align="center" label="停用时间" ></el-table-column>
                <el-table-column prop="yy" align="center" label="停用原因" ></el-table-column>
                <el-table-column prop="cz" align="center" label="操作人" ></el-table-column>
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
import { timeFormat } from "../../../config/time";
export default {
  data() {
    return {
      search: "",
      tableData: [
        {
          id: "384710",
          xm: "刘亚男",
          xb: "男",
          sfz: "142731198902280016",
          sjh: "18635956354",
          ty: "1",
          dq: "1",
          sj: "2018-04-04",
          yy: "",
          cz: "潘月"
        },
        {
          id: "384710",
          xm: "刘亚男",
          xb: "男",
          sfz: "142731198902280016",
          sjh: "18635956354",
          ty: "1",
          dq: "1",
          sj: "2018-04-04",
          yy: "",
          cz: "潘月"
        },
        {
          id: "384710",
          xm: "刘亚男",
          xb: "男",
          sfz: "142731198902280016",
          sjh: "18635956354",
          ty: "1",
          dq: "1",
          sj: "2018-04-04",
          yy: "",
          cz: "潘月"
        },
        {
          id: "384710",
          xm: "刘亚男",
          xb: "男",
          sfz: "142731198902280016",
          sjh: "18635956354",
          ty: "1",
          dq: "1",
          sj: "2018-04-04",
          yy: "",
          cz: "潘月"
        },
        {
          id: "384710",
          xm: "刘亚男",
          xb: "男",
          sfz: "142731198902280016",
          sjh: "18635956354",
          ty: "1",
          dq: "1",
          sj: "2018-04-04",
          yy: "",
          cz: "潘月"
        },
        {
          id: "384710",
          xm: "刘亚男",
          xb: "男",
          sfz: "142731198902280016",
          sjh: "18635956354",
          ty: "1",
          dq: "1",
          sj: "2018-04-04",
          yy: "",
          cz: "潘月"
        },
        {
          id: "384710",
          xm: "刘亚男",
          xb: "男",
          sfz: "142731198902280016",
          sjh: "18635956354",
          ty: "1",
          dq: "1",
          sj: "2018-04-04",
          yy: "",
          cz: "潘月"
        },
        {
          id: "384710",
          xm: "刘亚男",
          xb: "男",
          sfz: "142731198902280016",
          sjh: "18635956354",
          ty: "1",
          dq: "1",
          sj: "2018-04-04",
          yy: "",
          cz: "潘月"
        },
        {
          id: "384710",
          xm: "刘亚男",
          xb: "男",
          sfz: "142731198902280016",
          sjh: "18635956354",
          ty: "1",
          dq: "1",
          sj: "2018-04-04",
          yy: "",
          cz: "潘月"
        },
        {
          id: "384710",
          xm: "刘亚男",
          xb: "男",
          sfz: "142731198902280016",
          sjh: "18635956354",
          ty: "1",
          dq: "1",
          sj: "2018-04-04",
          yy: "",
          cz: "潘月"
        },
        {
          id: "384710",
          xm: "刘亚男",
          xb: "男",
          sfz: "142731198902280016",
          sjh: "18635956354",
          ty: "1",
          dq: "1",
          sj: "2018-04-04",
          yy: "",
          cz: "潘月"
        },
        {
          id: "384710",
          xm: "刘亚男",
          xb: "男",
          sfz: "142731198902280016",
          sjh: "18635956354",
          ty: "1",
          dq: "1",
          sj: "2018-04-04",
          yy: "",
          cz: "潘月"
        },
        {
          id: "384710",
          xm: "刘亚男",
          xb: "男",
          sfz: "142731198902280016",
          sjh: "18635956354",
          ty: "1",
          dq: "1",
          sj: "2018-04-04",
          yy: "",
          cz: "潘月"
        },
        {
          id: "384710",
          xm: "刘亚男",
          xb: "男",
          sfz: "142731198902280016",
          sjh: "18635956354",
          ty: "1",
          dq: "1",
          sj: "2018-04-04",
          yy: "",
          cz: "潘月"
        },
        {
          id: "384710",
          xm: "刘亚男",
          xb: "男",
          sfz: "142731198902280016",
          sjh: "18635956354",
          ty: "1",
          dq: "1",
          sj: "2018-04-04",
          yy: "",
          cz: "潘月"
        },
        {
          id: "384710",
          xm: "刘亚男",
          xb: "男",
          sfz: "142731198902280016",
          sjh: "18635956354",
          ty: "1",
          dq: "1",
          sj: "2018-04-04",
          yy: "",
          cz: "潘月"
        },
        {
          id: "384710",
          xm: "刘亚男",
          xb: "男",
          sfz: "142731198902280016",
          sjh: "18635956354",
          ty: "1",
          dq: "1",
          sj: "2018-04-04",
          yy: "",
          cz: "潘月"
        },
        {
          id: "384710",
          xm: "刘亚男",
          xb: "男",
          sfz: "142731198902280016",
          sjh: "18635956354",
          ty: "1",
          dq: "1",
          sj: "2018-04-04",
          yy: "",
          cz: "潘月"
        },
        {
          id: "384710",
          xm: "刘亚男",
          xb: "男",
          sfz: "142731198902280016",
          sjh: "18635956354",
          ty: "1",
          dq: "1",
          sj: "2018-04-04",
          yy: "",
          cz: "潘月"
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
    export2Excel() {
      require.ensure([], () => {
        const {
          export_json_to_excel
        } = require("../../../vendor/Export2Excel");
        const tHeader = [
          "序号",
          "姓名",
          "身份证",
          "手机号",
          "时间",
          "状态",
          "结果"
        ];
        const filterVal = [
          "id",
          "realname",
          "idCard",
          "phonenume",
          "applytime",
          "status",
          "result"
        ];
        let list = JSON.parse(JSON.stringify(this.tableData));

        for (var i = 0; i < list.length; i++) {
          console.log(list[i].status);
          list[i].status = list[i].status === 1 ? "完成" : "进行中";
          list[i].result =
            list[i].result === 1
              ? "通过"
              : list[i].result === 2 ? "人工" : "拒绝";
          list[i].applytime = timeFormat(list[i].applytime);
        }
        console.log(list);
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "列表excel");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  }
};
</script>
<style scoped>
</style>

