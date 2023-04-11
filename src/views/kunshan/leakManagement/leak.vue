<template>
<!--        表头位置-->
    <div class="ksleak">
        <!--    面包屑-->
        <Breadcrumb></Breadcrumb>
        <div class="header">
            <el-input class="header-input" v-model="inputBugname" placeholder="请输入漏洞名称"></el-input>
            <el-input class="header-input" v-model="inputCVE" placeholder="请输入CVE编号"></el-input>
            <el-button type="primary" @click="SubmitSelect">查询</el-button>
            <el-button type="primary" @click="SubmitInsert">添加</el-button>
            <el-button type="info" @click="dialogImportVisible = true">导入</el-button>
            <el-button type="warning" @click="dialogVisible = true">导出</el-button>
            <el-button type="danger" @click="SubmitDelete">删除</el-button>
        </div>
        <br>
<!--        内容位置-->
        <div class="warpper">
            <el-table :data="tableData" height="500" border style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column label="安全团队" >
                    <el-table-column prop="bugName" label="漏洞名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="releaseDate" label="发现日期" :formatter="formatDate"></el-table-column>
                    <el-table-column prop="threatLevel" label="危险等级" width="50"></el-table-column>
                    <el-table-column prop="bugInformation" label="漏洞描述" show-overflow-tooltip></el-table-column>
                </el-table-column>
                <el-table-column label="处置团队" >
                    <el-table-column prop="systemName" label="系统名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="processPerson" label="负责人" width="70"></el-table-column>
                    <el-table-column prop="processPlan" label="处置方式" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="processDate" label="处置时间" :formatter="formatDate"></el-table-column>
                    <el-table-column prop="processResult" label="处置结果" show-overflow-tooltip></el-table-column>
                </el-table-column>
                <el-table-column label="操作" width="50">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="primary"
                                icon="el-icon-edit"
                                circle
                                @click="handleEdit(scope.$index, scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
<!--            导出数据到execl-->
            <el-dialog
                    title="导出数据"
                    :visible.sync="dialogVisible"
                    width="50%">
                <el-form ref="exportDate" :model="exportDate" label-width="80px">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="开始时间" prop="beginDate">
                                <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="exportDate.beginDate" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="结束时间" prop="andDate">
                                <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="exportDate.andDate" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <el-button type="primary" @click="SubmitExport">提交</el-button>
                        <el-button @click="dialogVisible = false">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
<!--            导入execl到数据库-->
            <el-dialog
                    title="导入数据"
                    :visible.sync="dialogImportVisible"
                    width="50%">
                    <input type="file" value="选择文件---" @change="uploadFile($event)">
                    <input type="button" value="上传" @click="uploadSubmit">
            </el-dialog>
        </div>
<!--        分页位置    -->
        <div>
            <MyPagination :total="total" :pageSize="sizePage" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"/>
        </div>
    </div>
</template>
<script>
    import MyPagination from '@/components/MyPagination.vue';
    import Breadcrumb from "@/components/Breadcrumb";
    import base from "@/api/base";
    import request from "@/utils/request";
    import axios from "axios";
    import { requestLeak } from "../../../api/index";
    import { requestSearch } from "../../../api/index";
    import { requestDelete } from "@/api";
    import { requestExport } from "@/api";
    import { requestUploadLeak } from "@/api";
    export default {
        components:{
            MyPagination,
            Breadcrumb
        },
        data(){
            return{
                //导入execl事件数据
                fileObj:null,
                //导出execl事件数据，
                exportDate:{
                    beginDate:'',
                    andDate:''
                },
                //导出弹框
                dialogVisible:false,
                //导入弹框
                dialogImportVisible:false,
                //搜索数据
                inputBugname:'',
                inputCVE:'',
                //表单数据
                tableData:[],
                total:50,
                sizePage:10,
                currentPage:1,
                //搜索栏位数据
                formInline: {
                    user: '',
                    region: ''
                },
                multipleSelection:[],
                tmpNumber:[],
                deleteFlag:''
            }
        },
        methods:{
            //时间格式化方法
            formatDate(row, column) {
                // 获取单元格数据
                let data = row[column.property]
                if(data == null) {
                    return null
                }
                let dt = new Date(data)
                return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate()
            },
            //查询事件
            SubmitSelect(){
                this.ksleakSearch(this.currentPage,this.sizePage,this.inputBugname,this.inputCVE);
            },
            SubmitInsert(){
                //跳转添加页面
                this.$router.push('/kunshan/addksleak');
            },
            //导入事件
            uploadSubmit(){
                if (this.fileObj){
                    let fd = new FormData();
                    fd.append('file',this.fileObj);
                    this.ksleakUpload(fd);
                }else {
                    this.$message.warning("请选择上传的execle文件!");
                }
            },
            //获取上传文件
            uploadFile(event){
                let file = event.target.files[0];
                let fileName = file.name;
                let index = fileName.lastIndexOf(".");
                if (index != -1){
                    let suffix = fileName.substr(index + 1).toLowerCase();
                    if (suffix == 'xls' || suffix == 'xlsx'){
                        this.fileObj = file;
                    }else {
                        this.$message.error("只允许上传execl类型文件!")
                        this.fileObj = null;
                    }
                }
            },
            //导出execl事件
            SubmitExport(){
                this.ksleakExport(this.exportDate);
            },
            SubmitDelete(){
                console.log("进入删除任务--------")
                for (let i = 0;i < this.multipleSelection.length;i++){
                    let tmpKsleak = this.multipleSelection[i];
                    this.tmpNumber[i] = tmpKsleak.id;
                }
                if (this.tmpNumber.length === 0){
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
                }).then(async () => {
                    let res = await this.ksleakDelete(this.tmpNumber);
                    if (res.state === 200){
                        this.tmpNumber = [];
                        await this.ksleakRequest(this.currentPage, this.sizePage);
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }else {
                        this.$message({
                            type: 'warning',
                            message: '删除失败!'
                        });
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleSelectionChange(val){
                this.multipleSelection = val;
            },
        //    搜索事件
            onSubmit() {
                console.log('submit!');
            },
        //    分页事件查询数据
            handleCurrentChange(currentPage){
                // this.ksleakRequest(currentPage,this.sizePage);
                this.ksleakSearch(currentPage,this.sizePage,this.inputBugname,this.inputCVE);
            },
            handleSizeChange(sizePage){
                this.sizePage = sizePage;
                // this.ksleakRequest(this.currentPage,sizePage);
                this.ksleakSearch(this.currentPage,sizePage,this.inputBugname,this.inputCVE);
            },
            //操作-编辑事件和删除事件
            handleEdit(index,row){
                this.$router.push({
                    path:'/kunshan/editksleak',
                    query:{index:index,row:row}
                });
            },
            //请求后台数据-默认分页查询
            async ksleakRequest(currentPage,sizePage){
                let data = await requestLeak(currentPage,sizePage);
                this.tableData = data.rows;
                this.total = data.totalcount;
            },
            //请求后台数据-搜索形式查询
            async ksleakSearch(currentPage,sizePage,inputBugname,inputCVE){
                let data = await requestSearch(currentPage,sizePage,inputBugname,inputCVE);
                this.tableData = data.rows;
                this.total = data.totalcount;
            },
            //请求删除后台数据-根据ID删除对应数据
            ksleakDelete(ids){
                return requestDelete(ids);
            },
            //导出execl数据-后台交互
            async ksleakExport(exportDate) {
                let res = await requestExport(exportDate);
                const link=document.createElement('a');
                try {
                    // let blob = new Blob([res.data],{type:"application/vnd.ms-execl"});
                    //使用blob类型接受导出数据流
                    let blob = res;
                    //获取后台返回的文件名
                    // let fileName = res.headers['content-disposition'].split(';')[1].split('=')[1];
                    let fileName = "昆山漏洞.xls"
                    // link.style.display='none';
                    //兼容不同浏览器URL
                    const urls = window.URL || window.webkitURL || window.moxURl;
                    //创建超链接
                    link.href=urls.createObjectURL(blob);
                    //设置超链接属性
                    link.setAttribute('download',fileName.substring(fileName.lastIndexOf('_')+1));
                    //DOM添加超链接
                    document.body.appendChild(link);
                    //模拟点击事件
                    link.click();
                    //释放DOM
                    document.body.removeChild(link);
                    //释放超链接
                    urls.revokeObjectURL(link.href);
                    //关闭弹框页面
                    this.dialogVisible=false;
                }catch (e){
                    this.dialogVisible=false;
                    this.$message.error('下载文件出错:',e);
                }
            }
                //     request({
                //         method:'POST',
                //         url:'/leak/ksleakexport',
                //         responseType:'blob',
                //         data:exportDate
                //     }).then(res => {
                //         if (res.headers !== '{}'){
                //             //创建空的超链接
                //             const link=document.createElement('a');
                //             try {
                //                 // let blob = new Blob([res.data],{type:"application/vnd.ms-execl"});
                //                 //使用blob类型接受导出数据流
                //                 let blob = res.data;
                //                 //获取后台返回的文件名
                //                 let fileName = res.headers['content-disposition'].split(';')[1].split('=')[1];
                //                 // link.style.display='none';
                //                 //兼容不同浏览器URL
                //                 const urls = window.URL || window.webkitURL || window.moxURl;
                //                 //创建超链接
                //                 link.href=urls.createObjectURL(blob);
                //                 //设置超链接属性
                //                 link.setAttribute('download',fileName.substring(fileName.lastIndexOf('_')+1));
                //                 //DOM添加超链接
                //                 document.body.appendChild(link);
                //                 //模拟点击事件
                //                 link.click();
                //                 //释放DOM
                //                 document.body.removeChild(link);
                //                 //释放超链接
                //                 urls.revokeObjectURL(link.href);
                //                 //关闭弹框页面
                //                 this.dialogVisible=false;
                //             }catch (e){
                //                 this.dialogVisible=false;
                //                 this.$message.error('下载文件出错:',e);
                //             }
                //         }
                //     }).catch(err =>{
                //         this.dialogVisible=false;
                //         this.$message.error("导出文件下载失败！");
                //     })
                // }
            ,
            async ksleakUpload(leakData){
                let uploadResp = await requestUploadLeak(leakData);
                this.dialogImportVisible=false;
                if (uploadResp.state === 200){
                    this.$message.success("成功导入:"+uploadResp.data+"条数;");
                    this.handleCurrentChange(1);
                }else if (uploadResp.state === 7005){
                    this.$message.error(uploadResp.message);
                }
            }
        },
        created(){
            this.ksleakRequest(this.currentPage,this.sizePage);
        }
    }
</script>

<style lang="less" scoped>
    .ksleak{
        margin: 20px;
    }
    .header{
        display: flex;
        margin-top: 20px;
    }
    .header button {
        margin-left: 20px;
    }
    .header-input{
        margin-left: 20px;
    }
    .el-table-column{
        text-align: center;
    }
</style>