/**
 * 方法一：比对路由权限，后台返回的权限和前台的权限比对
 * 方法二: 指定返回的默认路由
 */
export function recursionRouter(userRouter = [],allRouter = []){
    var realRouters = [];
    allRouter.forEach((v,i) => {
        userRouter.forEach((item,index) => {
            if (item.name === v.meta.name){
                realRouters.push(v);
            }
        })
    })
    return realRouters;
}