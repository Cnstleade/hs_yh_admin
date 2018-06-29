import axios from 'axios';
var qs = require('qs');

//axios 配置
axios.defaults.timeout = 5000;
//axios.defaults.baseURL = 'http://localhost:8084'; //本地服务器
axios.defaults.baseURL = 'http://47.88.171.117:8084';
// axios.defaults.baseURL = 'http:192.168.43.247:8082';



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
export function getLoanRepaymentFindAll(npage, pagesize, custUserId, loanCollectionId, startDate, endDate) {
  let data = {
    npage,
    pagesize,
    custUserId,
    loanCollectionId,
    startDate,
    endDate
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
export function getPaymentlist(npage, pagesize, begainTimeString, endTimeString, phonenumber, upload) {
  let data = {
    npage,
    pagesize,
    begainTimeString,
    endTimeString,
    phonenumber,
    upload
  };
  return axios({
    url: '/sys/paymentlist',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / admin 贷后管理 操作管理
export function getExec(npage, pagesize, begainTimeString, endTimeString, phonenumber,execeedtimeType,collectionStatus ) {
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
export function getEleUserList(pageNumber, pageSize) {
  let data = {
    pageNumber, pageSize
  };
  return axios({
    url: '/electrical/userInfo',
    method: 'post',
    data: qs.stringify(data)
  })
}
