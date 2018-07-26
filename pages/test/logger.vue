<template>
	<div>
		<notifications group="user" position="top center" :duration="1500"/>
		<notifications group="post" position="top center" :duration="1500"/>
		<h1>This is logger test</h1>
		<button @click="clickBtn">This button</button>
	</div>
</template>

<script>
  export default {
    name: 'logger',
    layout: 'test',
    methods: {
      clickBtn () {
        // console.log(this.$log)
        this.$log.info('hehe')
        this.$notify({
          group: 'user',
          title: '登录成功'
        })
      }
    }
  }
</script>

<style scoped>

</style>