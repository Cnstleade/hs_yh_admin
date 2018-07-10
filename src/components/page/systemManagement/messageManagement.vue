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
            <el-col :span="6">
             <el-button type="primary" @click="addRole">添加新角色</el-button>
            </el-col>
            <el-col  :span="18" class="col-flex-end">
                    <!-- <el-button-group>
                      <el-button :type="execeedtimeType==0?'info':''" @click="changeExeceedtimeType(0)">重置</el-button>
                      <el-button :type="execeedtimeType==1?'primary':''" @click="changeExeceedtimeType(1)">M1</el-button>
                      <el-button :type="execeedtimeType==2?'success':''" @click="changeExeceedtimeType(2)">M2</el-button>
                      <el-button :type="execeedtimeType==3?'warning':''" @click="changeExeceedtimeType(3)">M3</el-button>
                      
                    </el-button-group>     -->
                    <el-button  type="primary" @click="reset">重置</el-button>
                    <!-- <div class="l20">
                        <el-input
                        style="padding:0px 10px 0px 0px"
                          placeholder="请输入手机号码"
                          v-model="search.input"
                          clearable>
                        </el-input> 
                    </div>                                   -->
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
            <!-- <el-table-column
              type="selection"
              align="center"
              width="55">
            </el-table-column>         -->
            <el-table-column prop="rid" label="角色id" align="center" width="100"></el-table-column>
            <el-table-column prop="rname" label="角色名字" align="center" width="140"></el-table-column>
            <el-table-column prop="createtime" label="创建时间" align="center" width="220" sortable>
                <template slot-scope="scope">
                    {{scope.row.createtime|dateServer}}
                </template>
            </el-table-column>
            <el-table-column prop="jobTitle" label="备注" align="center" ></el-table-column>
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
                <el-table-column prop="cz"  align="center" label="操作"  width="220" >
                    <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="success"
                        @click="handleRole(scope.$index, scope.row)"
                       >角色修改</el-button>                      
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleAllocation(scope.$index, scope.row)"
                       >菜单修改</el-button>
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
              <el-form-item label="角色名:" prop="rname" >
                <el-input type="input" v-model="roleForm.rname"  ></el-input>
              </el-form-item>
              <el-form-item label="角色备注:" prop="jobTitle" >
                <el-input type="textarea"  v-model="roleForm.jobTitle" ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('roleForm')">提交</el-button>
                <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
                <el-button type="primary" style="margin-left:30px" @click="qx1('roleForm')">取消</el-button>
              </el-form-item>
            </el-form>
        </el-dialog> 
        <el-dialog
          title="角色修改"
          :visible.sync="dialogVisible2"
          center
          width="30%"
          >
              <el-tree
              ref="tree"
              default-expand-all
                :data="treeData"
                show-checkbox
                node-key="mid"
                :default-checked-keys="showCheck"
                :props="defaultProps">
              </el-tree>
              <el-row style="text-align:center" class="m20">
                <el-button type="primary" style="margin-left:30px" @click="getCheckedKeys">修改</el-button>
                <el-button type="primary" style="margin-left:30px" @click="dialogVisible2=false">取消</el-button>    
              </el-row>
        </el-dialog>                                              
    </div>
</template>

<script>
import {
  getRoleList,
  changeRoleList,
  findRoleMenu,
  changeRoleMenu,
  httpSaveRoleMenu,
  httpSaveMenu
} from "../../../service/http";
export default {
  data() {
    return {
      title: "角色管理列表",
      search: {
        input: "",
        time: ""
      },
      tableData: [],
      loading: true,
      npage: 1,
      pagesize: 10,
      total: 0,
      multipleSelection: [], //全部选中嘛
      dialogVisible1: false,
      dialogVisible2: false,
      roleId: null,
      roleForm: {
        rid: "",
        rname: "",
        jobTitle: ""
      },
      defaultProps: {
        children: "list",
        label: "mname"
      },
      treeData: [],
      showCheck: []
    };
  },
  methods: {
    getData() {
      let _this = this;
      getRoleList()
        .then(res => {
          let data = res.data;
          _this.tableData = data;
          _this.loading = false;
        })
        .catch(err => {
          _this.tableData = [];
          _this.loading = false;
        });
    },
    handleSearch() {
      this.getData();
    },
    handleAllocation(index, row) {
      let RoleId = row.rid;
      this.roleId = null;
      this.roleId = RoleId;
      let _this = this;
      findRoleMenu(RoleId)
        .then(res => {
          _this.treeData = null;
          let data = res.data;
          _this.treeData = JSON.parse(JSON.stringify(data));
          _this.dialogVisible2 = true;
          let showCheck = [];
          for (let a = 0; a < _this.treeData.length; a++) {
            if (_this.treeData[a].checked) {
              // showCheck.push(_this.treeData[a].mid);
            }
            if (_this.treeData[a].list && _this.treeData[a].list.length > 0) {
              for (let b = 0; b < _this.treeData[a].list.length; b++) {
                if (_this.treeData[a].list[b].checked) {
                  showCheck.push(_this.treeData[a].list[b].mid);
                }
              }
            }
          }
          _this.showCheck.length = 0;
          _this.showCheck = showCheck;
        })
        .catch();
    },
    handleRole(index, row) {
      this.roleForm = null;
      this.roleForm = Object.assign({}, row);
      this.dialogVisible1 = true;
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
        time: ""
      }),
        this.getData();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleConfig() {},
    quxiao2() {},
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          changeRoleList(
            this.roleForm.rid,
            this.roleForm.rname,
            this.roleForm.jobTitle
          )
            .then(res => {
              let data = res.data;
              if (data.success) {
                this.resetForm(formName);
                setTimeout(() => {
                  this.dialogVisible1 = false;
                }, 20);
                this.$message({
                  message: "修改角色成功",
                  type: "success"
                });
                this.handleSearch();
              } else {
                this.$message.error("修改角色失败");
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
    },
    qx1(formName) {
      this.dialogVisible1 = false;
      this.resetForm(formName);
    },
    getCheckedKeys() {
      let _this = this;
      httpSaveRoleMenu(this.roleId, this.$refs.tree.getCheckedKeys().join(","))
        .then(res => {
          let data = res.data;
          if (data.success) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            _this.dialogVisible2 = false;
          } else {
            this.$message.error("修改失败,请联系管理员");
          }
        })
        .catch(err => {
          this.$message.error("修改失败,请联系管理员");
        });
      // let params = new URLSearchParams();
      // params.append("rid", this.roleId);
      // params.append("mids", JSON.stringify(this.$refs.tree.getCheckedKeys()));
      // this.$axios
      //   .post("/admin/saveRoleMenu", params)
      //   .then(res => {
      //     let data = res.data;
      //     if (data.success) {
      //       this.$message({
      //         message: "修改成功",
      //         type: "success"
      //       });
      //       _this.dialogVisible2 = false;
      //     } else {
      //       this.$message.error("修改失败,请联系管理员");
      //     }
      //   })
      //   .catch(err => {
      //     this.$message.error("修改失败,请联系管理员");
      //   });
      // changeRoleMenu(this.roleId, this.$refs.tree.getCheckedKeys())
      //   .then(res => {
      //     let data = res.data;
      //     if (data.success) {
      //       this.$message({
      //         message: "修改成功",
      //         type: "success"
      //       });
      //       _this.dialogVisible2 = false;
      //     } else {
      //       this.$message.error("修改失败,请联系管理员");
      //     }
      //     console.log(data);
      //   })
      //   .catch(err => {
      //     this.$message.error("修改失败,请联系管理员");
      //   });
    },
    addRole() {
      this.dialogVisible1 = true;
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style>
</style>
