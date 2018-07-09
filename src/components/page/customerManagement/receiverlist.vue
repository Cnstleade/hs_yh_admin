<template>
    <div class="container">
        <el-row>
            <el-alert
              :title="title"
              :closable="false"
              type="info">
            </el-alert>           
        </el-row>  
        <el-row class="m20" >
            <el-col   class="col-flex-end">
                    <!-- <el-button-group>
                      <el-button :type="execeedtimeType==0?'info':''" @click="changeExeceedtimeType(0)">重置</el-button>
                      <el-button :type="execeedtimeType==1?'primary':''" @click="changeExeceedtimeType(1)">M1</el-button>
                      <el-button :type="execeedtimeType==2?'success':''" @click="changeExeceedtimeType(2)">M2</el-button>
                      <el-button :type="execeedtimeType==3?'warning':''" @click="changeExeceedtimeType(3)">M3</el-button>
                      <el-button :type="execeedtimeType==4?'danger':''" @click="changeExeceedtimeType(4)">M3+</el-button>
                    </el-button-group>     -->
                    <el-button  type="primary" @click="reset">重置</el-button>
                    <el-select class="l20" v-model="search.status" placeholder="渠道">
                      <el-option label="渠道一" value="1"></el-option>
                      <el-option label="渠道二" value="0"></el-option>
                    </el-select>                                        
                    <div class="l20">
                        <el-input
                        style="padding:0px 10px 0px 0px"
                          placeholder="请输入姓名"
                          v-model="search.name"
                          clearable>
                        </el-input> 
                    </div>   
                    <div class="l20">
                        <el-input
                        style="padding:0px 10px 0px 0px"
                          placeholder="请输入手机号码"
                          v-model="search.phone"
                          clearable>
                        </el-input> 
                    </div>   
                    <div class="l20">
                        <el-input
                        style="padding:0px 10px 0px 0px"
                          placeholder="请输入身份证"
                          v-model="search.id"
                          clearable>
                        </el-input> 
                    </div>                                                                          
                    <!-- <el-date-picker
                    style="width:340px"
                    class="l20"
                      v-model="search.time"
                      type="daterange"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>                 -->
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
            @selection-change="handleSelectionChange"
            v-loading="loading"
            id="eleTable"
          >

            <el-table-column prop="id" label="序号" align="center" width="50"></el-table-column>
            <el-table-column prop="realName" label="姓名" align="center"></el-table-column>
            <el-table-column prop="phoneNumber" label="手机号" align="center"></el-table-column>
            <el-table-column prop="idcard" label="证件号" align="center"></el-table-column>
            <el-table-column prop="bankcard" label="银行" align="center"></el-table-column>
            <el-table-column prop="source" label="渠道" align="center">
              <template slot-scope="scope">
                <el-tag :type="scope.row.source==1?'success':''">
                  {{scope.row.source===1?'网页':'安卓'}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="isDel" label="是否黑名单" align="center">
              <template slot-scope="scope">
                <el-tag :type="scope.row.isDel?'danger':''">
                  {{scope.row.isDel?'是':'否'}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center" width="200">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.createTime |dateServer }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="frost(scope.row)">冻结</el-button>
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
import { httpCustUserList } from "../../../service/http";
import { timeFormat } from "../../../config/time";
export default {
  data() {
    return {
      title: "提现金额列表",
      search: {
        name: "",
        phone: "",
        id: "",
        statu: ""
      },
      tableData: [],
      loading: true,
      npage: 1,
      pagesize: 10,
      total: 0,
      withdrawStatus: [
        { label: "放款中", value: 0 },
        { label: "放款成功", value: 1 },
        { label: "逾期", value: 2 },
        { label: "还款成功", value: 3 },
        { label: "放款失败 ", value: 4 },
        { label: "还款中", value: 5 },
        { label: "还款失败", value: 6 }
      ],
      multipleSelection: [] //全部选中嘛
    };
  },
  methods: {
    getData(npage, pagesize, source, realName, phoneNumber, idcard) {
      let _this = this;
      this.loading;
      httpCustUserList(npage, pagesize, source, realName, phoneNumber, idcard)
        .then(res => {
          let data = res.data;
          _this.tableData = data.rows;

          _this.total = data.total;
          _this.loading = false;
        })
        .catch();
    },
    handleSearch() {
      // if (this.search.time && this.search.time.length) {
      //   this.getData(
      //     this.npage,
      //     this.pagesize,
      //     this.search.time[0] + " 00:00:00",
      //     timeFormat(this.search.time[1], 1) + " 00:00:00",
      //     this.search.input,
      //     this.search.withdrawStatu
      //   );
      // } else {
      //   this.getData(
      //     this.npage,
      //     this.pagesize,
      //     "",
      //     "",
      //     this.search.input,
      //     this.search.withdrawStatu
      //   );
      // }
      this.getData(
        this.npage,
        this.pagesize,
        this.search.status,
        this.search.name,
        this.search.phone,
        this.search.id
      );
    },
    handleAllocation(index, row) {},
    handleCurrentChange(val) {
      this.npage = val;
      this.handleSearch();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.handleSearch();
    },
    reset() {
      (this.search = {
        name: "",
        phone: "",
        id: "",
        statu: ""
      }),
        this.getData();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    filterStauts(value, row) {
      return row.status === value;
    },
    frost(data) {
      console.log(data.id);
    }
  },
  mounted() {
    this.getData(this.npage, this.pagesize);
  }
};
</script>

<style>
</style>
