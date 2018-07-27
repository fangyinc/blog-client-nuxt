<template>
  <nuxt-link :to="`/post/` + post.id" class="cfy-my-link">
    <v-card class="my-3" hover>
      <v-card-media
          class="white--text"
          height="200px"
          :src="post.img">
      </v-card-media>
      <v-container fill-height fluid>
        <v-layout fill-height>
          <v-flex xs12 align-end flexbox>
            <v-card-title>
              <span class="headline mx-auto">{{ post.title }}</span>
            </v-card-title>
          </v-flex>
        </v-layout>
      </v-container>

      <v-card-title v-show="true">
        <span>{{post.summary}}...</span>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-actions>
        <!-- prevent: 提交事件不再重载页面 -->
        <nuxt-link :to="`/category/` + post.category.id" class="cfy-my-link">
          <v-icon>note</v-icon>
          <span>{{post.category.name}}</span>
        </nuxt-link>

        <div
            v-bind:class="{'hidden-sm-and-down': true}"
            v-for="tag in post.tags" :key="tag.id">
          <nuxt-link :to="`/tag/` + tag.id" class="cfy-my-link">
            <v-icon>bookmark</v-icon>
            <span>{{tag.name}}</span>
          </nuxt-link>
        </div>
        <div
            v-bind:class="{'hidden-sm-and-down': true}"
            v-for="(sec, index) in post.sections" :key="index">
          <nuxt-link :to="`/section/` + sec.id" class="cfy-my-link">
            <v-icon>view_column</v-icon>
            <span>{{sec.name}}</span>
          </nuxt-link>
        </div>
        <v-spacer></v-spacer>
        <v-icon>date_range</v-icon>
        <span>{{post.createTime}}</span>
        <nuxt-link  :to="`/post/` + post.id" class="cfy-my-link">
          <v-btn flat color="blue">更多</v-btn>
        </nuxt-link>
      </v-card-actions>

    </v-card>
  </nuxt-link>
</template>

<script>
  export default {
    name: 'PostSummary',
    props: {
      post: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        postUrl: '/post/',
        tagUrl: '/tag/',
        cateUrl: '/category/',
        sectionUrl: '/section/'
      }
    }
  }
</script>

<style scoped>

</style>