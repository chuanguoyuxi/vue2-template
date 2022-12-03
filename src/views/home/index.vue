<template>
    <div>
        <div>
            <h1>信息</h1>
            <div>token:{{token}}</div>
            <br />
            <div>userInfo:{{userInfo}}</div>
        </div>

        <div>
            <button @click="handleLogout">退出</button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'indexHome',
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
    ...mapActions(['Logout']),

    // handler
    handleLogout () {
      this.Logout().then(() => {
      })
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
