<template>
    <div>
        <el-form 
        class="form"
        :rules="rules"
        :model="form"
        ref="form">
            <el-form-item prop="username" class="form-item">
                <el-input 
                placeholder="邮箱/手机号"
                v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item prop="password" class="form-item">
                <el-input 
                placeholder="密码"
                v-model="form.password"
                type="password"></el-input>
            </el-form-item>
            <p class="form-text">
                <nuxt-link to="#">忘记密码?</nuxt-link>
            </p>
            <el-button
            class="submit"
            type="primary"
            @click="handleLoginSubmit">
                登录
            </el-button>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            // 表单数据
            form:{
                username:'',
                password:''
            },
            // 表单规则
            rules:{
                username:[
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min: 11, message: '长度为11位的号码', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 7, message: '长度在 3 到 7 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        //提交登录
        handleLoginSubmit(){
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    // let res = await this.$axios({
                    //     url:'/accounts/login',
                    //     method:'POST',
                    //     data:this.form
                    // })

                    // this.$store.dispath用于调运actions的方法
                    const res = await this.$store.dispatch('user/login',this.form)
                    // console.log(res)

                    if (res.status===200){
                        this.$message.success('登录成功')
                        this.$router.push('/')
                        
                        // 把用户信息token保存到本地，在头部组件中显示用户数据
                        // const data = res.data
                        // vuex不能通过直接赋值方式来修改state的值
                        // this.$store.state.user.username = data.user.nickname;
                        // 通过调用mutation下的方法掉修改state的值,commit方法调用mutation的方法
                        // 非常类似于$emit
                        // this.$store.commit('user/setUserInfo',data)
                    }
                }
            });
        }
    }
}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>