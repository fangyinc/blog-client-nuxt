<template>
  <v-app>
    <my-header></my-header>
    <v-content>
      <v-container fluid>
        <nuxt/>
      </v-container>
    </v-content>

    <notifications group="user" position="top center" :duration="1500"/>
    <notifications group="post" position="top center" :duration="1500"/>
    <v-footer app></v-footer>
  </v-app>

</template>

<script>
  import rightSide from '../components/layout/RightSide'
  import myHeader from '../components/layout/Header'

  export default {
    name: 'SimpleLayout',
    components: {
      rightSide,
      myHeader
    }
  }
</script>

<style scoped>

</style>