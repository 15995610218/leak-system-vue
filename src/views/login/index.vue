<script>
    import md5 from "md5";
    import request from "@/utils/request";
    import { login } from "../../api/index"
    export default {
        name:'login',
        data(){
            return{
                username:'',
                password:''
            }
        },
        methods:{
            submitForm(){
                if (this.username.length < 5){
                    this.$message.error('用户名不能小于5位字符');
                    return;
                }
                if(!/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/.test(this.password)){
                    this.$message.error('用户密码不符合安全要求：不少于6位，必须包含大小写字母、数字、特殊字符！')
                    return;
                }
                this.login(this.username,this.password);
            },
            // async loginUser(username,password) {
            //     request({
            //         method:'GET',
            //         url:'/user/login',
            //         params:{username,password}
            //     }).then(res => {
            //         if (res.data.state === 200){
            //             this.$router.push({
            //                 path:'/'
            //             })
            //         }
            //     }).catch(err => {
            //         this.$message.error(err.message);
            //     })
            // }
            async login(username,password){
                let data = await login(username,password);
                this.$store.commit('LOGIN_IN',data.token);
                this.$store.commit('LOGIN_addPERMS',data.permissions);
                this.$store.commit('LOGIN_UserName',data.username);
                this.$router.replace("/");
            }
        }
    }
</script>

<template>
    <div class="login-container">
        <div class="form-wrap">
            <h2 class="header">信息安全管理系统</h2>
            <el-input placeholder="请输入用户名" v-model="username"></el-input>
            <el-input class="psw" placeholder="请输入密码" v-model="password" show-password></el-input>
            <el-button type="success" @click="submitForm">登陆</el-button>
        </div>
    </div>
</template>

<style lang="less" scoped>
    .login-container{
        height: 100%;
        background: whitesmoke;
    }
    .form-wrap{
        position: absolute;
        left: 50%;
        top: 50%;
        width: 360px;
        transform: translate(-50%,-50%);
        background: white;
        border-radius: 15px;
        padding: 32px 32px 20px;
    }
    .header{
        text-align: center;
        margin-bottom: 32px;
    }
    .psw{
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .el-button{
        width: 100%;
    }
</style>