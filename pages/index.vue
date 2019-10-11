<template>
    <div class="container">
        <!-- 幻灯片 -->
        <!-- interval 自动切换的时间间隔，单位为毫秒
        arrow 切换箭头的显示时机 -->
        <el-carousel 
        :interval="5000" 
        arrow="always">
            <el-carousel-item 
            v-for="(item,index) in banners" 
            :key="index">
                <div
                class="banner-image"
                :style="`
                background:url(${$axios.defaults.baseURL+item.url}) center center no-repeat;
                background-size:contain contain;`"
                ></div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    data(){
        return {
            // 轮播图数据
            banners:[]
        }
    },
    mounted(){
        // 请求轮播图数据
        this.$axios({
            url:'/scenics/banners'
        }).then(res=>{
            const {data} = res.data
            // 赋值给banners
            this.banners = data
        })
    }
}
</script>

<style scoped lang="less">
    .container{
        min-width:1000px;
        margin:0 auto;
        position:relative;

        /deep/ .el-carousel__container{
            height:700px;
        }

        .banner-image{
            width:100%;
            height:100%;
        }
    }
</style>