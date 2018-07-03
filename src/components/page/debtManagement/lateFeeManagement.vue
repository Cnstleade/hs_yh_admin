<template>
    <div class="container">
        <el-row>
            <el-alert
              title="滞纳金管理"
              :closable="false"
              type="info">
            </el-alert>           
        </el-row>        
        <el-row class="m20" >
         
            <el-col   class="col-flex-end">
                <el-button type="primary" @click="cz">重置</el-button>
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
                    <el-select class="l20" v-model="search.order" placeholder="催收人员">
                      <el-option
                        v-for="item in search.orders"
                        :key="item.uid"
                        :label="item.username"
                        :value="item.uid">
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
            <el-table-column prop="id" label="序号" align="center" sortable width="120"></el-table-column>
            <el-table-column prop="userName" label="姓名" align="center" ></el-table-column>
            <el-table-column prop="mobile" label="手机号" align="center" width="120"></el-table-column>
            <el-table-column prop="idNo" label="身份证号" align="center"  width="200"></el-table-column>
            <el-table-column prop="borrow_time" label="申请时间" align="center" width="180" sortable>
                <template slot-scope="scope">
                    {{scope.row.borrow_time|dateServer}}
                </template>
            </el-table-column>
            <el-table-column prop="collectorName" label="催收员" align="center" ></el-table-column>
            <el-table-column prop="withdraw_money" label="提现金额" align="center" sortable></el-table-column>
            <el-table-column prop="overdue_day" label="滞纳天数" align="center" sortable></el-table-column>
            <el-table-column prop="late_fee" label="滞纳金额" align="center" sortable></el-table-column>

         
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
import { getOverduemanager, httpGetrevewerlist } from "../../../service/http";
import { timeFormat } from "../../../config/time";
export default {
  name: "credit",
  data() {
    return {
      search: {
        time: null,
        order: "",
        orders: [],
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
    cz() {
      this.search.time = null;
      this.search.order = "";
      this.handleSearch();
    },
    _httpGetrevewerlist() {
      let _this = this;
      httpGetrevewerlist()
        .then(res => {
          let data = res.data;
          _this.search.orders = data;
          // _this.search.orders = [{username:'重置',uid:null}].concat(...data);
        })
        .catch();
    },
    getData(npage, pagesize, begainTimeString, endTimeString, collectorId) {
      this.loading = true;
      let self = this;
      getOverduemanager(
        npage,
        pagesize,
        begainTimeString,
        endTimeString,
        collectorId
      )
        .then(res => {
          let data = res.data;
          let tableData = data.list;
          this.tableData = tableData;
          this.total = data.allsize;
          this.loading = false;
        })
        .catch(err => {});
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
    }
  },
  mounted() {
    this.getData(this.npage, this.pagesize);
    this._httpGetrevewerlist();
  }
};
</script>

<style scoped>
</style>
