<template>
    <div class="search-form">

        <!-- 头部tab切换 -->
        <el-row type="flex" class="search-tab">
            <span v-for="(item, index) in tabs" :key="index"
            @click="handleSearchTab(item, index)"
            :class="{active: index === currentTab}">
                <i :class="item.icon"></i>{{item.name}}
            </span>
        </el-row>

        <el-form class="search-form-content" ref="form" label-width="80px">
            <el-form-item label="出发城市">
                <!-- fetch-suggestions 返回输入建议的方法 -->
                <!-- select 点击选中建议项时触发 -->
                <el-autocomplete
                :fetch-suggestions="queryDepartSearch"
                placeholder="请搜索出发城市"
                @select="handleDepartSelect"
                class="el-autocomplete"
                v-model="form.departCity"
                @blur="handleBlur(`depart`)"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="到达城市">
                <el-autocomplete
                :fetch-suggestions="queryDestSearch"
                placeholder="请搜索到达城市"
                @select="handleDestSelect"
                class="el-autocomplete"
                v-model="form.destCity"
                @blur="handleBlur(`dest`)"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="出发时间">
                <!-- change 用户确认选择日期时触发 -->
                <el-date-picker type="date" 
                placeholder="请选择日期" 
                style="width: 100%;"
                v-model="form.departDate"
                @change="handleDate">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="">
                <el-button style="width:100%;" 
                type="primary" 
                icon="el-icon-search"
                @click="handleSubmit">
                    搜索
                </el-button>
            </el-form-item>
            <div class="reverse">
                <span @click="handleReverse">换</span>
            </div>
        </el-form>  
      </div>
</template>

<script>
import moment from 'moment'
export default {
    data(){
        return {
            tabs: [
                {icon: "iconfont icondancheng", name: "单程"},
                {icon: "iconfont iconshuangxiang", name: "往返"}
            ],
            currentTab: 0,
            form:{
                departCity:'',//出发城市
                departCode:'',//出发城市代码
                destCity:'',//到达城市
                destCode:'',//到达城市代码
                departDate:''//日期字符串
            },
            // 存放newData的城市的数组
            cities:[]
        }
    },
    methods: {
        // tab切换时触发
        handleSearchTab(item, index){
            if(index===1){
                this.$alert('目前不支持往返','提示',{
                    confirmButtonText:'确定',
                    type:'warning'
                })
            }
        },
        
        // 出发城市输入框获得焦点时触发
        // value 是选中的值，cb是回调函数，接收要展示的列表
        // cb:回调函数，必须要调用，调用时候必须要传递一个数组的参数，
        // 数组中的元素必须是一个对象，对象中必须要有value属性
        queryDepartSearch(value, cb){
            if(!value) {

                cb([])// 不显示下拉框
                //只是return的话,是无法暂停它cb请求数据的,需要把cb设为空,这样他就没有东西好显示的
                return
            }
            this.$axios({
                url:'airs/city?name='+value
            }).then(res=>{
                // data是后台返回的城市数组,没有value属性
                const {data} = res.data
                // 循环给每一项添加value属性
                const newData  = data.map(v=>{
                    v.value = v.name.replace('市','')
                    return v
                })
                // 把newData赋值给data中cities
                this.cities = newData
                // 回调函数传参,把遍历添加value属性的数组返回使显示备选项
                cb(newData)
            })
        },
        handleBlur(type){
        // handleDepartBlur(){
            //如果输入框中没有值则退出该函数,如果不加这个会有怎么删都删不掉的bug
            // if(!this.form.departCity) return;
            // // 默认选中城市列表第一个
            // if(this.cities.length > 0){
            //     this.form.departCity = this.cities[0].value
            //     this.form.departCode = this.cities[0].sort
            // }

            // 另一种写法
            if(!this.form[type+'City']) return;
            if(this.cities.length===0) return 
            this.form[type+'City'] = this.cities[0].value
            this.form[type+'Code'] = this.cities[0].sort
        },  


        // 目标城市输入框获得焦点时触发
        // value 是选中的值，cb是回调函数，接收要展示的列表
        queryDestSearch(value, cb){
            // value是到达城市value, cb也是到达的输入框回调函数
            this.queryDepartSearch(value,cb)
        },

        // 出发城市下拉选择时触发
        handleDepartSelect(item) {
            // 获取到表单需要的机票信息
            this.form.departCity = item.value
            this.form.departCode = item.sort
        },

        // 目标城市下拉选择时触发
        handleDestSelect(item) {
            // 获取到表单需要的机票信息
            this.form.destCity = item.value
            this.form.destCode = item.sort
        },

        // 确认选择日期时触发
        handleDate(value){
            this.form.departDate = moment(value).format(`YYYY-MM-DD`)
        },

        // 触发和目标城市切换时触发
        handleReverse(){
            const {departCity, departCode, destCity, destCode} = this.form;
            this.form.departCity = destCity;
            this.form.departCode = destCode;
            this.form.destCity = departCity;
            this.form.destCode = departCode;
        },

        // 提交表单是触发
        handleSubmit(){
            const rules = {
                // message是错误的信息， value是对应表单中的值
                departCity:{message:'请输入出发城市',value:this.form.departCity},
                destCity:{message:'请输入到达城市',value:this.form.destCity},
                departDate:{message:'请选择出发日期',value:this.form.departDate}
            }
            let valid = true
            // 循环rules这个对象，判断对象属性的value如果是空的，打印出message错误信息
            Object.keys(rules).forEach(v=>{
                // 只要有一次验证不通过，后台验证不用再执行
                if(!valid) return
                const {message,value} = rules[v]
                // 对象属性的value如果是空的
                if(!value){
                    this.$message.error(message)
                    // 验证不通过
                    valid = false
                }
            })  
            if(!valid) return
            this.$router.push({
                path:'air/flights',
                query:this.form
            })
            // 保存到store
            this.$store.commit("air/setHistory", this.form);
        }
    },
    mounted() {
        
    }
}
</script>

<style scoped lang="less">
.search-form{
    border:1px #ddd solid;
    border-top:none;
    width:360px;
    height:350px;
    box-sizing: border-box;
}

.search-tab{
  span{
    display: block;
    flex:1;
    text-align: center;
    height:48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top:3px #eee solid;
    background:#eee;
  }

  .active{
    border-top-color: orange;
    background:#fff;
  }

  i{
    margin-right:5px;
    font-size: 18px;

    &:first-child{
      font-size:16px;
    }
  }
}

.search-form-content{
  padding:15px 50px 15px 15px;
  position: relative;

  .el-autocomplete{
    width: 100%;
  }
}

.reverse{
  position:absolute;
  top: 35px;
  right:15px;

  &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:-35px;
      width:25px;
      height:1px;
      background:#ccc;
  }

  &:after{
      top:0;
    }

    &:before{
      top:60px;
    }

  span{
    display: block;
    position:absolute;
    top: 20px;
    right:0;
    font-size:12px;
    background: #999;
    color:#fff;
    width:20px;
    height:20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:10px;
      width:1px;
      height:20px;
      background:#ccc;
    }

    &:after{
      top:-20px;
    }

    &:before{
      top:20px;
    }
  }
}
</style>