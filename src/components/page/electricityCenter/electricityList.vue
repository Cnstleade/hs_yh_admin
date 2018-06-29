<template>
    <div class="container">
        <el-row>
            <el-alert
              title="电销列表"
              :closable="false"
              type="info">
            </el-alert>           
        </el-row>  
        <!-- <el-row class="m20" >
            <el-col   class="col-flex-end">
                    <el-button-group>
                      <el-button type="info" @click="changeExeceedtimeType(0)">重置</el-button>
                      <el-button type="primary" @click="changeExeceedtimeType(1)">M1</el-button>
                      <el-button type="success" @click="changeExeceedtimeType(2)">M2</el-button>
                      <el-button type="warning" @click="changeExeceedtimeType(3)">M3</el-button>
                      <el-button type="danger" @click="changeExeceedtimeType(4)">M3+</el-button>
                    </el-button-group>    
                    <div class="l20">
                        <el-input
                        style="padding:0px 10px 0px 0px"
                          placeholder="请输入手机号码"
                          v-model="search.phoneNumber"
                          clearable>
                        </el-input> 
                    </div>                                  
                    <el-date-picker
                    style="width:340px"
                    class="l20"
                      v-model="search.time"
                      type="daterange"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>                
                    <el-button @click="handleSearch" class="l20" style="margin-left:20px" icon="el-icon-search"  type="success" circle></el-button>                                                                  
            </el-col>             
        </el-row>  -->
        <el-table
            :data="tableData"  
            border  
            style="width: 100%"
            class="m20"
            v-loading="loading"
          >
                      <el-table-column prop="loanOrderId" label="订单ID" align="center" ></el-table-column>
                      <el-table-column prop="companyId" label="机构ID" align="center" ></el-table-column>
                      <el-table-column prop="custUserId" label="用户ID" align="center" ></el-table-column>
                      <el-table-column prop="custUserMobile" label="客户电话" align="center" ></el-table-column>
                      <el-table-column prop="type" label="进入电销类型" align="center" ></el-table-column>
                      <el-table-column prop="companyName" label="机构名" align="center" ></el-table-column>
                      <el-table-column prop="companyName" label="客户姓名" align="center" ></el-table-column>
                      <el-table-column prop="companyName" label="所剩金额" align="center" ></el-table-column>
                    <el-table-column prop="cz"  align="center" label="操作"   >
                        <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="success"
                            @click="handleAllocation(scope.$index, scope.row)"
                           >分配</el-button>
                        </template> 
                    </el-table-column>   
        </el-table>  
        <el-row class="m20" v-if="total>0">
            <el-button type="primary" style="float:left" @click="handelConfigAll" :disabled="multipleSelection.length==0">批量分配</el-button>
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
        <!-- <el-dialog
          title="分配催收员"
          :visible.sync="dialogVisible"
          center
          width="40%"
          >
            <div id="elTag">
              <el-alert
                title="订单号"
                type="info"
                :closable="false">
              </el-alert>               
              <el-tag
                :key="tag"
                v-for="tag in dynamicTags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
                {{tag}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
            </div>
            <el-row class="m20">
              <el-alert
                title="催收员"
                type="info"
                :closable="false">
              </el-alert>   
            </el-row>
            <el-row class="m20 col-flex" >
              <el-select v-model="trevewer" placeholder="请选择催收员">
                <el-option
                  v-for="item in trevewerlist"
                  :key="item.uid"
                  :label="item.username"
                  :value="item.uid">
                </el-option>
              </el-select>  
              <el-button type="primary" style="margin-left:30px" @click="handleConfig">确认</el-button>
              <el-button type="primary" style="margin-left:30px" @click="dialogVisible=false">取消</el-button>
            </el-row>
        </el-dialog>    -->
    </div>
</template>

<script>
import {
  getEleUserList
} from "../../../service/http";
import Timer from "../../../config/timer";
import { timeFormat } from "../../../config/time";
export default {
  name: "credit",
  data() {
    return {
      tableData: [],
      loading: true,
      npage: 1,
      pagesize: 10,
      total: 0,
      dialogVisible: false,
    };
  },
  methods: {
    getData(pageNumber, pageSize) {
      let _this = this;
      getEleUserList(pageNumber, pageSize)
        .then(res => {
          let data = res.data;
          if (data.code === 200) {
            let tableData = data.data.list;
            _this.tableData = tableData;
            _this.total = data.data.total;
          } else {
          }
        })
        .catch();
    },
    handleSearch() {
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
    handleAllocation(index, row) {
    },

    handleConfig() {
      let _this = this;
    },
    filterStauts(value, row) {
      return row.status === value;
    },
  },
  mounted() {
    this.getData(
      this.npage,
      this.pagesize,
    );
  }
};
</script>
<style>
#elTag .el-tag {
  margin-top: 20px;
}
#elTag .el-tag + .el-tag {
  margin-left: 10px;
}
#elTag .button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
#elTag .input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

<style scoped>
</style>
