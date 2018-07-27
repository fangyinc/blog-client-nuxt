<template>
  <div class="container">
    <div v-if="error.statusCode === 404">
      <h1>页面不存在</h1>
      <h3>message: {{message}}</h3>
    </div>
    <div v-else>
      <h1>应用发生错误异常({{message}}):</h1>
      <h3>{{message}}</h3>
    </div>
    <nuxt-link to="/">首 页</nuxt-link>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'simple', // 你可以为错误页面指定自定义的布局,
    computed: {
      message () {
        return this.error.message
      },
      routerName () {
        return this.$route.fullPath
      }
    }
  }
</script>