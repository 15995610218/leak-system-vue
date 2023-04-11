<template>
    <div class="addksleak">
        <el-row :gutter="20">
            <el-col :span="24">
                <div class="content">
                    <div class="subTitle">添加漏洞</div>
                    <div class="wrapper">
                        <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                            <el-form-item label="漏洞名称" prop="bugName">
                                <el-input v-model="form.bugName"></el-input>
                            </el-form-item>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="CVE编号" prop="cve">
                                        <el-input v-model="form.cve"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="发现时间" prop="releaseDate">
                                        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.releaseDate" style="width: 100%;"></el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="危险等级" prop="threatLevel">
                                        <el-select v-model="form.threatLevel" placeholder="请选择危险等级">
                                            <el-option label="特危" value="4"></el-option>
                                            <el-option label="高" value="3"></el-option>
                                            <el-option label="中" value="2"></el-option>
                                            <el-option label="低" value="1"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-form-item label="漏洞描述" prop="bugInformation">
                                <el-input type="textarea" v-model="form.bugInformation"></el-input>
                            </el-form-item>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="系统名称" prop="systemName">
                                        <el-input v-model="form.systemName"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="运行环境" prop="environName">
                                        <el-select v-model="form.environName" placeholder="请选择运行环境">
                                            <el-option label="生产" value="5"></el-option>
                                            <el-option label="测试" value="4"></el-option>
                                            <el-option label="办公" value="3"></el-option>
                                            <el-option label="演练" value="2"></el-option>
                                            <el-option label="孤岛" value="1"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="IPv4地址" prop="ipAddress">
                                        <el-input v-model="form.ipAddress"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="负责人" prop="processPerson">
                                        <el-input v-model="form.processPerson"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="所在团队" prop="deptName">
                                        <el-input v-model="form.deptName"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="处置方法" prop="processPlan">
                                        <el-input v-model="form.processPlan"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="处置计划" prop="processDate">
                                        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.processDate" style="width: 100%;"></el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-form-item label="处置结果" prop="processResult">
                                <el-input v-model="form.processResult"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">保存</el-button>
                                <el-button @click="cancalSubmit">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import request from "@/utils/request";
    import { requestAddLeak } from "@/api";
    export default {
        data() {
            return {
                form: {
                    bugName:'',
                    cve:'',
                    releaseDate:'',
                    threatLevel:'',
                    bugInformation:'',
                    systemName:'',
                    environName:'',
                    ipAddress:'',
                    processPerson:'',
                    deptName:'',
                    processPlan:'',
                    processDate:'',
                    processResult:''
                },
                rules:{
                    bugName: [
                        { required: true, message: '请输入漏洞名称', trigger: 'blur' },
                        { min: 1, max: 64, message: '长度在 3 到 64 个字符', trigger: 'blur' }
                    ],
                    bugInformation: [
                        { required: true, message: '请输入漏洞描述', trigger: 'blur' }
                    ],
                    releaseDate: [
                        { required: true, message: '请选择发现日期', trigger: 'blur' }
                    ],
                    threatLevel: [
                        { required: true, message: '请选择危险等级', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            cancalSubmit(){
                this.$router.push('/kunshan/ksleak');
            },
            onSubmit() {
                this.addKsleakRequest();
            },
            async addKsleakRequest(){
                let data = await requestAddLeak(this.form)
                if (data.state === 200){
                    this.$message.success("恭喜你，添加成功！");
                    this.$router.push("/kunshan/ksleak");
                }else {
                    this.$message.error("抱歉，添加失败！");
                }
                // request({
                //     method: 'POST',
                //     url:'/leak/ksleakinsert',
                //     data:that.form
                // }).then(res => {
                //     if (res.data.state === 200){
                //         this.$message.success("恭喜你，添加成功！");
                //         this.$router.push("/kunshan/ksleak");
                //     }else {
                //         this.$message.error("抱歉，添加失败！");
                //     }
                // })
            }
        }
    }

</script>

<style lang="less" scoped>
    .addksleak{
        margin: 10px;
        padding: 10px;
    }
    .menu{
        border: 1px solid #ddd;
        height: 600px;
    }
    .title{
        height: 50px;
        line-height: 50px;
        color: #fff;
        background: skyblue;
        padding-left: 10px;
        font-size: 14px;
    }
    .content{
        height: 100%;
        background: #fff;
        padding: 10px;
        font-size: 14px;
    }
    .subTitle{
        background: #eee;
        color: #000;
        padding: 10px;
        font-weight: bold;
    }
    .wrapper{
        padding: 20px;
    }
</style>