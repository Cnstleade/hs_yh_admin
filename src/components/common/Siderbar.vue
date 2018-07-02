<template>
    <div class="sidebar" id="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
                 text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.list">
                    <el-submenu :index="item.nurl" :key="item.nurl">
                        <template slot="title">
                            <i class="iconfont" :class="item.icon"></i><span slot="title">{{ item.mname }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.list" :key="i" :index="subItem.nurl">
                            <i :class="subItem.icon"></i><span slot="title">{{subItem.mname}}</span>
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.nurl" :key="item.nurl">
                        <i class="iconfont" :class="item.icon"></i><span slot="title">{{ item.mname }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from "../../config/bus";
import { httpGetCreditMenuList } from "@/service/http";
export default {
  data() {
    return {
      collapse: false,
      items: []
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  methods: {
    getHttpGetCreditMenuList() {
      let _this = this;
      httpGetCreditMenuList()
        .then(res => {
          let data = res.data;
          _this.items = data;
                      bus.$emit("error", false);
  
        })
        .catch(err => {
          // this.$message.error("请联系管理员或者重新登录");
          _this.items = [
            {
              icon: "icon-gongzuotai",
              nurl: "myWorkbench",
              mname: "我的工作台"
            },
            {
              icon: "icon-yonhu",
              nurl: "customerManagement",
              mname: "客户管理",
              list: [
                {
                  nurl: "receiverlist",
                  mname: "借贷人列表"
                }
              ]
            },
            {
              icon: "icon-dingdan",
              nurl: "orderManagement",
              mname: "订单管理",
              list: [
                {
                  nurl: "orderList",
                  mname: "订单列表"
                }
              ]
            },
            {
              icon: "icon-zuanshi",
              nurl: "beforeCrbedit",
              mname: "贷前管理",
              list: [
                {
                  nurl: "bindApproval",
                  mname: "人工审批绑定"
                },
                {
                  nurl: "peopleApproval",
                  mname: "人工审批"
                },
                {
                  nurl: "passApproval",
                  mname: "已过审批列表"
                },
                {
                  nurl: "vetoList",
                  mname: "已否决列表"
                }
              ]
            },
            {
              icon: "icon-qian",
              nurl: "creditManagement",
              mname: "放款管理",
              list: [
                {
                  nurl: "transactList",
                  mname: "办理中的列表"
                }
              ]
            },
            {
              icon: "icon-zuanshi-copy",
              nurl: "afterLoan",
              mname: "贷后管理",
              list: [
                {
                  nurl: "credit",
                  mname: "贷后列表展示"
                },

                {
                  nurl: "collection",
                  mname: "逾期列表展示"
                },
                {
                  nurl: "repayment",
                  mname: "催收操作管理"
                }
              ]
            },
            {
              icon: "icon-shuju",
              nurl: "dataStatistics",
              mname: "数据统计",
              list: [
                {
                  nurl: "conversionRate",
                  mname: "用户转化率"
                },
                {
                  nurl: "auditConversionrate",
                  mname: "审核转化率"
                }
              ]
            },
            {
              icon: "icon-yonhu",
              nurl: "userManagement",
              mname: "用户管理",
              list: [
                {
                  nurl: "userList",
                  mname: "用户列表"
                },
                {
                  nurl: "editPassword",
                  mname: "密码修改"
                }
              ]
            },
            {
              icon: "icon-xitong",
              nurl: "systemManagement",
              mname: "系统管理",
              list: [
                {
                  nurl: "dictionaryManagement",
                  mname: "菜单字典管理"
                },
                {
                  nurl: "logManagement",
                  mname: "日志管理"
                },
                {
                  nurl: "messageManagement",
                  mname: "消息管理"
                },
                {
                  nurl: "systemAccount",
                  mname: "系统开户"
                }
              ]
            },
            {
              icon: "icon-xitong",
              nurl: "debtManagement",
              mname: "债务管理",
              list: [
                {
                  nurl: "quickActionPanel",
                  mname: "快速操作面板"
                },
                {
                  nurl: "rapidCustomerCollection",
                  mname: "快速贷客户催收"
                },
                {
                  nurl: "lateFeeManagement",
                  mname: "滞纳金管理"
                },
                {
                  nurl: "deactivateCustomerLoanList",
                  mname: "停用客户借款列表"
                },
                {
                  nurl: "overdueStatistics",
                  mname: "审核逾期统计"
                }
              ]
            },
            {
              icon: "icon-xitong",
              nurl: "PaymentManagement",
              mname: "支付管理",
              list: [
                {
                  nurl: "withholdingOrderMaintenance",
                  mname: "代扣订单维护"
                },
                {
                  nurl: "withholdingMessageManagement",
                  mname: "代扣消息管理"
                },
                {
                  nurl: "paymentLogManagement",
                  mname: "代付日志管理"
                },
                {
                  nurl: "escrowMessageManagement",
                  mname: "代付消息管理"
                },
                {
                  nurl: "lineRepaymentRecord",
                  mname: "线上还款记录"
                }
              ]
            },
            {
              icon: "icon-xitong",
              nurl: "operatingCenter",
              mname: "运营中心",
              list: [
                {
                  nurl: "promotionCustomerList",
                  mname: "推广客户列表"
                },
                {
                  nurl: "promotionList",
                  mname: "推广情况列表"
                }
              ]
            },
            {
              icon: "icon-xitong",
              nurl: "recordsCenter",
              mname: "数据中心",
              list: [
                {
                  nurl: "totalCustomerManagement",
                  mname: "全部客户管理"
                },
                {
                  nurl: "repaymentRecordManagement",
                  mname: "还款记录管理"
                },
                {
                  nurl: "appMessageCenter",
                  mname: "APP消息中心"
                },
                {
                  nurl: "smsManagement",
                  mname: "短信管理"
                },
                {
                  nurl: "lateFees",
                  mname: "滞纳金账单"
                },
                {
                  nurl: "financialSituation",
                  mname: "财务状况"
                }
              ]
            },
            {
              icon: "icon-xitong",
              nurl: "riskControlCenter",
              mname: "风控中心",
              list: [
                {
                  nurl: "reviewCustomersAndWallets",
                  mname: "审核客户及钱包"
                },
                {
                  nurl: "orderUnderReview",
                  mname: "审核中订单"
                },
                {
                  nurl: "auditedOrder",
                  mname: "已审核订单"
                },
                {
                  nurl: "stageCalculator",
                  mname: "分期计算器"
                },
                {
                  nurl: "applyForCustomerReview",
                  mname: "申请重审客户"
                },
                {
                  nurl: "highCostBookingCustomers",
                  mname: "高额预约客户"
                }
              ]
            }
          ];
        });
    }
  },
  mounted() {
    this.getHttpGetCreditMenuList();
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
  }
};
</script>
<style>
#sidebar .el-submenu__title,
.el-menu-item {
  font-size: 12px;
  height: 36px;
  line-height: 36px;
}
#sidebar .el-submenu .el-menu-item {
  font-size: 12px;
  height: 36px;
  line-height: 36px;
  padding-left: 20px;
  min-width: 160px;
}
#sidebar .el-upload--text {
  height: 36px;
}
</style>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 50px;
  bottom: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 185px;
}
.sidebar > ul {
  height: 100%;
}

.iconfont {
  margin-right: 5px;
}
</style>

