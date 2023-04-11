<template>
    <div>
        <el-container>
<!--            主要内容容器-->
            <el-main>
                <el-carousel :interval="4000" type="card">
                    <el-carousel-item v-for="item in Carousel" :key="item.id">
                        <img style="object-fit:scale-down; width: 100%;height: 100%;" :src="item.idview" class="image">
                    </el-carousel-item>
                </el-carousel>
            </el-main>
<!--            底栏容器-->
            <el-footer>Footer</el-footer>
        </el-container>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                Carousel:[
                    {id:0,idview: require('@/assets/img/01.png')},
                    {id:1,idview: require('@/assets/img/02.png')},
                    {id:2,idview: require('@/assets/img/03.png')},
                    {id:3,idview: require('@/assets/img/04.png')}
                ]
            }
        }
    }

</script>

<style lang="less" scoped>
    .el-container{
        min-height: 100vh;
    }
    .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

</style>