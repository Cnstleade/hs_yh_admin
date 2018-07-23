import axios from 'axios';
var qs = require('qs');

//axios 配置
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;
//axios.defaults.baseURL = 'http://localhost:8084'; //本地服务器
axios.defaults.baseURL = 'http://47.88.171.117:8084';
//axios.defaults.baseURL = 'http://192.168.1.124:8084';
//axios.defaults.baseURL = 'http://192.168.25.138:8084';



// http request 拦截器
// axios.interceptors.request.use(
//     config => {
//         // const token = ('session');
//         config.data = JSON.stringify(config.data);
//         config.headers = {
//             // 'Content-Type': 'application/x-www-form-urlencoded',
//             'Content-Type': 'application/json'
//         };
//         // if (token) {
//         //     config.params = (token)
//         // };
//         return config;
//     },
//     err => {
//         return Promise.reject(err);
//     }
// );
// http response 拦截器
/*axios.interceptors.response.use(
    response => {
        if (response.data.errCode == 2) {
            router.push({
                path: '/login',
                query: {redirect: router.currentRoute.fullPath}
            })
        }
        return response;
    },
    error => {
        return Promise.reject(error.response.data)
    }
);*/


//qxios 封装（GET ,POST, PUT, PATCH）
/*
 * get 请求
 * */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: params
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/*
 * post 请求
 * */
export function post(url, data = {}) {
  return new Promise(((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      }), err => {
        reject(err);
      }
  }))
}

/*
 * put 请求
 * */
export function put(url, data = {}) {
  return new Promise(((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data);
      }), err => {
        reject(err);
      }
  }))
}

/*
 * patch 请求
 * */
export function patch(url, data = {}) {
  return new Promise(((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data);
      }), err => {
        reject(err);
      }
  }))
}

/*
 * 调用时
 * */
// this.$post('XXX',data).then((res)=>{
//     if (res.errorCode == 200) {
//
//     }else {
//
//     }
// });


//credit 风控配置管理 执行器参数修改
export function httpUpdateCreditPara(
  id,
  executePara
) {
  const data = {
    id,
    executePara
  };
  return axios({
    url: "/sys/changpara",
    method: "post",
    data
  });
}

//credit 风控配置管理 执行器激活/停用
export function httpUpdateCreditStatus(
  id,
  status
) {
  const data = {
    id,
    status
  };

  return axios({
    url: "/sys/changstatus",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: data
  });
}

//credit 获取风控菜单
export function httpGetCreditMenuList() {
  return axios({
    url: "/sys/menu",
    method: "get"
  })
}

//credit 风控配置管理 执行器展示（新增 和复贷）
export function httpGetExecutor(npage, pagesize, type) {
  let datas = {
    npage,
    pagesize,
    type
  };
  //console.log(data);
  return axios({
    url: "/sys/getexecutor",
    method: "post",
    data: qs.stringify(datas)
  })
}

//用户列表
export function userList(userName, status) {
  let params = {
    userName,
    status
  };
  return axios({
    url: '/sys/getuserlistbyusername',
    method: 'post',
    data: qs.stringify(params)
  })
}

//后台管理模块 / Admin 手机订单展示
export function getLoanorder(npage, pagesize, userName, mobile, idNo, start, finsh, channel) {
  let data = {
    npage,
    pagesize,
    userName,
    mobile,
    idNo,
    start,
    finsh,
    channel
  };
  return axios({
    url: '/sys/loanorder',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / admin 已否决订单与已过审订单
export function getOverList(npage, pagesize, Overhaul, userName, mobile, idNo, start, finsh, channel) {
  let data = {
    npage,
    pagesize,
    Overhaul,
    userName,
    mobile,
    idNo,
    start,
    finsh,
    channel,
  };
  return axios({
    url: '/sys/getOverList',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / Admin 数据统计下的用户转化率
export function getUserConversionByDate(startDate, endDate, type = 1) {
  let data = {
    startDate,
    endDate,
    type
  };
  return axios({
    url: '/stat/userConversion',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / Admin 数据统计下的用户转化率
export function getUserConversionByMonth(startDate, endDate, type = 0) {
  let data = {
    startDate,
    endDate,
    type
  };
  return axios({
    url: '/stat/userConversion',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / Admin 数据统计下的用户转化率
export function getApplyConversion(startDate, endDate, type = 1) {
  let data = {
    startDate,
    endDate,
    type
  };
  return axios({
    url: '/stat/applyConversion',
    method: 'post',
    data: qs.stringify(data)
  })
}


//后台管理模块 / admin 贷后管理 贷后订单列表展示
export function getLendlist(npage, pagesize, begainTimeString, endTimeString, orderType, cash_outType) {
  let data = {
    npage,
    pagesize,
    begainTimeString,
    endTimeString,
    orderType,
    cash_outType
  };
  return axios({
    url: '/sys/lendlist',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / admin 数据中心下的全部客户列表
export function getCustUserList(npage, pagesize, source, realName, phoneNumber, idcard) {
  let data = {
    npage,
    pagesize,
    source,
    realName,
    phoneNumber,
    idcard
  };
  return axios({
    url: '/custUser/list',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / admin 贷后管理 全部列表
export function getExeceedtimeapplyList(npage, pagesize, begainTimeString, endTimeString, phonenumber, execeedtimeType, distributionStatus, collectorId) {
  let data = {
    npage,
    pagesize,
    begainTimeString,
    endTimeString,
    phonenumber,
    execeedtimeType,
    distributionStatus,
    collectorId
  };
  return axios({
    url: '/sys/execeedtimeapplyList',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / admin 贷后管理 逾期催收操作列表展示
export function getExeceedtimeapplyListbycollector(npage, pagesize, begainTimeString, endTimeString, phoneNumber, execeedtimeType) {
  let data = {
    npage,
    pagesize,
    begainTimeString,
    endTimeString,
    phoneNumber,
    execeedtimeType
  };
  return axios({
    url: '/sys/execeedtimeapplyListbycollector',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / admin 贷后管理 逾期列表展示 下拉点击查看详细信息
export function httpExeceedtimeapplydetail(id) {
  return axios({
    url: "/sys/execeedtimeapplydetail",
    method: "get",
    params: {
      'id': id
    }
  })
}


//后台管理模块 / admin 贷后管理 逾期列表分配 展示催收员
export function httpGetrevewerlist() {
  return axios({
    url: "/sys/getreviewerlist",
    method: "get",
  })
}

//后台管理模块 / admin 数据中心 还款记录管理
export function getLoanRepaymentFindAll(npage, pagesize, custUserId, loanCollectionId, startDate, endDate, custname) {
  let data = {
    npage,
    pagesize,
    custUserId,
    loanCollectionId,
    startDate,
    endDate,
    custname
  };
  return axios({
    url: '/loanRepayment/findAll',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / admin 贷后管理 逾期列表分配
export function execeedtimeDistribute(ids, id) {
  let data = {
    ids,
    id
  };
  return axios({
    url: '/sys/execeedtime_distribute',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / admin 贷后管理 线下还款列表展示
export function getPaymentlist(npage, pagesize, begainTimeString, endTimeString, phonenumber, repaymentStatus) {
  let data = {
    npage,
    pagesize,
    begainTimeString,
    endTimeString,
    phonenumber,
    repaymentStatus
  };
  return axios({
    url: '/sys/paymentlist',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / admin 贷后管理 操作管理
export function getExec(npage, pagesize, begainTimeString, endTimeString, phonenumber, execeedtimeType, collectionStatus) {
  let data = {
    npage,
    pagesize,
    begainTimeString,
    endTimeString,
    phonenumber,
    execeedtimeType,
    collectionStatus
  };
  return axios({
    url: '/sys/execeedtimeapplyListbycollector',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / admin 贷后管理 线下还款 还款操作模态框展示
export function postOfflinePayment(loanApplyId, interestOverdue, discountAmt, mustPayBackAmt, actualPayBackAmt) {
  let data = {
    loanApplyId,
    interestOverdue,
    discountAmt,
    mustPayBackAmt,
    actualPayBackAmt
  };
  return axios({
    url: '/sys/offlinepayment',
    method: 'post',
    data: qs.stringify(data)
  })
}




//后台管理模块 / admin 运营中心 客户推广列表
export function httpGetPromoters(pageNumber, pageSize, keywords) {
  let data = {
    pageNumber,
    pageSize,
    keywords
  };
  return axios({
    url: '/promoter/promoters',
    method: 'post',
    data: qs.stringify(data)
  })
}


//后台管理模块 / admin 运营中心 客户详细信息
export function httpGetUserDetail(custUserId) {
  let data = {
    custUserId
  };
  return axios({
    url: '/promoter/userDetail',
    method: 'post',
    data: qs.stringify(data)
  })
}


//后台管理模块 / admin 运营中心 客户详细信息
export function htt() {
  let data = {
    username: '21313',
    password: '12312'
  };
  return axios({
    url: '/sys/login',
    method: 'post',
    data: qs.stringify(data)
  })
}


//后台管理模块 /admin 订单管理 订单列表
export function getLoanorders(npage, pagesize, begainTimeString, endTimeString, phonenumber) {
  let data = {
    npage,
    pagesize,
    begainTimeString,
    endTimeString,
    phonenumber
  };
  return axios({
    url: '/sys/loanorderList',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 /admin 贷后管理 重新分配催收员
export function getExeceedtimeapplyListbycollectorR(userId, id) {
  let data = {
    userId,
    id
  };
  return axios({
    url: '/sys/execeedtime_distributeafresh',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / admin 贷后管理 逾期催收操作列表 添加催收记录
export function getAddcollectdetail(id, detail, result) {
  let data = {
    id,
    detail,
    result
  };
  return axios({
    url: '/sys/addcollectdetail',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 /admin 电销中心 电销列表
export function getEleUserList(pageNumber, pageSize, startDate, endDate, keywords) {
  let data = {
    pageNumber,
    pageSize,
    startDate,
    endDate,
    keywords
  };
  return axios({
    url: '/electrical/userInfo',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 /adMin 电销回访
export function getEleSalesmanRecall(userName, userMobile, salesmanId, loanApplyId, loanOrderId, recallType, remark, recallResult, type, money, userId) {
  let data = {
    userName,
    userMobile,
    salesmanId,
    loanApplyId,
    loanOrderId,
    recallType,
    remark,
    recallResult,
    type,
    money,
    userId
  };
  return axios({
    url: '/electrical/salesmanRecall',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / admin 分配电销人员 查询电销员
export function getEleCompanyId(companyId) {
  let data = {
    companyId
  };
  return axios({
    url: '/sys/userByCompanyId',
    method: 'post',
    data: qs.stringify(data)
  })
}



//后台管理模块 / admin 数据中心 app消息
export function getAppOption(npage, pagesize, custUserName, startDate, endDate) {
  let data = {

    npage,
    pagesize,
    custUserName,
    startDate,
    endDate
  };
  return axios({
    url: '/app/findCustUserOpinion',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / admin 我的工作台 系统数据大盘
export function getPlatform(begainTimeString, endTimeString) {
  let data = {
    begainTimeString,
    endTimeString
  };
  return axios({
    url: '/sys/platform',
    method: 'post',
    data: qs.stringify(data)
  })
}


//后台管理模块 / admin 数据统计 滞纳金管理
export function getOverduemanager(npage, pagesize, begainTimeString, endTimeString, collectorId) {
  let data = {
    npage,
    pagesize,
    begainTimeString,
    endTimeString,
    collectorId
  };
  return axios({
    url: '/sys/Overduemanager',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 /admin 电销中心 新增电销员
export function getSalesmanId(salesmanId, custUserId, loanOrderId, loanApplyId, custUserName, salesmanName) {
  let data = {
    salesmanId,
    custUserId,
    loanOrderId,
    loanApplyId,
    custUserName,
    salesmanName
  };
  return axios({
    url: '/electrical/salesmanCustUser',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块  admin 数据中心 app消息回复
export function getSavrUserReply(custUserId, custUserOpinionId, replyContent) {
  let data = {
    custUserId,
    custUserOpinionId,
    replyContent
  };
  return axios({
    url: '/app/saveUserReply',
    method: 'post',
    data: qs.stringify(data)
  })
}


//后台管理模块 admin 运营中心 推广情况统计
export function getPromoterList(npage, pagesize) {
  let data = {
    npage,
    pagesize
  };
  return axios({
    url: '/promoter/list',
    method: 'post',
    data: qs.stringify(data)
  })
}

// / admin 电销中心 查询电销回访详情
export function getReplies(custUserId) {
  let data = {
    custUserId,
  };
  return axios({
    url: '/electrical/recalls',
    method: 'post',
    data: qs.stringify(data)
  })
}

//admin 电销中心 查询已分配的电销员
export function getSaleman(custUserId) {
  let data = {
    custUserId
  };
  return axios({
    url: '/electrical/salesman',
    method: 'post',
    data: qs.stringify(data)
  })
}

//admin 电销中心 查询已分配的电销员
export function getCollectionCount(begainTimeString, endTimeString) {
  let data = {
    begainTimeString,
    endTimeString
  };
  return axios({
    url: '/sys/collectioncount',
    method: 'post',
    data: qs.stringify(data)
  })
}

//admin 电销中心 查询已分配的电销员
export function getSmsrecordlist(begainTimeString, endTimeString, npage, pagesize, phonenumber) {
  let data = {
    begainTimeString,
    endTimeString,
    npage,
    pagesize,
    phonenumber
  };
  return axios({
    url: '/sys/smsrecordlist',
    method: 'post',
    data: qs.stringify(data)
  })
}



//admin 数据中心 全部客户管理 客户信息列表
export function getCustomerPage(CustUserId) {
  let data = {
    CustUserId
  };
  return axios({
    url: '/custUser/getCustomerPage',
    method: 'post',
    data: qs.stringify(data)
  })
}

//admin 数据中心 全部客户管理 客户信息列表
export function deleteMessage(id) {
  let data = {
    id
  };
  return axios({
    url: '/app/deleteMessage',
    method: 'post',
    data: qs.stringify(data)
  })
}


//h5  注册
export function getH5Register(url, moblie, PromotionCode, PromotionMoblie) {
  let data = {
    url,
    moblie,
    PromotionCode,
    PromotionMoblie
  };
  return axios({
    url: '/promoter/registered',
    method: 'post',
    data: qs.stringify(data)
  })
}

//返回值是验证码  比较一下
export function getH5Sms(moblie) {
  let data = {
    moblie
  };
  return axios({
    url: '/promoter/getVerificationCode',
    method: 'post',
    data: qs.stringify(data)
  })
}


//返回值是验证码  比较一下
export function getOfflinePaymentapplydetail(withdrawId) {
  let data = {
    withdrawId
  };
  return axios({
    url: '/sys/offlinePaymentapplydetail',
    method: 'post',
    data: qs.stringify(data)
  })
}

//返回值是验证码  比较一下
export function getOfflinePaymentapplyUpdata(realMoney, urlRemark, withdrawId, remark) {
  let data = {
    realMoney,
    urlRemark,
    withdrawId,
    remark
  };
  return axios({
    url: '/sys/offlinePaymentapplyupdate',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / 角色展示
export function getRoleList(startDate, EndDate) {
  let data = {
    startDate,
    EndDate
  };
  return axios({
    url: '/admin/rolelist',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / 角色展示 添加或修改角色·
export function changeRoleList(rid, rname, jobTitle) {
  let data = {
    rid,
    rname,
    jobTitle
  };
  return axios({
    url: '/admin/addRole',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / 角色菜单的查找
export function findRoleMenu(RoleId) {
  let data = {
    RoleId
  };
  return axios({
    url: '/admin/findRoleMenu',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / 修改角色菜单
export function changeRoleMenu(rid, mids) {
  let data = {
    rid,
    mids
  };
  return axios({
    url: '/admin/saveRoleMenu',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / Admin 用户管理下面的用户列表
export function httpGetuserlistbyusername(username, status, rName) {
  let data = {
    username,
    status,
    rName
  };
  return axios({
    url: '/sys/getuserlistbyusername',
    method: 'post',
    data: qs.stringify(data)
  })
}

//credit 获取风控菜单
export function httpGetRole() {
  return axios({
    url: "sys/getRole",
    method: "get"
  })
}

//后台管理模块 / Admin 用户列表下的修改用户
export function httpUpdateuser(uid, username, phoneNumber, status, rid) {
  let data = {
    uid,
    username,
    phoneNumber,
    status,
    rid
  };
  return axios({
    url: '/sys/updateuser',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / Admin 密码修改
export function httpUpdatePassWord(newpassword, oldpasswoed) {
  let data = {
    newpassword,
    oldpasswoed
  };
  return axios({
    url: '/sys/updatePassWord',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / 保存菜单栏
export function httpSaveRoleMenu(rid, mids) {
  let data = {
    rid,
    mids
  };
  return axios({
    url: '/admin/saveRoleMenu',
    method: 'post',
    data: qs.stringify(data)
  })
}


//后台管理模块 /  Admin 系统管理 菜单字典管理
export function httpMenulist(pageSize, pageNum, parentId, mname) {
  let data = {
    pageSize,
    pageNum,
    parentId,
    mname
  };
  return axios({
    url: '/sys/menulist',
    method: 'post',
    data: qs.stringify(data)
  })
}

// Admin 获取所有父菜单
export function httpFindFatherMenu() {
  return axios({
    url: "/sys/findFatherMenu",
    method: "get"
  })
}

//后台管理模块 / Admin 风控中心下的审核客户及钱包下的待分配订单
export function httpAllocatedList(npage, pagesize, username, mobile, idNo, startDateString, finshDateString, channel) {
  let data = {
    npage,
    pagesize,
    username,
    mobile,
    idNo,
    startDateString,
    finshDateString,
    channel
  };
  return axios({
    url: '/sys/allocatedList',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / Admin 风控中心下的审核客户及钱包下的待分配订单
export function httpUnderReviewList(npage, pagesize, username, mobile, idNo, startDateString, finshDateString, channel) {
  let data = {
    npage,
    pagesize,
    username,
    mobile,
    idNo,
    startDateString,
    finshDateString,
    channel
  };
  return axios({
    url: '/sys/UnderReviewList',
    method: 'post',
    data: qs.stringify(data)
  })
}
//后台管理模块 / Admin 风控中心下的审核客户及钱包下的待分配订单
export function httpManagerReview(npage, pagesize, username, mobile, idNo, startDateString, finshDateString, channel) {
  let data = {
    npage,
    pagesize,
    username,
    mobile,
    idNo,
    startDateString,
    finshDateString,
    channel
  };
  return axios({
    url: '/sys/ManagerReview',
    method: 'post',
    data: qs.stringify(data)
  })
}
//后台管理模块 / Admin 风控中心下的审核客户及钱包下的待分配订单
export function httpRefuseList(npage, pagesize, username, mobile, idNo, startDateString, finshDateString, channel) {
  let data = {
    npage,
    pagesize,
    username,
    mobile,
    idNo,
    startDateString,
    finshDateString,
    channel
  };
  return axios({
    url: '/sys/RefuseList',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / Admin 风控中心下的审核客户及钱包下的待分配订单
export function httpSaveMenu(parentId, mname, sort, mid) {
  let data = {
    parentId,
    mname,
    sort,
    mid
  };
  return axios({
    url: '/sys/saveMenu',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / admin 数据统计 提现金额列表
export function httpWithdrawlist(npage, pagesize, begainTimeString, endTimeString, phonenumber, withdrawStatus) {
  let data = {
    npage,
    pagesize,
    begainTimeString,
    endTimeString,
    phonenumber,
    withdrawStatus
  };
  return axios({
    url: '/sys/withdrawlist',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / admin 数据统计 提现金额列表
export function httpCustUserList(npage, pagesize, source, realName, phoneNumber, idcard) {
  let data = {
    npage,
    pagesize,
    source,
    realName,
    phoneNumber,
    idcard
  };
  return axios({
    url: '/custUser/list',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / 全部
export function httpLoanapply(npage,
  pagesize,
  userName,
  startDateString,
  finshDateString,
  channel) {
  let data = {
    npage,
    pagesize,
    userName,
    startDateString,
    finshDateString,
    channel
  };
  return axios({
    url: '/sys/loanapply',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / 已通过
export function httpGetOverList(npage,
  pagesize,
  userName,
  startDateString,
  finshDateString,
  channel) {
  let data = {
    npage,
    pagesize,
    userName,
    startDateString,
    finshDateString,
    channel
  };
  return axios({
    url: '/sys/getOverList',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / 未通过
export function httpGetNotApplyOrder(npage,
  pagesize,
  userName,
  startDateString,
  finshDateString,
  channel) {
  let data = {
    npage,
    pagesize,
    userName,
    startDateString,
    finshDateString,
    channel
  };
  return axios({
    url: '/sys/getNotApplyOrder',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / 得到用户信息
export function httpGetCustomterMesage(id) {
  let data = {
    id
  };
  return axios({
    url: '/sys/getCustomterMesage',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / 得到用户信息
export function httpUpdateCuster(id, status = 0) {
  let data = {
    id,
    status
  };
  return axios({
    url: '/custUser/update',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / admin 系统管理 系统参数设置（展示）
export function httpParametershow() {
  return axios({
    url: "/sys/parametershow",
    method: "get",
  })
}

//后台管理模块 / admin 系统管理 系统参数设置（修改）
export function httpUpdateparameter(minMoney, maxMoney, list) {
  let data = {
    chooseMoneyVo: {
      minMoney,
      maxMoney
    },
    list
  };
  return axios({
    headers: {
      'Content-Type': 'application/json'
    },
    url: '/sys/updateparameter',
    method: 'post',
    data: JSON.stringify(data)
  })
}

//后台管理模块 /  admin 系统管理 公告列表展示
export function httpGetannouncealist(npage, pagesize) {
  let data = {
    npage,
    pagesize
  };
  return axios({
    url: '/sys/getannouncealist',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 /  admin 系统管理 公告修改
export function httpGetannounceaupdate(id, title, content) {
  let data = {
    id,
    title,
    content
  };
  return axios({
    url: '/sys/getannounceaupdate',
    method: 'post',
    data: qs.stringify(data)
  })
}


//后台管理模块 / admin 系统管理 公告失效
export function httpAnnounceadelate(id) {
  return axios({
    url: "/sys/announceadelate",
    method: "get",
    params: {
      'id': id
    }
  })
}

//后台管理模块 /  系统管理 公告添加
export function httpAnnounceadd(title, content) {
  let data = {

    title,
    content
  };
  return axios({
    url: '/sys/announceadd',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 /  admin 系统管理 系统利率添加
export function httpParameteradd(rateAll, borrowDay, overdue_rate) {
  let data = {

    rateAll,
    borrowDay,
    overdue_rate

  };
  return axios({
    url: '/sys/parameteradd',
    method: 'post',
    data: qs.stringify(data)
  })
}
