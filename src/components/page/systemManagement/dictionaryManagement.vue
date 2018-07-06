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
                    <div class="l20">
                        <el-input
                        style="padding:0px 10px 0px 0px"
                          placeholder="请输入关键字"
                          v-model="search.input"
                          clearable>
                        </el-input> 
                    </div>                                  
                    <el-select class="l20" v-model="search.select" placeholder="请选择角色">
                      <el-option
                        v-for="item in parentRole"
                        :key="item.mid"
                        :label="item.mname"
                        :value="item.mid">
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
            @selection-change="handleSelectionChange"
            v-loading="loading"
            id="eleTable"
          >
            <el-table-column
              prop="mid"
              label="序号"
              width="70"
              sortable
              align="center">
            </el-table-column>  
            <el-table-column
              prop="parent"
              label="父菜单名称"
              align="center">
            </el-table-column>  
            <el-table-column
              prop="children"
              label="是否有子菜单"
              align="center">
                  <template slot-scope="scope">
                      <el-tag
                          :type="scope.row.children?'':'danger'"
                      >{{scope.row.children?'有':'无'}}</el-tag>
                  </template>                         
            </el-table-column>  
            <el-table-column
              prop="mname"
              label="菜单名"
              align="center">
            </el-table-column>  
            <el-table-column
              prop="sort"
              label="排列权重"
              align="center">
            </el-table-column>  
            <el-table-column
              prop="createtime"
              label="创建时间"
              align="center">
            </el-table-column>  
            <el-table-column
              prop="createuserName"
              label="创建人"
              align="center">
            </el-table-column>                                                                                        
            <!-- <el-table-column type="expand" label="更多详情" width="80" >
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
                      <el-table-column  prop="overdue.overdueDay" label="逾期天数" align="center" sortable></el-table-column>
                      <el-table-column  prop="overdue.lateFee" label="违约金" align="center" sortable></el-table-column>
                </el-table>
                <el-alert
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
                </el-table>                
              </template>
            </el-table-column>  -->
                <el-table-column prop="cz"  align="center" label="操作"   >
                    <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="success"
                        @click="handleAllocation(scope.$index, scope.row)"
                       >修改菜单</el-button>
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
        <el-dialog
          title="角色修改"
          :visible.sync="dialogVisible1"
          center
          width="30%"
          >

            <el-form :model="roleForm" status-icon  ref="roleForm" label-width="100px"  >
              <el-form-item label="父组件菜单:" prop="parentId" >
                <el-select  v-model="roleForm.parentId" placeholder="父组件菜单:">
                      <el-option
                        v-for="item in parentRole"
                        :key="item.mid"
                        :label="item.mname"
                        :value="item.mid">
                      </el-option>
                </el-select>    
              </el-form-item>           
              <el-form-item label="菜单名:" prop="mname" >
                <el-input type="input"  v-model="roleForm.mname" ></el-input>
              </el-form-item>
              <el-form-item label="权重:" prop="sort" >
                <el-input type="number"  v-model="roleForm.sort" ></el-input>
              </el-form-item>              
              <el-form-item>
                <el-button type="primary" @click="submitForm('roleForm')">提交</el-button>
                <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
                <el-button type="primary" style="margin-left:30px" @click="qx1('roleForm')">取消</el-button>
              </el-form-item>
            </el-form>
        </el-dialog>                                  
    </div>
</template>

<script>
import {
  httpMenulist,
  httpFindFatherMenu,
  httpSaveMenu
} from "../../../service/http";
export default {
  data() {
    return {
      title: "菜单字典管理",
      search: {
        input: "",
        select: ""
      },
      tableData: [],
      loading: true,
      npage: 1,
      pagesize: 10,
      total: 0,
      multipleSelection: [], //全部选中嘛
      parentRole: [],
      dialogVisible1: false,
      roleForm: {}
    };
  },
  methods: {
    _httpFindFatherMenu() {
      let _this = this;
      httpFindFatherMenu()
        .then(res => {
          let data = res.data;
          _this.parentRole = data;
        })
        .catch();
    },
    getData(pageSize, pageNum, parentId, mname) {
      let _this = this;
      httpMenulist(pageSize, pageNum, parentId, mname)
        .then(res => {
          let data = res.data;
          _this.total = data.total;
          _this.tableData = data.rows;
          _this.loading = false;
        })
        .catch();
    },
    handleSearch() {
      this.getData(
        this.pagesize,
        this.npage,
        this.search.select,
        this.search.input
      );
    },
    handleAllocation(index, row) {
      this.dialogVisible1 = true;
      this.roleForm = Object.assign({}, row);
    },
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
        input: "",
        select: ""
      }),
        this.handleSearch();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          httpSaveMenu(
            this.roleForm.parentId,
            this.roleForm.mname,
            this.roleForm.sort,
            this.roleForm.mid
          )
            .then(res => {
              let data = res.data;
              if (data.statu == 200) {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.dialogVisible1 = false;
                this.handleSearch();
              }
            })
            .catch();
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    this.getData(this.pagesize, this.npage);
    this._httpFindFatherMenu();
  }
};
</script>

<style>
</style>
