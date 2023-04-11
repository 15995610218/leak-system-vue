<template>
    <div>
<!--        导航栏位-->
        <div class="header">
            <el-header style="text-align: right">
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <el-button type="text" @click="reviseVisible">修改密码</el-button>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <el-button type="text" style="color: red" @click="outerVisible">退出登陆</el-button>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>{{username}}</span>
            </el-header>
        </div>
<!--        内容显示-->
        <div class="content">
            <router-view/>
        </div>
<!--        修改密码-->
        <el-dialog
                title="修改密码"
                :visible.sync="dialogModifyPassword">
            <el-form ref="modifyPassword" :model="modifyPassword" :rules="rules" label-width="80px">
                <el-form-item label="账号名称">
                    <el-input v-model="modifyPassword.username"></el-input>
                </el-form-item>
                <el-form-item label="旧的密码">
                    <el-input v-model="modifyPassword.oldpassword"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="modifyPassword.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="modifyPassword.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="PasswordModifySubmit">提交</el-button>
                    <el-button @click="dialogModifyPassword = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import store from "@/store";
    import { logout } from "../../api/index";
    import { requestRevisePassword } from "@/api";

    export default {
        data(){
            //设置密码校验
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.modifyPassword.checkPass !== '') {
                        this.$refs.modifyPassword.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.modifyPassword.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                //用户名
                username:'',
                //修改密码弹框
                dialogModifyPassword:false,
                //设置密码校验
                rules: {
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                },
                //修改密码数据
                modifyPassword:{},
            }
        },
        methods:{
            //修改密码事件
            reviseVisible(){
                this.modifyPassword.username = this.username;
                this.dialogModifyPassword = true;
            },
            //退出单击事件
            outerVisible(){
                this.logouter();
            },
            async logouter(){
                let data = await logout();
                if (data.state === 200){
                    this.$message.success("成功退出");
                    this.$store.commit("LOGIN_delUserName");
                    this.$store.commit("LOGIN_delPERMS");
                    this.$store.commit("LOGIN_OUT");
                    this.$router.replace("/login");
                }
            },
            //修改密码单击事件
            PasswordModifySubmit(){
                this.revisePassword(this.modifyPassword);
                this.dialogModifyPassword = false;
            },
            async revisePassword(modifyPassword){
                let resultPassword = await requestRevisePassword(modifyPassword);
                if (resultPassword.state === 200){
                    this.$message.success("重置成功");
                    this.modifyPassword = {};
                }else {
                    this.$message.error("重置失败");
                }
            }
        },
        created(){
            if (store.state.UserName){
                this.username = store.state.UserName;
            }
        }
    }
</script>

<style>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

</style>