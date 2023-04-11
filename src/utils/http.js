/**
 * 封装后台交互方法
 */
import axios from "axios";
import baseUrl from "@/utils/baseURL";
import {Message} from "element-ui";
import store from "@/store";

const http = {}

var instance = axios.create({
    baseURL:baseUrl,
    timeout:5000
})
//请求拦截器
instance.interceptors.request.use(
    (config) => {
        if (store.state.UserToken){
            config.headers.token = store.state.UserToken;
        }
        return config;
    },(error) =>{
        return Promise.reject(error);
    }
)
//响应拦截器
instance.interceptors.response.use(
    response =>{
       return response.data
    },
    err =>{
        if (err && err.response){
            switch (err.response.status){
                case 400:
                    err.message='请求资源错误'
                    break
                case 401:
                    Message.warning({
                        message:'认证失败，请重新登陆'
                    })
                    store.commit('LOGIN_OUT')
                    store.commit('LOGIN_delPERMS')
                    setTimeout(() =>{
                        window.location.reload()
                    },1000)
                    return
                case 403:
                    err.message='拒绝访问'
                    break
                case 404:
                    err.message='请求错误,未找到该资源'
                    break
                case 500:
                    err.message='服务器端错误'
                    break
            }
        }else {
            err.message='连接服务失败'
        }
        Message.error({
            message:err.message
        })
        return Promise.reject(err.response)
    }
)

http.get = function (url,options){
    return new Promise((resolve,reject)=>{
        instance.get(url,options).then(response => {
            if (response.state === 200){
                resolve(response.data)
            }else {
                Message.error({
                    message:response.message
                })
            }
        }).catch(e =>{
            //console.log(e)
        })
    })
}
http.post = function (url,data,options){
    return new Promise((resolve,reject) =>{
        instance.post(url,data,options).then(response =>{
                if (response.state === 200){
                    resolve(response);
                }
                else {

                }
            reject(response);
            }
        )
    }).catch(e=>{
        Message.error(e)
    })
}
http.download = function (url,data,options){
    return new Promise((resolve,reject) =>{
        instance.post(url,data,options).then(response =>{
            if (response){
                resolve(response);
            }else {
                reject("错误操作!");
            }
        })
    }).catch(e=>{
        Message.error(e)
    })

}
export default http

