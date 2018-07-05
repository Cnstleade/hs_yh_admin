<template>
  <!--时间格式化|dateServer-->
  <div class="container">
    <template>
      <el-row>
        <el-col :span="24">
          <el-date-picker
            v-model="dateTime"
            type="daterange"
            @blur="chooseTime"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp">
          </el-date-picker>
          <el-button icon="el-icon-search" type="primary" @click="searchTable" style="margin-left: 10px;"></el-button>
          <el-button icon="el-icon-plus" type="success" @click="addRole"></el-button>
        </el-col>
      </el-row>
    </template>
    <template>
      <el-table class="m20"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="characterList"
                border height="600">
        <el-table-column prop="rid" label="角色ID" align="center"></el-table-column>
        <el-table-column prop="rname" label="角色名称" align="center"></el-table-column>
        <el-table-column prop="createtime" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="jobTitle" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="warning" size="mini" @click="handleEditRole(scope.$index, scope.row)">角色修改</el-button>
            <el-button type="primary" size="mini" @click="handleEditMenu(scope.$index, scope.row)">菜单修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!--<template>
      <el-pagination
        style="margin-top: 10px;text-align: right;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </template>-->


    <!--新增角色-->
    <template>
      <el-dialog
        title="新增角色"
        :visible.sync="addRoleModal"
        width="20%">
        <el-form :label-position="labelPosition" label-width="80px" :model="formAddRole">
          <el-form-item label="名称">
            <el-input v-model="formAddRole.name"></el-input>
          </el-form-item>
          <el-form-item label="职位名称">
            <el-input v-model="formAddRole.jobName"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addRoleInfo">确 定</el-button>
        </span>
      </el-dialog>
    </template>

    <!--修改角色-->
    <template>
      <el-dialog
        title="修改角色"
        :visible.sync="EditRoleModal"
        width="20%">
        <el-form :label-position="labelPosition" label-width="80px" :model="formEditRole">
          <el-form-item label="名称">
            <el-input v-model="formEditRole.name"></el-input>
          </el-form-item>
          <el-form-item label="职位名称">
            <el-input v-model="formEditRole.jobName"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="EditRoleModal = false">取 消</el-button>
          <el-button type="primary" @click="EditRoleInfo">确 定</el-button>
        </span>
      </el-dialog>
    </template>

    <!--修改角色菜单-->
    <template>
      <el-dialog
        title="修改角色菜单"
        :visible.sync="EditRoleMenuModal"
        width="30%">
        <tree-view :menuData="menuList"></tree-view>
        <span slot="footer" class="dialog-footer">
          <el-button @click="EditRoleMenuModal = false">取 消</el-button>
          <el-button type="primary" @click="EditRoleMenuInfo">确 定</el-button>
        </span>
      </el-dialog>
    </template>
  </div>
</template>

<script>
  import {timeFormat} from "../../../config/time";
  import {Message} from "element-ui";
  import {config} from "../../../util/config";
  import treeView from "./treeView"

  export default {
    data() {
      return {
        dateTime: [],                 // 选中时间
        startTime: '',                // 开始时间
        endTime: '',                  // 结束时间
        loading: true,

        addRoleModal: false,
        EditRoleModal: false,
        EditRoleMenuModal: false,
        labelPosition: 'right',

        currentPage: 1,
        pageSize: 10,
        total: null,
        characterList: [],            // 角色列表
        menuList: [],                 // 菜单列表
        menuIdList: [],               // 选中菜单id列表
        defaultChecked: [],           // 默认选中的菜单
        formAddRole: {
          name: '',                   // 新增角色名称
          jobName: ''                 // 新增角色职位
        },
        editRoleId: '',
        editMenuId: '',
        formEditRole: {
          name: '',                   // 修改角色名称
          jobName: ''                 // 修改角色职位
        },
        defaultProps: {
          children: 'list',
          label: 'mname'
        },
      };
    },

    components: {
      'tree-view': treeView
    },

    // 监听
    watch: {},

    // 计算
    computed: {},

    // 方法
    methods: {

      // 查询全部订单
      queryRoleList() {
        let postDate = {
          startDate: this.startTime,
          EndDate: this.endTime,
        };
        $.ajax({
          type: "POST",
          url: config.baseURL + "/admin/rolelist",
          data: postDate,
          success: data => {
            this.characterList = data;
            this.loading = false;
          },
          error: err => {
            console.log(err);
          }
        });
      },

      // 搜索
      searchTable() {
        this.queryRoleList();
      },

      // 选择时间
      chooseTime() {
        this.startTime = this.getMyDate(this.dateTime[0]);
        this.endTime = this.getMyDate(this.dateTime[1]);
      },

      // 表格时间转换
      dateFormat: function (row, column) {
        let date = row[column.property];
        if (date == undefined) {
          return "";
        }
        let dateTime = new Date(date),
          y = dateTime.getFullYear(),
          m = dateTime.getMonth() + 1,
          d = dateTime.getDate(),
          h = dateTime.getHours(),
          i = dateTime.getMinutes(),
          s = dateTime.getSeconds();
        return (
          y +
          "/" +
          this.getzf(m) +
          "/" +
          this.getzf(d) +
          " " +
          this.getzf(h) +
          ":" +
          this.getzf(i) +
          ":" +
          this.getzf(s)
        );
      },

      getMyDate(str) {
        let oDate = new Date(str),
          oYear = oDate.getFullYear(),
          oMonth = oDate.getMonth() + 1,
          oDay = oDate.getDate(),
          oHour = oDate.getHours(),
          oMin = oDate.getMinutes(),
          oSen = oDate.getSeconds();
        return oYear + "-" + this.getzf(oMonth) + "-" + this.getzf(oDay) + ' ' + this.getzf(oHour) + ':' + this.getzf(oMin) + ':' + this.getzf(oSen); //最后拼接时间

      },

      getzf(num) {
        if (parseInt(num) < 10) {
          num = "0" + num;
        }
        return num;
      },

      // 角色新增
      addRole() {
        this.formAddRole = {};
        this.addRoleModal = true;
      },

      // 新增角色信息
      addRoleInfo() {
        let postData = this.$qs.stringify({
          rname: this.formAddRole.name,
          jobTitle: this.formAddRole.jobName
        });
        this.$post('/admin/addRole', postData)
          .then(res => {
            if (res.success === true) {
              Message({
                message: res.message,
                center: true
              });
              this.addRoleModal = false;
              this.queryRoleList();
            } else {
              this.addRoleModal = false;
              Message({
                message: '新增失败',
                center: true
              })
            }
          })
          .catch(err => {
            Message({
              message: '新增失败',
              center: true
            })
          })
      },

      // 点击修改角色按钮
      handleEditRole(index, row) {
        this.EditRoleModal = true;
        this.editRoleId = row.rid;
        this.formEditRole.name = row.rname;
        this.formEditRole.jobName = row.jobTitle;
      },

      // 修改角色信息
      EditRoleInfo() {
        let postData = this.$qs.stringify({
          rid: this.editRoleId,
          rname: this.formEditRole.name,
          jobTitle: this.formEditRole.jobName
        });
        this.$post('/admin/addRole', postData)
          .then(res => {
            if (res.success === true) {
              Message({
                message: res.message,
                center: true
              });
              this.EditRoleModal = false;
              this.queryRoleList();
            } else {
              this.EditRoleModal = false;
              Message({
                message: '修改失败',
                center: true
              })
            }
          })
          .catch(err => {
            Message({
              message: '修改失败',
              center: true
            })
          })
      },

      // 点击修改菜单按钮
      handleEditMenu(index, row) {
        this.EditRoleMenuModal = true;
        this.editMenuId = row.rid;

        let postData = this.$qs.stringify({
          RoleId: this.editMenuId
        });
        this.$post('/admin/findRoleMenu', postData).then(res => {
          this.menuList = res;
          console.log(res);
        }).catch(err => {
          console.log(err);
        })
      },

      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
      },

      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys([3]);
      },

      // 修改角色菜单
      EditRoleMenuInfo() {

      }

      // 分页插件-数量改变事件
      // handleSizeChange(val) {
      //   this.pageSize = val;
      //   this.queryRoleList(this.currentPage, this.pageSize);
      // },

      // 分页插件-页数改变事件
      // handleCurrentChange(val) {
      //   this.currentPage = val;
      //   this.queryRoleList(this.currentPage, this.pageSize);
      // }
    },
    mounted() {
      // 查询全部列表
      this.queryRoleList();
    }
  };
</script>
<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }
</style>
<style scoped>
</style>
