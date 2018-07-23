import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/admin',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      meta: {
        title: '自述文件'
      },
      children: [{
          path: '/',
          redirect: '/myWorkbench'
        },
        {
          path: '/myWorkbench',
          component: resolve => require(['../components/page/myWorkbench.vue'], resolve),
          meta: {
            title: '我的工作台'
          }
        },
        {
          path: '/receiverlist',
          component: resolve => require(['../components/page/customerManagement/receiverlist.vue'], resolve),
          meta: {
            title: '借贷人列表'
          }
        },
        {
          path: '/orderList',
          component: resolve => require(['../components/page/orderManagement/orderList.vue'], resolve),
          meta: {
            title: '订单列表'
          }
        },
        {
          path: '/bindApproval',
          component: resolve => require(['../components/page/beforeCrbedit/bindApproval.vue'], resolve),
          meta: {
            title: '人工审批绑定'
          }
        },
        {
          path: '/peopleApproval',
          component: resolve => require(['../components/page/beforeCrbedit/peopleApproval.vue'], resolve),
          meta: {
            title: '人工审批'
          }
        },
        {
          path: '/passApproval',
          component: resolve => require(['../components/page/beforeCrbedit/passApproval.vue'], resolve),
          meta: {
            title: '已过审批列表'
          }
        },
        {
          path: '/vetoList',
          component: resolve => require(['../components/page/beforeCrbedit/vetoList.vue'], resolve),
          meta: {
            title: '已否决列表'
          }
        },
        {
          path: '/transactList',
          component: resolve => require(['../components/page/creditManagement/transactList.vue'], resolve),
          meta: {
            title: '办理中的列表'
          }
        },
        {
          path: '/credit',
          component: resolve => require(['../components/page/afterLoan/credit.vue'], resolve),
          meta: {
            title: '放款管理'
          }
        },
        {
          path: '/repayment',
          component: resolve => require(['../components/page/afterLoan/repayment.vue'], resolve),
          meta: {
            title: '还款管理'
          }
        },
        {
          path: '/operation',
          component: resolve => require(['../components/page/afterLoan/operation.vue'], resolve),
          meta: {
            title: '催收操作管理'
          }
        },
        {
          path: '/collection',
          component: resolve => require(['../components/page/afterLoan/collection.vue'], resolve),
          meta: {
            title: '催收管理'
          }
        },
        {
          path: '/conversionRate',
          component: resolve => require(['../components/page/dataStatistics/conversionRate.vue'], resolve),
          meta: {
            title: '用户转化率'
          }
        },
        {
          path: '/auditConversionrate',
          component: resolve => require(['../components/page/dataStatistics/auditConversionrate.vue'], resolve),
          meta: {
            title: '审核转化率'
          }
        },
        {
          // 用户列表
          path: '/userList',
          component: resolve => require(['../components/page/userManagement/userList.vue'], resolve),
          meta: {
            title: '用户列表',
          }
        },
        {
          // 修改密码
          path: '/editPassword',
          component: resolve => require(['../components/page/userManagement/editPassword.vue'], resolve),
          meta: {
            title: '修改密码',
          }
        },
        {
          // 菜单字典管理
          path: '/dictionaryManagement',
          component: resolve => require(['../components/page/systemManagement/dictionaryManagement.vue'], resolve),
          meta: {
            title: '菜单字典管理',
          }
        },
        {
          // 菜单字典管理
          path: '/systemManagement',
          component: resolve => require(['../components/page/systemManagement/systemManagement.vue'], resolve),
          meta: {
            title: '系统参数',
          }
        },        
        {
          // 日志管理
          path: '/logManagement',
          component: resolve => require(['../components/page/systemManagement/logManagement.vue'], resolve),
          meta: {
            title: '日志管理',
          }
        },

        {
          // 系统公告
          path: '/systemAnnouncement',
          component: resolve => require(['../components/page/systemManagement/systemAnnouncement.vue'], resolve),
          meta: {
            title: '系统公告',
          }
        },        
        {
          // 消息管理
          path: '/messageManagement',
          component: resolve => require(['../components/page/systemManagement/messageManagement.vue'], resolve),
          meta: {
            title: '消息管理',
          }
        },
        {
          // 系统开户
          path: '/systemAccount',
          component: resolve => require(['../components/page/systemManagement/systemAccount.vue'], resolve),
          meta: {
            title: '系统开户',
          }
        },
        {
          // 快速贷客户催收
          path: '/rapidCustomerCollection',
          component: resolve => require(['../components/page/debtManagement/rapidCustomerCollection.vue'], resolve),
          meta: {
            title: '快速贷客户催收',
          }
        },
        {
          // 滞纳金管理
          path: '/lateFeeManagement',
          component: resolve => require(['../components/page/debtManagement/lateFeeManagement.vue'], resolve),
          meta: {
            title: '滞纳金管理',
          }
        },
        {
          //停用客户借款列表
          path: '/deactivateCustomerLoanList',
          component: resolve => require(['../components/page/debtManagement/deactivateCustomerLoanList.vue'], resolve),
          meta: {
            title: '停用客户借款列表',
          }
        },
        {
          // 审核逾期统计
          path: '/overdueStatistics',
          component: resolve => require(['../components/page/debtManagement/overdueStatistics.vue'], resolve),
          meta: {
            title: '审核逾期统计',
          }
        },
        {
          // 快速操作面板
          path: '/quickActionPanel',
          component: resolve => require(['../components/page/debtManagement/quickActionPanel.vue'], resolve),
          meta: {
            title: '快速操作面板',
          }
        },

        {
          // 全部客户管理
          path: '/totalCustomerManagement',
          component: resolve => require(['../components/page/recordsCenter/totalCustomerManagement.vue'], resolve),
          meta: {
            title: '全部客户管理',
          }
        },

        {
          // 还款记录管理
          path: '/repaymentRecordManagement',
          component: resolve => require(['../components/page/recordsCenter/repaymentRecordManagement.vue'], resolve),
          meta: {
            title: '还款记录管理',
          }
        },

        {
          // APP消息中心
          path: '/appMessageCenter',
          component: resolve => require(['../components/page/recordsCenter/appMessageCenter.vue'], resolve),
          meta: {
            title: 'APP消息中心',
          }
        },

        {
          // 短信管理
          path: '/smsManagement',
          component: resolve => require(['../components/page/recordsCenter/smsManagement.vue'], resolve),
          meta: {
            title: '短信管理',
          }
        },

        {
          // 快速操作面板
          path: '/lateFees',
          component: resolve => require(['../components/page/recordsCenter/lateFees.vue'], resolve),
          meta: {
            title: '滞纳金账单',
          }
        },

        {
          // 财务状况
          path: '/financialSituation',
          component: resolve => require(['../components/page/recordsCenter/financialSituation.vue'], resolve),
          meta: {
            title: '财务状况',
          }
        },
        {
          // 推广客户列表
          path: '/promotionCustomerList',
          component: resolve => require(['../components/page/operatingCenter/promotionCustomerList.vue'], resolve),
          meta: {
            title: '推广客户列表',
          }
        },
        {
          // 推广情况列表
          path: '/promotionList',
          component: resolve => require(['../components/page/operatingCenter/promotionList.vue'], resolve),
          meta: {
            title: '推广情况列表',
          }
        },
        {
          // 代扣订单维护
          path: '/withholdOrder',
          component: resolve => require(['../components/page/paymentManagement/withholdOrder.vue'], resolve),
          meta: {
            title: '代扣订单维护',
          }
        },
        {
          // 代扣消息管理
          path: '/withholdMessage',
          component: resolve => require(['../components/page/paymentManagement/withholdMessage.vue'], resolve),
          meta: {
            title: '代扣消息管理',
          }
        },
        {
          // 代付日志管理
          path: '/payforLog',
          component: resolve => require(['../components/page/paymentManagement/payforLog.vue'], resolve),
          meta: {
            title: '代付日志管理',
          }
        },
        {
          // 代付消息管理
          path: '/payforMessage',
          component: resolve => require(['../components/page/paymentManagement/payforMessage.vue'], resolve),
          meta: {
            title: '代付消息管理',
          }
        },
        {
          // 线上还款记录
          path: '/onlinePayment',
          component: resolve => require(['../components/page/paymentManagement/onlinePayment.vue'], resolve),
          meta: {
            title: '线上还款记录',
          }
        },
        {
          // 审核客户及钱包
          path: '/reviewCustomersAndWallets',
          component: resolve => require(['../components/page/riskControlCenter/reviewCustomersAndWallets'], resolve),
          meta: {
            title: '审核订单池',
          }
        },
        {
          // 审核中订单
          path: '/orderUnderReview',
          component: resolve => require(['../components/page/riskControlCenter/orderUnderReview'], resolve),
          meta: {
            title: '审核员审核岗',
          }
        },
        {
          // 已审核订单
          path: '/auditedOrder',
          component: resolve => require(['../components/page/riskControlCenter/auditedOrder'], resolve),
          meta: {
            title: '审核经理审核岗',
          }
        },
        {
          // 分期计算器
          path: '/stageCalculator',
          component: resolve => require(['../components/page/riskControlCenter/stageCalculator'], resolve),
          meta: {
            title: '分期计算器',
          },
        },
        {
          //催收统计
          path: '/collectionRecords',
          component: resolve => require(['../components/page/recordsCenter/collectionRecords'], resolve),
          meta: {
            title: '催收记录统计',
          },
        },
        {
          //提现金额
          path: '/withdrawlist',
          component: resolve => require(['../components/page/recordsCenter/withdrawlist'], resolve),
          meta: {
            title: '提现金额',
          },
        },
        // {
        //   // 申请重审客户
        //   path: '/applyForCustomerReview',
        //   component: resolve => require(['../components/page/riskControlCenter/applyForCustomerReview'], resolve),
        //   meta: {
        //     title: '申请重审客户',
        //   }
        // },
        {
          // 高额预约客户
          path: '/highCostBookingCustomers',
          component: resolve => require(['../components/page/riskControlCenter/highCostBookingCustomers'], resolve),
          meta: {
            title: '高额预约客户',
          }
        },
        {
          // 电销列表
          path: '/electricityUserList',
          component: resolve => require(['../components/page/electricityCenter/electricityList'], resolve),
          meta: {
            title: '电销列表',
          }
        },
        {
          // 申请重审客户
          path: '/applyForCustomerReview',
          component: resolve => require(['../components/page/riskControlCenter/applyForCustomerReview'], resolve),
          meta: {
            title: '申请重审客户',
          }
        },
        {
          // 申请重审客户
          path: '/w',
          component: resolve => require(['../components/page/w/w'], resolve),
          meta: {
            title: '申请重审客户',
          }
        },
        {
          // 申请重审客户
          path: '/table',
          component: resolve => require(['../components/page/table/table'], resolve),
          meta: {
            title: 'table',
          }
        },
        {
          // 申请重审客户
          path: '/report',
          component: resolve => require(['../components/page/table/report'], resolve),
          meta: {
            title: 'report',
          }
        }
      ]
    },
    {
      path: '/operation1',
      component: resolve => require(['../components/page/afterLoan/operation.vue'], resolve),
      meta: {
        title: '催收操作管理'
      }
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    },
    {
      path: '/404',
      component: resolve => require(['../components/page/404.vue'], resolve)
    },
    {
      path: '/403',
      component: resolve => require(['../components/page/403.vue'], resolve)
    },
    {
      path: '/appRegister',
      component: resolve => require(['../components/app/register.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
