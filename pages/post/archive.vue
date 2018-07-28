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

  export default {
    name: 'archive',
    head () {
      return {
        title: '归档',
        meta: this.headMeta
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
    computed: {
      headMeta () {
        /**
         * 设置 meta: description 为第一篇文章的简介; keywords 为第一篇文章的标签及分类
         * @type {Array}
         */
        let data = []
        if (this.posts.length > 0 && this.posts[0].length > 0) {
          let firstPost = this.posts[0][0]
          data.push({ hid: 'description', name: 'description', content: firstPost.summary })
          let keys = firstPost.tags.reduce((a, b) => { return a.name.concat(' | ' + b.name) })
          data.push({ hid: 'keywords', name: 'keywords', content: keys + ' | ' + firstPost.category.name })
          return data
        }
        return data
      }
    }
  }
</script>

<style scoped>

</style>