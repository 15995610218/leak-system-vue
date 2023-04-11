<template>
    <div class="Layout">
<!--左侧导航-->
        <MyMenu class="menu" />
<!--右侧内容-->
        <Content class="content" />
    </div>
</template>

<script>
    import MyMenu from './mymenu.vue'
    import Content from './content.vue'
    export default {
        components:{
            MyMenu,
            Content
        }
    }
</script>

<style lang="less" scoped>
    .Layout .menu{
        width: 200px;
        background: #666;
        position: fixed;
        top: 0;
        bottom: 0;
    /*.menu{*/
    /*    width: 200px;*/
    /*    background: #666;*/
    /*    position: fixed;*/
    /*    top: 0;*/
    /*    bottom: 0;*/
    /*}*/
    /*.content{*/
    /*    margin-left: 200px;*/
    /*}*/
    }
    .Layout .content{
        margin-left: 200px;
    }
</style>