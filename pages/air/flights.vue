<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <div>
                    <FlightsFilters :data="flightsData"></FlightsFilters>
                </div>
                
                <!-- 航班头部布局 -->
                <!-- flightsData.flights是航班的列表 -->
                <FlightsListHead></FlightsListHead>
                
                
                <!-- 航班信息 -->
                <!-- 航班列表 -->
                <flightsItem
                v-for="(item,index) in dataList"
                :key="index"
                :item="item"></flightsItem>
                <!-- size-change：切换条数时候触发 -->
                <!-- current-change：选择页数时候触发 -->
                <!-- current-page: 当前页数 -->
                <!-- page-size：当前条数 -->
                <!-- total：总条数 -->
                <el-pagination
                v-if="flightsData.flights.length"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageIndex"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="flightsData.total">
                </el-pagination>
                <!-- loading等于false表示加载完毕之后才显示 -->
                <div v-if="flightsData.flights.length === 0 && !loading" style="padding: 50px; text-align:center">
                    该航班暂无数据
                </div>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
            </div>
        </el-row>
    </section>
</template>

<script>

import moment from "moment";
import FlightsListHead from '@/components/air/flightsListHead'
import FlightsItem from '@/components/air/flightsItem'
import FlightsFilters from '@/components/air/flightsFilters'
export default {
    data(){
        return {
             // 请求机票列表返回的总数据，包含了flights,info, options,total
            flightsData:{
                flights:[],
                info:[],
                options:[]
            },
            //当前的页数
            pageIndex:1,
            //当前的条数
            pageSize:5,
            // 判断是否正在加载
            loading:true
        }
    },
    components:{
        FlightsListHead,
        FlightsItem,
        FlightsFilters
    },
    methods: {
        // 分页条数切换时候触发, val是当前的条数
        handleSizeChange(val){
            // 切换条数
            this.pageSize = val
        },
        // 页数切换时候触发, val是当前的页数
        handleCurrentChange(val){
            this.pageIndex = val
        }
    },
    computed:{
        dataList(){
            const arr = this.flightsData.flights.slice(
                (this.pageIndex-1)*this.pageSize,
                this.pageIndex*this.pageSize
            )
            return arr
        }
    },
    mounted(){
        // 请求机票列表数据
        this.$axios({
            url:'airs',
            // params是axios的get的参数
            params:this.$route.query
        }).then(res=>{
            // 保存到机票的总数据
            this.flightsData = res.data
            this.loading=false
        })
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>