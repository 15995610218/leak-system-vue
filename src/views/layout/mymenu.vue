<template>
    <div>
        <el-menu
                :default-active="activeMenu()"
                class="el-menu-vertical-demo"
                background-color="#333"
                text-color="#fff"
                active-text-color="#ffd04b"
                router
                >
            <el-menu-item index="/">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu v-if="this.$store.state.UserPerms.includes('auth:beijingzhongxin')" index="/beijing">
                <template slot="title">
                    <i class="el-icon-office-building"></i>
                    <span>北京中心</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/beijing/bjleak"><i class="el-icon-s-cooperation"></i>漏洞管理</el-menu-item>
                    <el-menu-item index="/beijing/bjrisk"><i class="el-icon-s-check"></i>风险管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu v-if="this.$store.state.UserPerms.includes('auth:kunshanzhongxin')" index="/kunshan">
                <template slot="title">
                    <i class="el-icon-school"></i>
                    <span>昆山中心</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/kunshan/ksleak"><i class="el-icon-s-cooperation"></i>漏洞管理</el-menu-item>
                    <el-menu-item index="/kunshan/ksrisk"><i class="el-icon-s-check"></i>风险管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu v-if="this.$store.state.UserPerms.includes('auth:hefeizhongxin')" index="/hefei">
                <template slot="title">
                    <i class="el-icon-s-platform"></i>
                    <span>合肥中心</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/hefei/hfleak"><i class="el-icon-s-cooperation"></i>漏洞管理</el-menu-item>
                    <el-menu-item index="/hefei/hfrisk"><i class="el-icon-s-check"></i>风险管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu v-if="this.$store.state.UserPerms.includes('auth:xianzhongxin')" index="/xian">
                <template slot="title">
                    <i class="el-icon-s-shop"></i>
                    <span>西安中心</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/xian/xaleak"><i class="el-icon-s-cooperation"></i>漏洞管理</el-menu-item>
                    <el-menu-item index="/xian/xarisk"><i class="el-icon-s-check"></i>风险管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu v-if="this.$store.state.UserPerms.includes('auth:admin')" index="/systemmanagement">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>系统管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/systemmanagement/usermanagement"><i class="el-icon-s-custom"></i>用户管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
<!--        <div>-->
<!--            <ul>-->
<!--&lt;!&ndash;                默认数据&ndash;&gt;-->
<!--                <li v-for="(v,i) in lists" :key="i">-->
<!--                    <router-link to="">-->
<!--                        <i class="iconfont" :class="v.iocn"></i>-->
<!--                        <span>{{v.title}}</span>-->
<!--                    </router-link>-->
<!--                </li>-->
<!--            </ul>-->
<!--        </div>-->
    </div>

</template>

<script>
    export default {
        // data(){
        //     return{
        //         lists:[
        //             {title:'首页',icon:'iconqiye'},
        //             {title:'系统管理',icon:'iconshouye1'}
        //         ]
        //     }
        // },
        data(){
            return{
                links:[],
                beijingzhongxin:''
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);

            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            //高亮方法
            activeMenu(){
                let route = this.$route;
                let {path,meta} = route;
                if (meta.activeMenu){
                    return meta.activeMenu;
                }
                return path;
            }
        }
    }
</script>

<style scope>
    .el-menu .is-active{
        background: #1e78bf !important;
        color: #fff !important;
    }
    .el-menu-vertical-demo.el-menu{
        border: none;
    }
</style>