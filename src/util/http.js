import axios from 'axios';
const URL_GET_USER_INFO = '/json/getUserInfo';

export function getUserInfo(){
    return   axios({
        url: "/user?ID=12345",
        method: "post"
        //     data: formdata,
        //        headers: { 'Content-Type': 'multipart/form-data' },
      })
  }
//credit 风控配置管理 执行器参数修改