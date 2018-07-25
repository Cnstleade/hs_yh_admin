<template>
    <div class="container">
        <el-row>
            <el-alert
              :title="title"
              :closable="false"
              type="info">
            </el-alert>           
        </el-row>  
        <el-tabs v-model="activeName" type="border-card" class="m20" @tab-click="handleClick" v-loading="lodings">
          <el-tab-pane label="可用客户列表" name="first">
            <el-row class="m20" >
                <el-col   class="col-flex-end">
                        <el-button  type="primary" @click="reset">重置</el-button>
                        <div class="l20">
                            <el-input
                            style="padding:0px 10px 0px 0px"
                              placeholder="请输入用户名"
                              v-model="search.input"
                              clearable>
                            </el-input> 
                        </div>        
                        <el-select class="l20" v-model="search.select" placeholder="请选择角色">
                          <el-option
                            v-for="item in roleList"
                            :key="item.rid"
                            :label="item.jobTitle"
                            :value="item.rname">
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
                style="width: 100%;margin-bottom:40px"
                class="m20"
                @selection-change="handleSelectionChange"
                v-loading="loading"
                id="eleTable"
               
              >
 
                <el-table-column prop="uid" label="序号" align="center" width="100" sortable></el-table-column>      
                <el-table-column prop="username" label="姓名" align="center" width="120"></el-table-column>      
                <el-table-column prop="list[0].rname" label="角色" align="center" ></el-table-column>      
                <el-table-column prop="list[0].jobTitle" label="职位" align="center" ></el-table-column>      
                <el-table-column prop="phoneNumber" label="手机号" align="center" width="180"></el-table-column>      
                <el-table-column prop="createtime" label="创建时间" align="center" width="180">
                </el-table-column>      
                <el-table-column prop="createuserName" label="创建人" align="center" ></el-table-column>      
                <el-table-column prop="cz"  align="center" label="操作"  width="250" >
                    <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="success"
                        @click="handleAllocation(scope.$index, scope.row)"
                       >编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleStop(scope.$index, scope.row)"
                       >停用</el-button>                       

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
          </el-tab-pane>
          <el-tab-pane label="停用客户列表" name="second">
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
                              placeholder="请输入用户名"
                              v-model="search.input"
                              clearable>
                            </el-input> 
                        </div>        
                        <el-select class="l20" v-model="search.select" placeholder="请选择角色">
                          <el-option
                            v-for="item in roleList"
                            :key="item.rid"
                            :label="item.jobTitle"
                            :value="item.rname">
                          </el-option>
                        </el-select>                                                    
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
                style="width: 100%;margin-bottom:40px"
                class="m20"
                @selection-change="handleSelectionChange"
                v-loading="loading"
                id="eleTable"
              >
                <el-table-column prop="uid" label="序号" align="center" width="100" sortable></el-table-column>      
                <el-table-column prop="username" label="姓名" align="center" ></el-table-column>      
                <el-table-column prop="list[0].rname" label="角色" align="center" ></el-table-column>      
                <el-table-column prop="list[0].jobTitle" label="职位" align="center" ></el-table-column>      
                <el-table-column prop="phoneNumber" label="手机号" align="center" ></el-table-column>      
                <el-table-column prop="createtime" label="创建时间" align="center" >
                </el-table-column>      
                <el-table-column prop="createuserName" label="创建人" align="center" ></el-table-column>      
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
          </el-tab-pane>          
        </el-tabs>        
        <el-dialog
          title="用户编辑"
          :visible.sync="dialogVisible1"
          center
          width="30%"
          >
            <el-form :model="roleForm" status-icon  ref="roleForm" label-width="100px"  >
              <el-form-item label="用户名:" prop="username" >
                <el-input type="input" v-model="roleForm.username"  ></el-input>
              </el-form-item>
              <el-form-item label="手机号:" prop="phoneNumber" >
                <el-input type="input" v-model="roleForm.phoneNumber"  ></el-input>
              </el-form-item>
              <el-form-item label="角色:" prop="rname" >
                <el-select  v-model="roleForm.rid" placeholder="请选择角色">
                  <el-option
                    v-for="item in roleList"
                    :key="item.rid"
                    :label="item.jobTitle"
                    :value="item.rid">
                  </el-option>
                </el-select>  
              </el-form-item>                                          
              <el-form-item>
                <el-button type="primary" @click="submitForm('roleForm')">提交</el-button>
                <el-button type="primary" style="margin-left:30px" @click="qx1('roleForm')">取消</el-button>
              </el-form-item>
            </el-form>
        </el-dialog>                              
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  httpGetuserlistbyusername,
  httpGetRole,
  httpUpdateuser
} from "../../../service/http";
export default {
  data() {
    return {
      title: "用户列表",
      search: {
        input: "",
        select: ""
      },
      lodings: false,
      tableData: [],
      loading: true,
      npage: 1,
      pagesize: 10,
      total: 0,
      multipleSelection: [], //全部选中嘛
      activeName: "first",
      roleList: [],
      dialogVisible1: false,
      roleForm: {
        uid: "",
        username: "",
        phoneNumber: "",
        status: "",
        rid: ""
      }
    };
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      "loginId"
      // ...
    ])
  },
  methods: {
    _httpGetRole() {
      httpGetRole()
        .then(res => {
          let data = res.data;
          this.roleList = data;
        })
        .catch();
    },
    getData(username, status, rName) {
      let _this = this;
      httpGetuserlistbyusername(username, status, rName)
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
      this.getData(
        this.search.input,
        this.activeName == "first" ? 1 : 0,
        this.search.select
      );
    },
    handleAllocation(index, row) {
      this.roleForm = {
        uid: "",
        username: "",
        phoneNumber: "",
        status: "",
        rid: ""
      };
      this.roleForm = {
        uid: row.uid,
        username: row.username,
        phoneNumber: row.phoneNumber,
        status: "",
        rid: row.list[0] ? row.list[0].rid : ""
      };
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
        select: ""
      }),
        this.handleSearch();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClick(tab, event) {
      this.lodings = true;
      this.handleSearch();
      setTimeout(() => {
        this.lodings = false;
      }, 500);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          httpUpdateuser(
            this.loginId,
            this.roleForm.uid,
            this.roleForm.username,
            this.roleForm.phoneNumber,
            "",
            this.roleForm.rid
          )
            .then(res => {
              let data = res.data;
              if (data.statu == 200) {
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
                this.$message.error(data.message);
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
    handleStop(index, row) {
      this.roleForm = {
        uid: "",
        username: "",
        phoneNumber: "",
        status: "",
        rid: ""
      };
      this.roleForm = {
        uid: row.uid,
        username: row.username,
        phoneNumber: row.phoneNumber,
        status: "",
        rid: row.list[0] ? row.list[0].rid : ""
      };
      this.$confirm("此操作将永久停用该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          httpUpdateuser(
            this.loginId,
            this.roleForm.uid,
            this.roleForm.username,
            this.roleForm.phoneNumber,
            0,
            this.roleForm.rid
          )
            .then(res => {
              let data = res.data;
              if (data.statu == 200) {
                this.$message({
                  type: "success",
                  message: "停用成功!"
                });
              } else {
                this.$message.error(data.message);
              }
            })
            .catch(err => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    this.getData("", 1, "");
    this._httpGetRole();
  }
};
</script>

<style>
</style>
