<template>
	<div>
		<mavon-editor v-model="value"/>
	</div>
</template>

<script>
  export default {
    name: 'md',
    data () {
      return {
        value: 'sfsd'
      }
    },
    asyncData () {
      return {
        serverValue: ''
      }
    }
  }
</script>

<style scoped>

</style>