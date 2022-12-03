<template>
    <div>
        <h1>登录</h1>
        <div>
            <input type="text" v-model="form.username" disabled />
            <input type="password" v-model="form.password" disabled />
            <img :src="codeUrl" alt="" />
            <input type="text" v-model="form.code" />
            <button @click="handleLogin">登录</button>
        </div>
    </div>
</template>

<script>
import { captcha } from '@/api/user'
import { bing } from '@/api/bing'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'userLogin',
  // 数据
  data () {
    return {
      form: {
        code: '',
        password: '123456',
        rememberMe: false,
        username: 'admin',
        uuid: ''
      },
      codeUrl: '',
      data: {}
    }
  },
  // 计算属性
  computed: {

  },
  // 侦听器
  watch: {
  },
  // 在实例初始化之后,进行数据侦听和事件/侦听器的配置之前同步调用
  beforeCreate () {

  },
  // 在实例创建完成后被立即同步调用
  created () {
    this.getBing()
    this.getCaptcha()
  },
  // 在挂载开始之前被调用：相关的 render 函数首次被调用
  beforeMount () {

  },
  // 实例被挂载后调用，这时 el 被新创建的 vm.$el 替换了
  mounted () {

  },
  // 在数据发生改变后，DOM 被更新之前被调用
  beforeUpdate () {

  },
  // 在数据更改导致的虚拟 DOM 重新渲染和更新完毕之后被调用
  update () {

  },
  // 实例销毁之前调用
  beforeDestroy () {

  },
  // 实例销毁后调用
  destroyed () {

  },
  // 在捕获一个来自后代组件的错误时被调用
  errorCaptured () {

  },
  // 方法
  methods: {
    ...mapGetters(['token', 'userInfo']),
    ...mapActions(['Login', 'Logout']),

    // bing
    getBing () {
      bing().then((res) => {
        console.log('必应图片', res.data)
      }, error => {
        console.log(error)
      })
    },

    // handler
    getCaptcha () {
      captcha().then((res) => {
        this.codeUrl = res.data
        this.form.uuid = res.id
      }, error => {
        console.log(error)
      })
    },
    // 登录
    handleLogin () {
      this.Login(this.form)
        .then((res) => {
          alert('登录成功')
          this.$router.push({ path: '/home' })
        })
        .catch(err => { return err })
        .finally(() => {
        })
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
