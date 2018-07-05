<template>
    <div class="container">
        <el-row>
            <el-alert
              title="催收记录统计"
              :closable="false"
              type="info">
            </el-alert>           
        </el-row>        
        <el-row class="m20" >
            <el-col   class="col-flex-end">
                  <el-date-picker
                    v-model="month"
                    type="month"
                    placeholder="开始月份"
                     value-format="yyyy-MM"
                    >

                  </el-date-picker> 
                  <span style="font-size:14px;line-height:32px;margin:0 10px">至</span>
                  <el-date-picker
                    v-model="preMonth"
                    type="month"
                    value-format="yyyy-MM"
                    placeholder="结束月份">
                </el-date-picker>                                                                       
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
            <el-table-column
                 type="index"
                  align="center"
                 width="50">
            </el-table-column>
            <el-table-column prop="name" label="催收员" align="center"  sortable></el-table-column>
            <el-table-column prop="allOverdueMoney" label="催收本金" align="center"  sortable></el-table-column>
            <el-table-column prop="all_late_fee" label="应催收违约金" align="center" sortable></el-table-column>
            <!-- <el-table-column prop="borrowTime" label="借款时间" align="center" width="180" sortable>
                <template slot-scope="scope">
                    {{scope.row.borrowTime|dateServer}}
                </template>
            </el-table-column> -->
            <el-table-column prop="borrowDay" label="已催收违约金" align="center" sortable >
                <template slot-scope="scope">
                    {{scope.row.collect_money_m1+scope.row.collect_money_m2+scope.row.collect_money_m3+scope.row.collect_money_m4}}
                </template>
            </el-table-column>
            <el-table-column prop="collect_money_m1" label="已收M1" align="center" sortable ></el-table-column>
            <el-table-column prop="collect_money_m2" label="已收M1" align="center"  sortable ></el-table-column>
            <el-table-column prop="collect_money_m3" label="已收M1" align="center"  sortable ></el-table-column>
            <el-table-column prop="collect_money_m4" label="已收M1" align="center"  sortable ></el-table-column>
            <!-- <el-table-column prop="overdue_day" label="逾期天数" align="center" sortable ></el-table-column>
            <el-table-column prop="late_fee" label="逾期金" align="center" sortable ></el-table-column>
            <el-table-column prop="ned_return_money" label="需要还钱数" align="center" sortable ></el-table-column>
                <el-table-column prop="cz"  align="center" label="操作"   >
                    <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="success"
                        @click="handleAllocation(scope.$index, scope.row)"
                       >还款</el-button>
                    </template> 
                </el-table-column>             -->
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
        <el-dialog
          title="线下还款"
          :visible.sync="dialogVisible"
          center
          width="40%"
          >
        </el-dialog>                  
    </div>
</template>

<script>
import axios from "axios";
import { getCollectionCount } from "../../../service/http";
import Timer from "../../../config/timer";
import { timeFormat, getMonth } from "../../../config/time";
export default {
  name: "credit",
  data() {
    return {
      month: "",
      preMonth: "",
      search: {
        time: [],
        order: null,
        orders: [
          { label: "还款中", value: 5 },
          { label: "逾期", value: 6 },
          { label: "完结", value: 7 }
        ],
        tixian: "",
        tixians: [
          { label: "没有体现", value: 0 },
          { label: "没有完全提现", value: 1 },
          { label: "完全提现", value: 2 }
        ],
        phoneNumber: null
      },
      editForm: {
        loanApplyId: 1,
        interestOverdue: 2,
        discountAmt: 3,
        mustPayBackAmt: 4,
        actualPayBackAmt: 5
      },
      fileList2: [],
      tableData: [],
      loading: false,
      npage: 1,
      pagesize: 10,
      total: 0,
      execeedtimeType: 0,
      dialogVisible: false,
      ordersList: [],
      dynamicTags: [], //订单号
      inputVisible: false,
      inputValue: "",
      trevewerlist: [],
      trevewer: null,
      multipleSelection: [],
      index: 0
    };
  },
  methods: {
    getData(begainTimeString, endTimeString) {
      let _this = this;
      this.loading = true;
      getCollectionCount(begainTimeString, endTimeString)
        .then(res => {
          let data = res.data;
          let tableData = data;
          _this.tableData = tableData;
          _this.total = data.allsize;
          _this.loading = false;
        })
        .catch();
    },
    _getMonth(a, b) {
      return getMonth(a, b);
    },
    _timeFormat(a, b) {
      return timeFormat(a, b);
    },
    handleSearch() {
      if (this.preMonth && this.preMonth) {
        this.getData(
          this.month + "-01 00:00:00",
          this.preMonth + "-01 00:00:00"
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
    changeExeceedtimeType(i) {
      this.execeedtimeType = i;
      this.handleSearch();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleAllocation(index, row) {},

    filterStauts(value, row) {
      return row.status === value;
    }
  },
  mounted() {
    var a = this._getMonth("s", 0) + " 00:00:00";
    var b = this._timeFormat(new Date(), 1) + "00:00:00";
    this.getData(a, b);
  }
};
</script>


<style scoped>
</style>
