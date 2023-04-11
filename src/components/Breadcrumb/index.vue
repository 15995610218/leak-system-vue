<template>
<!--面包屑-->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in navData" :key="item.path" :to="{ path: '/' }">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
    export default {
        data(){
            return{

            }
        },
        computed:{
            navData(){
                let matche = this.$route.matched;
                return matche;
            }
        }
    }
</script>

<style>

</style>