export default {
    get UserToken(){
        // return localStorage.getItem('token');
        return sessionStorage.getItem('token');
    },
    set UserToken(value){
        // localStorage.setItem('token',value);
        sessionStorage.setItem('token',value);
    },
    get UserPerms(){
        // return localStorage.getItem('perms');
        return sessionStorage.getItem('perms');
    },
    set UserPerms(value){
        // localStorage.setItem('perms',value);
        sessionStorage.setItem('perms',value);
    },
    get UserName(){
        return sessionStorage.getItem('username');
    },
    set UserName(value){
        sessionStorage.setItem('username',value);
    }
}