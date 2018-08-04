<template>
  <v-app absolute>
    <my-header></my-header>
    <v-content>
      <v-container fluid>
        <v-layout row>
          <v-flex md7 sm12 offset-md1>
            <nuxt></nuxt>
          </v-flex>
          <v-flex offset-md1 md2 v-bind:class="{'hidden-sm-and-down': true}">
            <right-side></right-side>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <notifications group="user" position="top center" :duration="1500"/>
    <notifications group="post" position="top center" :duration="1500"/>
    <my-footer></my-footer>
  </v-app>

</template>
<script>
  import rightSide from '../components/layout/RightSide'
  import myHeader from '../components/layout/Header'
  import myFooter from '../components/layout/Footer'

  export default {
    name: 'DefaultLayout',
    head () {
      return {
        title: '程方银的博客'
      }
    },
    components: {
      rightSide,
      myHeader,
      myFooter
    }
  }
</script>