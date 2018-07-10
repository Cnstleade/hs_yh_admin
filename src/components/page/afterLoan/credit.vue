<template>
    <div class="container">
        <el-row>
            <el-alert
              title="贷后列表展示"
              :closable="false"
              type="info">
            </el-alert>           
        </el-row>        
        <el-row class="m20" >
            <!-- <el-col :span="6">
                <el-button  icon="el-icon-plus" @click="export2Excel">导出excel</el-button>
            </el-col>              -->
            <el-col  style="float:right" :span="12" class="col-flex">
                    <el-date-picker
                    style="width:340px"
                      v-model="search.time"
                      type="daterange"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>                
                    <el-select class="l20" v-model="search.order" placeholder="订单状态">
                      <el-option
                        v-for="item in search.orders"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>                
                    <el-select class="l20" v-model="search.tixian" placeholder="提现状态">
                      <el-option
                        v-for="item in search.tixians"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>                
                    <el-button @click="handleSearch" class="l20" style="margin-left:20px" icon="el-icon-search"  type="success" circle></el-button>                                                                  
            </el-col>
        </el-row> 
        <el-table
            :data="tableData"  
            border  
            ref="multipleTable" 
            tooltip-effect="dark"
            style="width: 100%"
            class="m20"
            v-loading="loading"
          >
            <el-table-column prop="id" label="订单号" align="center" sortable width="120"></el-table-column>
            <el-table-column prop="userName" label="姓名" align="center" ></el-table-column>
            <el-table-column prop="mobile" label="手机号" align="center" width="180"></el-table-column>
            <el-table-column prop="idNo" label="身份证号" align="center"  width="200"></el-table-column>
            <el-table-column prop="applyTime" label="申请时间" align="center" width="180" sortable>
                <template slot-scope="scope">
                    {{scope.row.applyTime|dateServer}}
                </template>
            </el-table-column>
            <el-table-column prop="applyAmt" label="申请金额" align="center" width="110" sortable></el-table-column>
            <el-table-column prop="approveAmt" label="审核金额" align="center" width="110"  sortable></el-table-column>
            <el-table-column prop="status" label="订单状态" align="center" width="110" 
                    :filters="[{ value: 4, text: '借款中' },  { value: 8, text: '完结' }]"
                    :filter-method="filterStatus"
              >
                <template slot-scope="scope">
                    <el-tag
                        :type="scope.row.status===4?'success':scope.row.status===8?'':''"
                    >{{scope.row.status===4?'借款中':scope.row.status===8?'完结':''}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="cash_outType" label="提现状态" align="center" width="132"
                    :filters="[{ value: 0, text: '无提现记录' }, { value: 1, text: '有余额' }, { value: 2, text: '无余额' }]"
                    :filter-method="filterCashOutType"            
             >
                <template slot-scope="scope">
                    <el-tag
                        :type="scope.row.cash_outType===0?'warning':scope.row.cash_outType===1?'info':'danger'"
                    >{{scope.row.cash_outType===0?'无提现记录':scope.row.cash_outType===1?'有余额':'无余额'}}</el-tag>
                </template>                
            </el-table-column>
            <el-table-column type="expand" label="更多详情" width="80" >
              <template slot-scope="props" >
                <el-alert
                  title="提现情况"
                  type="success"
                  :closable="false"
                  center
                  >
                </el-alert>
                <el-table
                  :data="props.row.detail.withdraws?props.row.detail.withdraws:[]"
                  border 
                  style="width: 100%"
                  >
                      <el-table-column prop="id" label="id" align="center" sortable></el-table-column>
                      <el-table-column prop="withdrawMoney" label="提现金额" align="center" sortable></el-table-column>
                      <el-table-column prop="borrowTime" label="提现时间" align="center" sortable>
                        <template slot-scope="scope">
                            {{scope.row.borrowTime|dateServer}}
                        </template>                          
                      </el-table-column>
                      <el-table-column prop="status" label="是否逾期" align="center" 
                         :filters="[{ value: 0, text: '放款中 ' }, { value: 1, text: '放款成功' }, { value: 2, text: '逾期' }, { value: 3, text: '还款成功' }, { value: 4, text: '放款失败' }, { value: 5, text: '还款中' }, { value: 6, text: '还款失败' }]"
                         :filter-method="filterStauts"                      
                      >
                        <template slot-scope="scope">
                            <el-tag
                                :type="scope.row.status===0?'':scope.row.status===1?'success':scope.row.status===2?'danger':scope.row.status===4?'success':scope.row.status===4?'info':scope.row.status===5?'':'warning'"
                            >{{scope.row.status===0?'放款中':scope.row.status===1?'放款成功':scope.row.status===2?'逾期':scope.row.status===3?'还款成功':scope.row.status===4?'放款失败':scope.row.status===5?'还款中':'还款失败'}}</el-tag>
                        </template>                         
                      </el-table-column>
                      <el-table-column prop="overdue.overdueDay" label="逾期天数" align="center" sortable></el-table-column>
                      <el-table-column prop="overdue.lateFee" label="违约金" align="center" sortable></el-table-column>
                </el-table>
                <!-- <el-alert
                  title="催收情况"
                  type="success"
                  :closable="false"
                  center
                  class="m20"
                  >
                </el-alert>                
                <el-table
                  :data="props.row.detail.loanCollectionRecords?props.row.detail.loanCollectionRecords:[]"
                  border 
                  style="width: 100%"
                  >
                      <el-table-column prop="id" label="id" align="center" ></el-table-column>
                      <el-table-column prop="operatorName" label="催收员姓名" align="center" ></el-table-column>
                      <el-table-column prop="remark" label="描述（备注）" align="center" ></el-table-column>
                      <el-table-column prop="result" label="结果" align="center" >
                        <template slot-scope="scope">
                            <el-tag
                                :type="scope.row.status===1?'':scope.row.status===2?'danger':'success'"
                            >{{scope.row.status===1?'成功':scope.row.status===2?'失败':'进行中 '}}</el-tag>
                        </template>                         
                      </el-table-column>
                      <el-table-column prop="type" label="催收方式" align="center" >
                        <template slot-scope="scope">
                            <el-tag
                                :type="scope.row.status===1?'':scope.row.status===2?'danger':'success'"
                            >{{scope.row.status===1?'电话':scope.row.status===2?'短信':'其他 '}}</el-tag>
                        </template>                         
                      </el-table-column>                      
                </el-table>                 -->
              </template>
            </el-table-column>             
        </el-table>  
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
import { getLendlist, httpExeceedtimeapplydetail } from "../../../service/http";
import { timeFormat } from "../../../config/time";
export default {
  name: "credit",
  data() {
    return {
      search: {
        time: null,
        order: "",
        orders: [{ label: "借款中", value: 4 }, { label: "完结", value: 8 }],
        tixian: "",
        tixians: [
          { label: "没有体现", value: 0 },
          { label: "没有完全提现", value: 1 },
          { label: "完全提现", value: 2 }
        ]
      },
      tableData: [],
      loading: true,
      npage: 1,
      pagesize: 10,
      total: 0,
      index: 0
    };
  },
  methods: {
    getData(
      npage,
      pagesize,
      begainTimeString,
      endTimeString,
      orderType,
      cash_outType
    ) {
      this.loading = true;
      let self = this;
      this.index++;
      getLendlist(
        npage,
        pagesize,
        begainTimeString,
        endTimeString,
        orderType,
        cash_outType
      )
        .then(res => {
          let data = res.data;
          let tableData = data.list;

          if (data.list.length == 0 && self.index % 6 !== 0) {
            self.getData(
              npage,
              pagesize,
              begainTimeString,
              endTimeString,
              orderType,
              cash_outType
            );
          } else {
            self.index = 0;
          }
          for (let a = 0; a < data.list.length; a++) {
            httpExeceedtimeapplydetail(data.list[a].id)
              .then(re => {
                tableData[a].detail = re.data;
              })
              .catch();
          }
          this.tableData = tableData;
          this.total = data.allsize;
          this.loading = false;
        })
        .catch(err => {
          _this.tableData = [];
          _this.loading = false;
        });
    },
    handleSearch() {
      console.log(this.search.time);
      if (this.search.time && this.search.time.length) {
        console.log(timeFormat(this.search.time[1], 1));
        this.getData(
          this.npage,
          this.pagesize,
          this.search.time[0] + " 00:00:00",
          timeFormat(this.search.time[1], 1) + " 00:00:00",
          this.search.order ? this.search.order : 0,
          this.search.tixian
        );
      } else {
        this.getData(
          this.npage,
          this.pagesize,
          "",
          "",
          this.search.order ? this.search.order : 0,
          this.search.tixian
        );
      }
    },
    handleCurrentChange(val) {
      this.npage = val;
      this.handleSearch();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.handleSearch();
    },
    filterStatus(value, row) {
      return row.status === value;
    },
    filterCashOutType(value, row) {
      return row.cash_outType === value;
    },
    filterStauts(value, row) {
      return row.status === value;
    },
    //excel导出数据
    export2Excel() {
      require.ensure([], () => {
        const {
          export_json_to_excel
        } = require("../../../vendor/Export2Excel");
        const tHeader = [
          "订单号",
          "姓名",
          "手机号",
          "身份证号",
          "申请时间",
          "申请金额",
          "审核金额",
          "订单状态",
          "提现状态"
        ];
        const filterVal = [
          "id",
          "userName",
          "mobile",
          "idNo",
          "applyTime",
          "applyAmt",
          "approveAmt",
          "status",
          "cash_outType"
        ];
        let list = JSON.parse(JSON.stringify(this.tableData));

        for (var i = 0; i < list.length; i++) {
          list[i].status =
            list[i].status === 4
              ? "借款中"
              : list[i].status === 8 ? "完结" : "";
          list[i].cash_outType =
            list[i].cash_outType === 0
              ? "无提现记录"
              : list[i].cash_outType === 1 ? "有余额" : "无余额";
          list[i].applyTime = timeFormat(list[i].applyTime);
        }
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "贷后列表");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  },
  mounted() {
    this.getData(this.npage, this.pagesize);
  }
};
</script>

<style scoped>
</style>
