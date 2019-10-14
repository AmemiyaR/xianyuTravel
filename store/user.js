// 用户管理
export const state = () => ({
    // 采用接口返回的数据结构
    userInfo: {},
}) 

export const mutations = {
    // mutaions下的值必须是一个函数，函数中会有一个固定的参数state，第二个参数是用户调用方法时候传进来
    // data是登录成功后返回的对象数据
    setUserInfo(state,data){
        state.userInfo = data
    }
};

// 存放的是异步修改state的方法
export const actions = {
    // 封装登录的方法
    // store是固定必须要有的参数，执行当前的store == 组件内this.$store
    async login(store,data){
        let res = await this.$axios({
            url:'/accounts/login',
            method:'POST',
            data//data为调用方法传入的this.form
        })

        if(res.status===200){
            store.commit('setUserInfo',res.data)
            //这里是res.data是因为data是传过来的this.form,不包含名字和头像信息
        }

        return res
    },
    // 发送手机验证码, tel是传入的手机号码
    async sendCaptcha(store,tel){
        const res = await this.$axios({
            url:'/captchas',
            method:'POST',
            data:{
                tel// 手机号码
            }
        })
        return res
    }
};