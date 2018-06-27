<template>
    <div class="container">
       <el-row>
            <el-alert
              title="APP消息中心"
              :closable="false"
              type="info">
            </el-alert>           
        </el-row> 
        <el-row class="m20">
            <el-col :span="6">
                <el-button-group>
                  <el-button type="success" >全部</el-button>
                  <el-button type="primary">已读</el-button>
                  <el-button type="primary">未读</el-button>
                </el-button-group>                
            </el-col>
            <el-col :span="14" :offset="4" class="col-flex-end">
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
                    <div class="l20">
                        <el-input
                        style="padding:0px 10px 0px 0px"
                          placeholder="请输入关键词"
                          v-model="search.input"
                          clearable>
                        </el-input> 
                    </div>                                
                    <el-button class="l20" style="margin-left:10px" icon="el-icon-search"  type="success" circle></el-button>                   
            </el-col>            
        </el-row>   
        <el-row class="m20">
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column prop="id"   label="ID"   ></el-table-column>
                <el-table-column prop="fj"  label="发件人"></el-table-column>
                <el-table-column prop="sj"  label="收件人" ></el-table-column>
                <el-table-column prop="fcnr"  label="发出内容" width='500' ></el-table-column>
                <el-table-column prop="sjhm"  label="手机号码" ></el-table-column>
                <el-table-column prop="sj"  label="时间" ></el-table-column>
                <el-table-column prop="lx"  label="类型" ></el-table-column>
                <el-table-column prop="sfyd"  label="是否已读" ></el-table-column>
                <el-table-column prop="cz"  label="操作" width="160">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="success"
                        @click="handleShow"
                        >回复</el-button>  
                        <el-button
                        size="mini"
                        type="danger"
                        >删除</el-button>                                               
                    </template>
                </el-table-column>
            </el-table>            
        </el-row>
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
              width="40%"
              title="添加回复信息"
              center
              :visible.sync="showVisible"        
         >
          <el-row>
            <el-col>
              <el-form :ref="addForm" :model="addForm" label-width="100px">
                  <el-form-item label="客户提问">
                    <el-input v-model="addForm.kh"></el-input>
                  </el-form-item> 
                  <el-form-item label="回复信息">
                          <el-input
                            type="textarea"
                            :autosize="{ minRows: 5}"
                            placeholder="请输入内容"
                            v-model="addForm.textarea">
                          </el-input>                            
                  </el-form-item>  
                  <el-form-item>
                    <el-button type="primary" @click="addSubmit">确定</el-button>
                    <el-button @click="addVisible = false">取消</el-button>
                  </el-form-item>                                                      
              </el-form>
            </el-col>
          </el-row>
        </el-dialog>                   
    </div>
</template>

<script>
export default {
  data() {
    return {
      search: {
        time: [],
        input: ""
      },
      tableData: [
        {
          id: "5109",
          fj: "系统",
          sj: "马欢欢",
          fcnr: "请微信搜索 tiqianfu 公众号 进行下载",
          sjhm: "4008829991",
          sj: "2018-04-24 17:23:13",
          lx: "客户消息",
          sfyd: "	已读"
        },
        {
          id: "5109",
          fj: "系统",
          sj: "马欢欢",
          fcnr: "请微信搜索 tiqianfu 公众号 进行下载",
          sjhm: "4008829991",
          sj: "2018-04-24 17:23:13",
          lx: "客户消息",
          sfyd: "	已读"
        },
        {
          id: "5109",
          fj: "系统",
          sj: "马欢欢",
          fcnr: "请微信搜索 tiqianfu 公众号 进行下载",
          sjhm: "4008829991",
          sj: "2018-04-24 17:23:13",
          lx: "客户消息",
          sfyd: "	已读"
        },
        {
          id: "5109",
          fj: "系统",
          sj: "马欢欢",
          fcnr: "请微信搜索 tiqianfu 公众号 进行下载",
          sjhm: "4008829991",
          sj: "2018-04-24 17:23:13",
          lx: "客户消息",
          sfyd: "	已读"
        },
        {
          id: "5109",
          fj: "系统",
          sj: "马欢欢",
          fcnr: "请微信搜索 tiqianfu 公众号 进行下载",
          sjhm: "4008829991",
          sj: "2018-04-24 17:23:13",
          lx: "客户消息",
          sfyd: "	已读"
        }
      ],
      total: 0,
      npage: 1,
      pagesize: 10,
      showVisible: false,
      addForm: {
        kh: "",
        textarea: ""
      }
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.npage = val;
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleShow() {
      this.showVisible = true;
    },
    addSubmit() {}
  }
};
</script>

<style scoped>
</style>
