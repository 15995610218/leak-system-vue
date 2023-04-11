// /**
//  * 请求方法
//  */
//
// import base from './base';
// import axios from "axios";
// const api={
//     /**
//      * ksleak分页查询数据
//      * @param params当前页码
//      * @returns {Promise<axios.AxiosResponse<any>>}
//      */
//     getleakList(params){
//         return axios.get(base.leakList,{params})
//     }
// }
// export default api;

import axios from "../utils/http";
//导入存储的token
import store from "@/store";

//请求权限码方法
export function fetchPermission(){
    // return axios.get("/api/bocs/user/",store.state.UserToken)
}
//请求登陆认证方法
export function login(username,password){
    return axios.get("/bocs/login?username="+username+"&password="+password)
}
//请求退出登陆
export function logout(){
    return axios.post("/bocs/logout")
}

export function requestLeak(currentPage,sizePage){
    return axios.get("/leak/ksleak?currentPage="+currentPage+"&sizePage="+sizePage)
}

export function requestAddUser(userForm){
    return axios.post("/bocs/adduser",userForm)
}

export function requestDelUser(uids){
    return axios.post("/bocs/deluser",uids)
}

export function requestUpdateUser(modifyUser){
    return axios.post("/bocs/updateuser",modifyUser)
}

//管理员重置密码
export function requestUpdatePassword(modifyPassword){
    return axios.post("/bocs/updatepassword",modifyPassword);
}
//自己修改密码
export function requestRevisePassword(modifyPassword){
    return axios.post("/bocs/revisepassword",modifyPassword);
}

export function requestUser(){
    return axios.get("/bocs/userinfo")
}

export function requestSearch(currentPage,sizePage,inputBugname,inputCVE){
    return axios.get("/leak/ksleaksearch?currentPage="+currentPage+"&sizePage="+sizePage+"&inputBugname="+inputBugname+"&inputCVE="+inputCVE)
}

export function requestDelete(ids){
    return axios.post("/leak/ksleakdelete",ids)
}

export function requestExport(exportDate){
    return axios.download("leak/ksleakexport", exportDate, {responseType:'blob'})
}

export function requestAddLeak(leakDate){
    return axios.post("/leak/ksleakinsert",leakDate)
}

export function requestUploadLeak(leakDate){
    return axios.post("/leak/ksleakimport",leakDate)
}
