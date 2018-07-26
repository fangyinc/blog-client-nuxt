<template>
  <div class="__nuxt-error-page">
    <h1 v-if="error.statusCode === 404">{{message}}</h1>
    <h1 v-else>{{message}}</h1>
  </div>
</template>

<script>
  export default {
    name: 'ErrorPage',
    props: ['error'],
    layout: 'simple',
    head () {
      return {
        title: this.message
      }
    },
    computed: {
      message () {
        return this.error.message
      }
    }
  }
</script>

<style scoped>
  .__nuxt-error-page {
    padding: 1rem;
    background: #F7F8FB;
    color: #47494E;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: sans-serif;
    font-weight: 100 !important;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .__nuxt-error-page .error {
    max-width: 450px;
  }
  .__nuxt-error-page .title {
    font-size: 1.5rem;
    margin-top: 15px;
    color: #47494E;
    margin-bottom: 8px;
  }
  .__nuxt-error-page .description {
    color: #7F828B;
    line-height: 21px;
    margin-bottom: 10px;
  }
  .__nuxt-error-page a {
    color: #7F828B !important;
    text-decoration: none;
  }
  .__nuxt-error-page .logo {
    position: fixed;
    left: 12px;
    bottom: 12px;
  }
</style>