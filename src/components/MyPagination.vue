<template>
    <div style="text-align: center;margin: 20px">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 15, 20, 100]"
                background
                layout="total, sizes, prev, pager, next, jumper"
                :total="total" :page-size="sizePage">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        props:{
            total:{
                type:Number,
                default:50
            },
            sizePage:{
                type:Number,
                default:10
            }
        },
        methods:{
            handleCurrentChange(currentPage){
                this.$emit('handleCurrentChange',currentPage);
            },
            handleSizeChange(sizePage){
                this.$emit('handleSizeChange',sizePage);
            }
        }
    }

</script>

<style>

</style>