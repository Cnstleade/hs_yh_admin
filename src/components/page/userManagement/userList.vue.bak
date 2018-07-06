<template>
  <div class="divFlex">
    <template>
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="全部" name="first">
          <el-form class="formBox" :inline="true" size="mini">
            <el-form-item label="用户名">
              <el-input v-model="userName" style="width: 100px"></el-input>

              <role-list v-on:childByRoleUser="childByRoleUser" v-on:handResetBtn="handResetBtn"></role-list>

            </el-form-item>
            <el-form-item>
              <el-button type="success" icon="search" @click="handSearch">搜索</el-button>
              <!--<el-button type="info" icon="search" @click="handReset">重置</el-button>-->
              <el-button type="primary" icon="search" @click="handAdd">新增</el-button>
            </el-form-item>
          </el-form>

          <template>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="uid" label="序号" align="center"></el-table-column>
              <el-table-column prop="username" label="姓名" align="center"></el-table-column>
              <el-table-column label="角色" align="center">
                <template slot-scope="scope">
                  <span v-for="item in scope.row.list" :key="item.rname">
                    {{item.rname}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="职位" align="center">
                <template slot-scope="scope">
                  <span v-for="item in scope.row.list" :key="item.jobTitle">
                    {{item.jobTitle}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="phoneNumber" label="手机号" align="center"></el-table-column>
              <el-table-column prop="createtime" label="创建时间" align="center"></el-table-column>
              <el-table-column prop="createuserName" label="创建人" align="center"></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">
                    编辑
                  </el-button>
                  <el-button size="mini" type="danger" @click="handleStop(scope.$index, scope.row)">
                    停用
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>

        </el-tab-pane>

        <el-tab-pane label="停用" name="second">

          <el-form class="formBox" :inline="true" size="mini">
            <el-form-item label="用户名">
              <el-input v-model="userName"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="info" icon="search" @click="handQuery">查询</el-button>
            </el-form-item>
          </el-form>

          <template>
            <el-table :data="stopTableData" style="width: 100%">
              <el-table-column prop="uid" label="序号" align="center"></el-table-column>
              <el-table-column prop="username" label="姓名" align="center"></el-table-column>
              <el-table-column label="角色" align="center">
                <template slot-scope="scope">
                  <span v-for="item in scope.row.list" :key="item.rname">
                    {{item.rname}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="职位" align="center">
                <template slot-scope="scope">
                  <span v-for="item in scope.row.list" :key="item.jobTitle">
                    {{item.jobTitle}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="phoneNumber" label="手机号" align="center"></el-table-column>
              <el-table-column prop="createtime" label="创建时间" align="center"></el-table-column>
              <el-table-column prop="createuserName" label="创建人" align="center"></el-table-column>
            </el-table>
          </template>

        </el-tab-pane>

        <!--<el-pagination
          style="margin-top: 10px;text-align: right;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>-->
      </el-tabs>
    </template>

    <el-dialog title="用户新增" :visible.sync="modalUserAdd">
      <el-form :model="form" id="addUser">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" auto-complete="off" :label-width="formLabelWidth"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phoneNumber" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">

          <role-list v-on:childByRoleUser="childByRoleUser"></role-list>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modalUserAdd = false">取 消</el-button>
        <el-button type="primary" @click="userAdd">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="用户编辑" :visible.sync="modalUserEdit">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phoneNumber" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">

          <role-list v-on:childByRoleUser="childByRoleUser" :roleData="roleInfo"></role-list>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modalUserEdit = false">取 消</el-button>
        <el-button type="primary" @click="userEdit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import roleList from './roleList';
  import {Message} from "element-ui";

  export default {
    name: "userList",
    components: {
      'role-list': roleList
    },
    data() {
      return {
        currentPage: 1,
        pageSize: 10,
        total: null,
        idx: -1,
        activeName: 'first',
        modalUserAdd: false,
        tableData: [],
        modalUserEdit: false,
        stopTableData: [],
        formLabelWidth: '100px',
        userName: '',
        labelName: '',
        id: '',

        // loading: true, //查询全部时加载层
        // loading1: true, //查询停用时加载层

        roleInfo: {
          roleId: '',
          roleName: '',
          jobTitle: ''
        },

        form: {
          username: '',
          password: '',
          phoneNumber: '',
        }
      }
    },
    methods: {
      /*handleSizeChange(val) {

      },
      handleCurrentChange(val) {

      },*/

      // 监听子组件传过来的值
      childByRoleUser(childValue) {
        this.roleInfo.roleId = childValue.rid;
        this.roleInfo.roleName = childValue.rname;
        this.roleInfo.jobTitle = childValue.jobTitle;
      },

      handResetBtn() {
        this.roleInfo = '';
      },

      // 搜索
      handSearch() {
        this.queryUserList();
      },

      // 新增
      handAdd() {
        this.modalUserAdd = true;
        this.form = {};
      },
      // 提交新增
      userAdd() {
        let postData = this.$qs.stringify({
          username: this.form.username,
          password: this.form.password,
          phoneNumber: this.form.phoneNumber,
          rid: this.roleInfo.roleId
        });
        this.$post("/sys/adduser", postData).then(response => {
          if (response.statu != 200) {
            Message({
              message: response.message,
              center: true
            });
          } else {
            this.modalUserAdd = false;
            Message({
              message: '添加成功',
              center: true
            });
            this.queryUserList();
          }
        });
      },

      // 修改
      handleEdit(index, row) {
        this.id = row.uid;

        this.form.username = row.username;
        this.form.password = row.password;
        this.form.phoneNumber = row.phoneNumber;

        this.roleInfo.roleId = row.list[0].rid;
        this.roleInfo.roleName = row.list[0].rname;
        this.roleInfo.jobTitle = row.list[0].jobTitle;

        this.modalUserEdit = true;
      },

      // 提交修改
      userEdit() {
        let postData = this.$qs.stringify({
          uid: this.id,
          username: this.form.username,
          password: this.form.password,
          phoneNumber: this.form.phoneNumber,
          rid: this.roleInfo.roleId
        });
        this.$post("/sys/updateuser", postData).then(response => {
          if (response.statu = 200) {
            this.modalUserEdit = false;
            Message({
              message: '修改成功',
              center: true
            });
            this.queryUserList();
          } else {
            this.modalUserEdit = false;
            Message({
              message: response,
              center: true
            })
          }
        }).catch(err => {
          this.modalUserEdit = false;
          Message({
            message: err,
            center: true
          })
        });
      },

      // 停用用户
      handleStop(index, row) {
        let postData = this.$qs.stringify({
          uid: row.uid,
          status: 0
        });
        this.$post("/sys/updateuser", postData).then(response => {
          Message({
            message: response,
            center: true
          });
          this.queryUserList();
        }).catch(err => {
          this.modalUserEdit = false;
          Message({
            message: err,
            center: true
          })
        });
      },

      // 查询停用
      handQuery() {
        this.stopUserList();
      },

      // 全部列表
      queryUserList() {
        let data = this.$qs.stringify({
          username: this.userName,
          status: 1, //查询全部时的状态
          rName: this.roleInfo.roleName
        });
        this.$post('/sys/getuserlistbyusername', data).then((res) => {
          // this.loading = false; //查询成功关闭加载层
          this.tableData = res;
          this.total = res.length;
        });
      },

      // 停用列表
      stopUserList() {
        let data = this.$qs.stringify({
          username: this.form.name,
          status: 0
        });
        this.$post('/sys/getuserlistbyusername', data).then((res) => {
          this.stopTableData = res;
        });
      },
    },
    mounted() {

      // 查询全部列表
      this.queryUserList();

      // 查询停用列表
      this.stopUserList();
    }
  }
</script>

<style scoped>
  .inputSize {
    width: 200px;
  }

  #addUser .el-form-item__label {
    width: 100px;
  }
</style>
