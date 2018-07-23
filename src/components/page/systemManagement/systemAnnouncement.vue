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
            <el-button  type="primary" @click="handleAdd">新增</el-button>
            <!-- <el-col   class="col-flex-end">

                    <el-button  type="primary" @click="reset">重置</el-button>
                    <div class="l20">
                        <el-input
                        style="padding:0px 10px 0px 0px"
                          placeholder="请输入手机号码"
                          v-model="search.input"
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
            </el-col>              -->
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
              prop="id"
              label="编号"
              align="center"
              width="55">
            </el-table-column>        
            <el-table-column prop="creatime" label="创建时间" align="center" width="140" sortable>
                <template slot-scope="scope">
                    {{scope.row.creatime|dateServer}}
                </template>
            </el-table-column>
            <el-table-column
              prop="title"
              label="标题"
              align="center"
              width="140">
            </el-table-column>               
            <el-table-column prop="status" label="状态" align="center" 
                :filters="[{ value: true, text: '生效中' }, { value: false, text: '失效' }]"
                :filter-method="filterStauts"    width="100"

             >
               <template slot-scope="scope">
                   <el-tag
                   class="chb-tag"
                       :type="scope.row.status?'success':'danger'"
                   >{{scope.row.status?'生效中':'失效'}}</el-tag>
               </template>                         
             </el-table-column>   
            <el-table-column
              prop="content"
              label="内容"
              align="center"
              min-width="400">
               <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.content" placement="top">
                      <span>{{scope.row.content}}</span>
                    </el-tooltip>
               </template>  
            </el-table-column>                        
            <el-table-column prop="cz"  align="center" label="操作"   >
                <template slot-scope="scope">
                <el-button
                    size="mini"
                    type="success"
                    @click="handleChange(scope.$index, scope.row)"
                   >修改</el-button>
                <el-button
                    size="mini"
                    type="danger"
                    :disabled="scope.row.status?false:true"
                    @click="handleDelete(scope.$index, scope.row)"
                   >失效</el-button>                   
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
          title="公告修改"
          :visible.sync="dialogVisible1"
          center
    
          width="30%"
          >

            <el-form :model="sysForm" status-icon  ref="sysForm" label-width="50px"  >
              <el-form-item label="标题:" prop="title" >
                <el-input type="text"   v-model="sysForm.title" disabled ></el-input>
              </el-form-item>
              <el-form-item label="内容:" prop="content" >
                <el-input type="textarea"  v-model="sysForm.content" ></el-input>
              </el-form-item> 
           <el-form-item>  
                <el-button type="primary" @click="onSubmit1">提交</el-button>
                 <!-- <el-button @click="addDomain">新增借款期限</el-button> -->
                <el-button type="primary" style="margin-left:30px" @click="qx1('roleForm')">取消</el-button>
              </el-form-item>
            </el-form>
        </el-dialog>   
      <el-dialog
          title="公告新增"
          :visible.sync="dialogVisible2"
          center
    
          width="30%"
          >

            <el-form :model="newForm" status-icon  ref="newForm" label-width="50px"  >
              <el-form-item label="标题:" prop="title" >
                <el-input type="text"   v-model="newForm.title" ></el-input>
              </el-form-item>
              <el-form-item label="内容:" prop="content" >
                <el-input type="textarea"  v-model="newForm.content" ></el-input>
              </el-form-item> 
           <el-form-item>  
                <el-button type="primary" @click="onSubmit2">提交</el-button>
                 <!-- <el-button @click="addDomain">新增借款期限</el-button> -->
                <el-button type="primary" style="margin-left:30px" @click="qx1('roleForm')">取消</el-button>
              </el-form-item>
            </el-form>
        </el-dialog>                                           
    </div>
</template>

<script>
import {
  httpGetannouncealist,
  httpGetannounceaupdate,
  httpAnnounceadelate,
  httpAnnounceadd
} from "../../../service/http";
export default {
  data() {
    return {
      title: "系统公告",
      search: {
        input: "",
        time: ""
      },
      dialogVisible1: false,
      dialogVisible2: false,
      tableData: [],
      loading: true,
      npage: 1,
      pagesize: 10,
      total: 0,
      multipleSelection: [], //全部选中嘛
      sysForm: {
        id: "",
        title: "",
        content: ""
      },
      newForm: {
        title: "",
        content: ""
      }
    };
  },
  methods: {
    _httpAnnounceadd(title, content) {
      httpAnnounceadd(title, content)
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            this.$message({
              type: "success",
              message: "新增成功!"
            });
            this.dialogVisible2 = false;
            this.getData(this.npage, this.pagesize);
          }
        })
        .catch(err=>{
          console.log(err)
        });
    },
    _httpAnnounceadelate(id) {
      this.$confirm("此操作将永久失效该公告, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(1);
          httpAnnounceadelate(id)
            .then(res => {
              let data  = res.data;
              if (data.code == 200) {
                this.$message({
                  type: "success",
                  message: "修改成功!"
                });
                this.getData(this.npage, this.pagesize);
              }
            })
            .catch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    },
    //公告修改
    _httpGetannounceaupdate(id, title, content) {
      httpGetannounceaupdate(id, title, content)
        .then(res => {
          if (code == 200) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.dialogVisible1 = false;
            this.getData(this.npage, this.pagesize);
          }
        })
        .catch();
    },
    _httpGetannouncealist(npage, pagesize) {
      this.loading = true;
      httpGetannouncealist(npage, pagesize)
        .then(res => {
          let data = res.data;
          this.tableData = data.list;
          this.total = data.allsize;
          this.loading = false;
        })
        .catch();
    },
    getData(npage, pagesize) {
      this._httpGetannouncealist(npage, pagesize);
    },
    handleSearch() {},
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
      this.search = null;
      this.getData();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    filterStauts(value, row) {
      return row.status === value;
    },
    handleChange(index, row) {
      this.sysForm = Object.assign({}, row);
      this.dialogVisible1 = true;
    },
    onSubmit1() {
      this._httpGetannounceaupdate(
        this.sysForm.id,
        this.sysForm.title,
        this.sysForm.content
      );
    },
    onSubmit2() {
      this._httpAnnounceadd(this.newForm.title, this.newForm.content);
    },
    handleDelete(index, row) {
      this._httpAnnounceadelate(row.id);
    },
    handleAdd() {
      this.newForm = Object.assign({}, { title: "", content: "" });
      this.dialogVisible2 = true;
    }
  },
  mounted() {
    this.getData(this.npage, this.pagesize);
  }
};
</script>

<style>
.chb-tag {
  width: 60px;
}
</style>

