<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 v-for="(item, index) in items" :key="index">
        <v-card>
          <v-card-title class="right-title" align-center justify-center>{{item.title}}</v-card-title>
          <v-divider></v-divider>
          <v-list>

            <v-list-tile
                :append="true" v-for="(k, i) in item.data" :key="i">
              <v-list-tile-content>
                <nuxt-link :to="item.url + k.info.id" class="cfy-my-link">
                  <span>{{k.info.name}}</span>
                </nuxt-link>
              </v-list-tile-content>
              <v-list-tile-action>
                <span>({{k.postCount}})</span>
              </v-list-tile-action>
            </v-list-tile>

          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'RightSide',
    computed: {
      items () {
        let arr = []
        arr.push({
          title: '分类',
          url: '/category/',
          data: this.$store.state.category.list
        })
        arr.push({
          title: '标签',
          url: '/tag/',
          data: this.$store.state.tag.list
        })
        arr.push({
          title: '专栏',
          url: '/section/',
          data: this.$store.state.section.list
        })
        return arr
      }
    }
  }
</script>

<style scoped>

</style>