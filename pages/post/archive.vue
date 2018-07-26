<template>
  <v-card>
    <v-card-title>
      <div class="headline mx-auto">归档</div>
    </v-card-title>
    <v-divider></v-divider>
    <v-layout row wrap>
      <v-flex offset-xs1 xs10>
        <v-list>
          <v-list-group
              v-for="(k,i) in items"
              :key="i"
              no-action
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  <span>{{k[0]}}年{{k[1]}}月</span>
                </v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <span>({{k[2]}})</span>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile
                v-for="subItem in posts[i]" :key="subItem.title">
              <v-list-tile-content>
                <nuxt-link :to="`/post/` + subItem.id" class="cfy-my-link">
                  <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                </nuxt-link>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-flex>
    </v-layout>
    <no-ssr>
      <vm-back-top></vm-back-top>
    </no-ssr>
  </v-card>
</template>

<script>
  import postApi from '../../api/post'
  import axios from 'axios'
  const VmBackTop = () => import('vue-multiple-back-top')

  export default {
    name: 'archive',
    head () {
      return {
        title: '归档'
      }
    },
    async asyncData () {
      let items = await postApi.archive()
        .then(res => {
          return res.data.body
        })
        .catch(err => {
          this.$log.debug(err)
        })
      let posts = await axios.all(items.map(p => {
        let date = new Date()
        date.setFullYear(p[0], p[1] - 1)
        return postApi.getPostByTime({date: date})
      }))
        .then(axios.spread((...res) => {
          return res.map(r => { return r.data.body })
        }))
        .catch(err => { console.log(err) })
      return {
        items: items,
        posts: posts
      }
    },
    components: {
      VmBackTop
    }
  }
</script>

<style scoped>

</style>