<template>
    <!--表头位置-->
    <div class="usermanagementClass">
<!--        面包屑-->
        <Breadcrumb></Breadcrumb>
        <div class="header">
            <el-button type="primary" @click="dialogAddUser = true">添加</el-button>
            <el-button type="danger" @click="UserDelSubmit">删除</el-button>
        </div>
        <br>
        <!--内容位置-->
        <div class="warpper">
            <!--表单页面-->
            <el-table :data="userDate" height="500" border style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column prop="username" label="账号名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="title" label="用户角色"></el-table-column>
                <el-table-column prop="status" label="状态" :formatter="stateFormat"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="primary"
                                round
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="warning"
                                round
                                @click="handleEdit1(scope.$index, scope.row)">重置密码</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--添加用户页面-->
            <el-dialog
                    title="添加用户"
                    :visible.sync="dialogAddUser">
                <el-form ref="userForm" :model="userForm" :rules="rules" label-width="80px">
                    <el-form-item label="用户名">
                        <el-input v-model="userForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="userForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="userForm.checkPass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="用户角色">
                        <el-select v-model="userForm.rid" placeholder="请选择用户权限">
                            <el-option label="超级管理员" value="1"></el-option>
                            <el-option label="昆山管理员" value="3"></el-option>
                            <el-option label="北京管理员" value="2"></el-option>
                            <el-option label="合肥管理员" value="5"></el-option>
                            <el-option label="西安管理员" value="4"></el-option>
                            <el-option label="昆山普通用户" value="8"></el-option>
                            <el-option label="西安普通用户" value="7"></el-option>
                            <el-option label="北京普通用户" value="9"></el-option>
                            <el-option label="合肥普通用户" value="6"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="用户状态">
                        <el-select v-model="userForm.status" placeholder="请选择用户状态">
                            <el-option label="启动" value="1"></el-option>
                            <el-option label="禁用" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="UserAddSubmit('userForm')">提交</el-button>
                        <el-button @click="dialogAddUser = false">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!--修改用户页面-->
            <el-dialog
                    title="修改用户"
                    :visible.sync="dialogModifyUser">
                <el-form ref="modifyForm" :model="modifyForm" label-width="80px">
                    <el-form-item label="账号名称">
                        <el-input v-model="modifyForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="用户角色">
                        <el-select v-model="modifyForm.rid" placeholder="请选择用户角色">
                            <el-option label="超级管理员" value="1"></el-option>
                            <el-option label="昆山管理员" value="3"></el-option>
                            <el-option label="北京管理员" value="2"></el-option>
                            <el-option label="合肥管理员" value="5"></el-option>
                            <el-option label="西安管理员" value="4"></el-option>
                            <el-option label="昆山普通用户" value="8"></el-option>
                            <el-option label="西安普通用户" value="7"></el-option>
                            <el-option label="北京普通用户" value="9"></el-option>
                            <el-option label="合肥普通用户" value="6"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="用户状态">
                        <el-select v-model="modifyForm.status" placeholder="请选择用户状态">
                            <el-option label="启动" value="1"></el-option>
                            <el-option label="禁用" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="UserModifySubmit">提交</el-button>
                        <el-button @click="dialogModifyUser = false">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!--重置密码页面-->
            <el-dialog
                    title="重置密码"
                    :visible.sync="dialogModifyPassword">
                <el-form ref="modifyPassword" :model="modifyPassword" :rules="rules" label-width="80px">
                    <el-form-item label="账号名称">
                        <el-input v-model="modifyPassword.username"></el-input>
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
    </div>
</template>
<script>
    import Breadcrumb from "@/components/Breadcrumb";
    import base from "@/api/base";
    import request from "@/utils/request";
    import { requestUser } from "@/api";
    import { requestAddUser } from "@/api";
    import { requestDelUser } from "@/api";
    import { requestUpdateUser } from "@/api";
    import { requestUpdatePassword } from "@/api";
    export default {
        components:{
            Breadcrumb
        },
        data(){
            //设置密码校验
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.userForm.checkPass !== '') {
                        this.$refs.userForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.userForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                //表单数据
                userDate:[],
                //选择数据
                multipleSelection:[],
                tmpIds:[],
                //添加数据
                userForm:{
                    username:'',
                    password:'',
                    checkPass:'',
                    rid:'',
                    status:''
                },
                //修改用户数据
                modifyForm:{},
                //修改密码数据
                modifyPassword:{},
                //添加数据页面开关
                dialogAddUser:false,
                //修改用户页面开关
                dialogModifyUser:false,
                //修改用户密码页面开关
                dialogModifyPassword:false,
                //设置密码校验
                rules: {
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            //根据不同值显示不同名称
            stateFormat(row,column){
                if (row.status === '1'){
                    return '启用'
                }else {
                    return '禁用'
                }
            },
            //添加用户单击事件
            UserAddSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.userAdd(this.userForm);
                    } else {
                        this.$message.error("两次输入密码不一致!")
                        return false;
                    }
                });
            },
            //删除用户单击事件
            UserDelSubmit(){
                for (let i = 0;i < this.multipleSelection.length;i++){
                    let tmpUser = this.multipleSelection[i];
                    this.tmpIds[i] = tmpUser.uid;
                }
                console.log(this.tmpIds.length);
                if (this.tmpIds.length == 0){
                    this.$message({
                        type: 'info',
                        message: '请选择要删除的数据！'
                    });
                    return;
                }
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.userDelete(this.tmpIds);
                    this.tmpIds = [];
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                    this.tmpIds = [];
                });
            },
            //修改用户单击事件
            handleEdit(index,row){
                this.modifyForm = row;
                this.dialogModifyUser = true;
            },
            //修改用户提交事件
            UserModifySubmit(){
                this.userUpdate(this.modifyForm);
                this.dialogModifyUser = false;
            },
            //修改密码单击事件
            handleEdit1(index,row){
                this.modifyPassword = row;
                this.dialogModifyPassword = true;
            },
            PasswordModifySubmit(){
                this.passwordUpdate(this.modifyPassword);
                this.dialogModifyPassword = false;
            },
            //选择用户事件
            handleSelectionChange(val){
                this.multipleSelection = val;
                console.log(this.multipleSelection);
            },
            //后台交互-查询用户数据
            async userRequest(){
                let userdata = await requestUser();
                this.userDate = userdata;
            },
            //后台交互-添加用户数据
            async userAdd(userForm){
                let data = await requestAddUser(userForm);
                if (data.state === 200){
                    this.$message.success('添加用户成功!');
                    this.userForm={};
                    this.userRequest();
                }
                this.dialogAddUser = false;

            },
            async userDelete(ids){
                let data = await requestDelUser(ids);
                if (data.state === 200){
                    this.$message.success('删除成功!');
                    this.userRequest();
                }else {
                    this.$message.error(data.message);
                }
            },
            //后台交互-更新用户数据
            async userUpdate(modifyUser){
                let updateDate = await requestUpdateUser(modifyUser);
                if (updateDate.state === 200){
                    this.$message.success("更新成功");
                    this.userRequest();
                }else {
                    this.$message.error("更新失败");
                }
            },
            //后台交互-更新用户密码
            async passwordUpdate(modifyPassword){
                let updatePassword = await requestUpdatePassword(modifyPassword);
                if (updatePassword.state === 200){
                    this.$message.success("重置成功");
                    this.modifyPassword = {};
                }else {
                    this.$message.error("重置失败");
                }
            }
        },
        created(){
            this.userRequest();
        }
    }
</script>

<style lang="less" scoped>
    .usermanagementClass{
        margin: 20px;
    }
    .header{
        display: flex;
        margin-top: 20px;
    }
    .header button {
        margin-left: 20px;
    }

</style>