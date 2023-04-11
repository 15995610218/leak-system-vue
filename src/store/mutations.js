export default {
    LOGIN_IN(state,token){
        state.UserToken = token;
    },
    LOGIN_OUT(state){
        state.UserToken = "";
    },
    LOGIN_addPERMS(state,perms){
        state.UserPerms = perms;
    },
    LOGIN_delPERMS(state){
        state.UserPerms = "";
    },
    LOGIN_UserName(state,username){
        state.UserName = username;
    },
    LOGIN_delUserName(state){
        state.UserName = "";
    }
}