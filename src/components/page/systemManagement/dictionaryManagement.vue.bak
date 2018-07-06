<template>
  <div class="container">
    <!--<template>-->
      <!--<el-button type="primary" size="mini" @click="append">添加</el-button>-->
    <!--</template>-->
    <template>
      <el-table
        :data="resArry[currentPage-1]"
        border height="650">
        <el-table-column
          prop="mid"
          label="序号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="parent"
          label="父菜单名称"
          align="center">
        </el-table-column>
        <el-table-column
          label="是否有子菜单"
          align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.children != false">
              <span>是</span>
            </template>
            <template v-else>
              <span>否</span>
            </template>
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
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template>
      <el-pagination
        style="margin-top: 10px;text-align: right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </template>


    <el-dialog class="modal-style" title="新增菜单" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="菜单名" :label-width="formLabelWidth">
          <el-input v-model="form.menuName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单ID" :label-width="formLabelWidth">
          <el-input v-model="form.menuId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="请选择父菜单" :label-width="formLabelWidth">
          <el-select :parantList="parantList" v-model="form.region" placeholder="请选择父菜单">
            <el-option
              v-for="(item,index) in parantList"
              :key="index"
              :label="item.mname"
              :value="item.mid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请选择权重" :label-width="formLabelWidth">
          <el-select v-model="form.value" clearable placeholder="请选择权重">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMenu">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog class="modal-style" title="编辑菜单" :visible.sync="modalFormVisible">
      <el-form :model="form">
        <el-form-item label="菜单名" :label-width="formLabelWidth">
          <el-input v-model="form.menuName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单ID" :label-width="formLabelWidth">
          <el-input v-model="form.menuId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="请选择父菜单" :label-width="formLabelWidth">
          <el-select :parantList="parantList" v-model="form.region" placeholder="请选择父菜单">
            <el-option
              v-for="(item,index) in parantList"
              :key="index"
              :label="item.mname"
              :value="item.mid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请选择权重" :label-width="formLabelWidth">
          <el-select v-model="form.value" clearable placeholder="请选择权重">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modalFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editMenu">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "dictionaryManagement",
    data() {
      return {
        dialogFormVisible: false,
        modalFormVisible: false,
        tableData: [],
        form: {
          menuName: '',
          menuId: '',
          region: '',
          value: '',
        },
        formLabelWidth: '120px',
        parantList: [],
        currentPage: 1,
        pageSize: 10,
        total: null,
        resArry: [],
        options: [
          {
            value: 0,
            label: '0'
          }, {
            value: 1,
            label: '1'
          }, {
            value: 2,
            label: '2'
          }, {
            value: 3,
            label: '3'
          }, {
            value: '4',
            label: '4'
          },
          {
            value: 5,
            label: '5'
          }, {
            value: 6,
            label: '6'
          }, {
            value: 7,
            label: '7'
          }, {
            value: 8,
            label: '8'
          }, {
            value: '9',
            label: '9'
          }
        ]
      }
    },
    methods: {
      handleClick(row) {
        this.modalFormVisible = true;
        console.log(row);
        this.form.menuName = row.mname;
        this.form.menuId = row.mid;
        this.form.region = row.parentId;
        this.form.value = row.sort;
      },

      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.sliceArray(this.tableData, this.pageSize);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage = val;
      },

      //查询父菜单
      queryParentList() {
        this.$get("/sys/findFatherMenu").then(response => {
          this.parantList = response;
        })
      },

      //查询菜单列表
      queryMenuDictionaryList() {
        this.$post("/sys/menulist", null).then(response => {
          this.total = response.length;  //总条数
          this.tableData = response;
          this.sliceArray(this.tableData, this.pageSize);
        });
      },

      //列表数据拆分多个数组
      sliceArray(array, size) {
        this.resArry = [];
        for (var x = 0; x < Math.ceil(array.length / size); x++) {
          var start = x * size;
          var end = start + size;
          this.resArry.push(array.slice(start, end));
        }
      },

      // 添加菜单弹出层
      // append() {
      //   this.dialogFormVisible = true;
      //   this.form = {
      //     menuName: '',
      //     menuId: '',
      //     region: '',
      //     value: '',
      //   };
      // },

      // 新增菜单
      addMenu() {
        this.dialogFormVisible = false;
        let params = this.form;
        this.$post("/sys/saveMenu", params).then(response => {
          // console.log(response);
        });
      },

      // 编辑菜单
      editMenu() {
        this.modalFormVisible = false;
        let params = this.form;
        this.$post("/sys/saveMenu", params).then(response => {
          // console.log(response);
        });
      }
    },
    mounted() {
      this.queryMenuDictionaryList();
      this.queryParentList();
    }
  }
</script>

<style scoped>

  .modal-style {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -15vh;
  }
</style>
