<template>
  <div class="container">
    <template>
      <el-row>
        <el-col :span="12">
          <el-button-group>
            <el-button @click="handleAllButton">全部</el-button>
            <el-button @click="handleConfig">已配置</el-button>
            <el-button @click="handleSigned">已签约</el-button>
            <el-button @click="handleSignNo">未签约</el-button>
          </el-button-group>
        </el-col>
        <el-col :span="12" style="text-align: right">
          <el-input placeholder="请输入关键字" style="width: 200px"></el-input>
          <el-button icon="el-icon-search" type="primary" @cleck="searchTable"></el-button>
        </el-col>
      </el-row>
    </template>
    <template>
      <template>
        <el-table class="m20" :data="tableData" border height="600">
          <el-table-column prop="id" label="ID" align="center" width="50"></el-table-column>
          <el-table-column prop="client" label="客户" align="center"></el-table-column>
          <el-table-column prop="goods" label="商品" align="center"></el-table-column>
          <el-table-column prop="price" label="价格" align="center"></el-table-column>
          <el-table-column prop="downPayment" label="首付" align="center"></el-table-column>
          <el-table-column prop="monthlyPayment" label="月供" align="center"></el-table-column>
          <el-table-column prop="stages" label="分期数" align="center"></el-table-column>
          <el-table-column prop="buildTimes" label="生成时间" align="center"></el-table-column>
          <el-table-column prop="bankCard" label="银行卡" align="center" width="200"></el-table-column>
          <el-table-column label="订单状态" align="center">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.orderStatus ===1?'info':(scope.row.orderStatus===2?'success':'danger')">
                {{scope.row.orderStatus ===1?'已配置':(scope.row.orderStatus===2?'已签约':'未签约')}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.orderStatus===1?'success':'info'">
                {{scope.row.orderStatus===1?'启用':'结束'}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="200">
            <template slot-scope="scope">
              <el-button type="success" size="mini" @click="moreInfo(scope.row)">详情</el-button>
              <el-button type="primary" size="mini" @click="configuration(scope.row)">配置</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </template>
    <template>
      <el-pagination
        style="text-align: right;margin-top: 10px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </template>

    <template>
      <template>
        <el-dialog
          title="签约信息"
          :visible.sync="centerDialogVisible"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          width="60%"
          center>
          <el-row>
            <el-col :span="12">
              <label>签约合同号</label>
              <span>1231231232141414124</span>
            </el-col>
            <el-col :span="12">
              <label>纸质合同号</label>
              <span>1232141242142142142</span>
            </el-col>
            <el-col :span="12">
              <label>真实姓名</label>
              <span>张三</span>
            </el-col>
            <el-col :span="12">
              <label>手机号码</label>
              <span>15212127856</span>
            </el-col>
            <el-col :span="12">
              <label>身份证号码</label>
              <span>341225199101019732</span>
            </el-col>
            <el-col :span="12">
              <label>银行卡类型</label>
              <span>个人消费账户</span>
            </el-col>
            <el-col :span="12">
              <label>开户行</label>
              <span>中国银行</span>
            </el-col>
            <el-col :span="12">
              <label>银行卡号</label>
              <span>62284831158462761</span>
            </el-col>
            <el-col :span="12">
              <label>分期商品</label>
              <span>BD201806071354</span>
            </el-col>
            <el-col :span="12">
              <label>价格</label>
              <span>30000</span>
            </el-col>
            <el-col :span="12">
              <label>本金总金额</label>
              <span>30000</span>
            </el-col>
            <el-col :span="12">
              <label>利率</label>
              <span>12%</span>
            </el-col>
            <el-col :span="12">
              <label>期数</label>
              <span>12</span>
            </el-col>
            <el-col :span="12">
              <label>首次还款日期</label>
              <span>2018-07-25</span>
            </el-col>
            <el-col :span="12">
              <label>分期策略</label>
              <span>一次性还清</span>
            </el-col>
            <el-col :span="12">
              <label>状态</label>
              <span>已完成</span>
            </el-col>
            <el-col :span="24">
              <label>客户认证信息</label>
              <template>
                <img src="" alt="">图1
                <img src="" alt="">图2
              </template>
            </el-col>
          </el-row>
        </el-dialog>
      </template>
      <template>
        <el-dialog
          title="配置信息"
          :visible.sync="configurationDialog"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          width="50%"
          center>
          <el-form :label-width="labelWidth">
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名">
                  <el-input class="inputSize"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="预留手机号">
                  <el-input class="inputSize"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="身份证">
                  <el-input class="inputSize"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="到期时间">
                  <el-input class="inputSize"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="开户行">
                  <el-input class="inputSize"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="银行卡号">
                  <el-input class="inputSize"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="产品名称">
                  <el-input class="inputSize"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="产品ID">
                  <el-input class="inputSize"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="投资方">
                  <el-input class="inputSize"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="客户认证信息">
                  <el-input class="inputSize"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="待选图片">
                  <el-input class="inputSize"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button @click="configurationDialog = false">取消</el-button>
              <el-button type="primary" @click="configeSubmit">确定</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

      </template>
    </template>
  </div>
</template>

<script>
  export default {
    name: "withholdOrder",
    data() {
      return {
        labelWidth: '100px',
        currentPage: 1,
        pageSize: 10,
        total: null,
        centerDialogVisible: false,
        configurationDialog: false,
        tableData: [
          {
            id: 1,
            client: '客户A',
            goods: '商品A',
            price: 1200,
            downPayment: 400,
            monthlyPayment: 210,
            stages: 4,
            buildTimes: '2018-06-06',
            bankCard: '6228 4831 5826 7910 378',
            orderStatus: 1,
            state: '启用'
          },
          {
            id: 2,
            client: '客户B',
            goods: '商品B',
            price: 1200,
            downPayment: 400,
            monthlyPayment: 210,
            stages: 4,
            buildTimes: '2018-06-06',
            bankCard: '6228 4831 5826 7910 378',
            orderStatus: 2,
            state: '结束'
          },
          {
            id: 3,
            client: '客户C',
            goods: '商品C',
            price: 1200,
            downPayment: 400,
            monthlyPayment: 210,
            stages: 4,
            buildTimes: '2018-06-06',
            bankCard: '6228 4831 5826 7910 378',
            orderStatus: 3,
            state: '启用'
          }
        ],
      }
    },
    methods: {
      //全部列表
      handleAllButton() {

      },
      //已配置列表
      handleConfig() {

      },
      //已签约列表
      handleSigned() {

      },
      //未签约列表
      handleSignNo() {

      },
      //模糊搜索
      searchTable() {

      },

      handleSizeChange() {
      },
      handleCurrentChange() {
      },

      //详情
      moreInfo() {
        this.centerDialogVisible = true;
      },

      //配置
      configuration() {
        this.configurationDialog = true;
      },

      //配置提交
      configeSubmit(){},

      // 查询代扣订单列表
      queryWithholdOrderList() {

      }
    },
    mounted() {

    }
  }
</script>

<style scoped>
  label{
    font-size: 1rem;
    font-weight: bold;
    width: 140px;
    margin-right: 1rem;
    text-align: right;
    display: inline-block;
  }
  .el-col {
    margin-top: 1rem;
  }
</style>
