<template>
  <v-card class="my-3" hover :to="postUrl + post.id">
    <v-card-media
        class="white--text"
        height="200px"
        :src="post.img">
    </v-card-media>
    <v-container fill-height fluid>
      <v-layout fill-height>
        <v-flex xs12 align-end flexbox>
          <span class="headline">{{ post.title }}</span>
        </v-flex>
      </v-layout>
    </v-container>

    <!--<v-card-text v-show="true">
      {{post.summary}}
      <span>...</span>
    </v-card-text>-->

    <v-card-title v-show="true">
      <span>{{post.summary}}...</span>
    </v-card-title>

    <v-divider></v-divider>

    <v-card-actions>
      <!-- prevent: 提交事件不再重载页面 -->
      <nuxt-link :to="cateUrl + post.category.id" class="cfy-my-link">
        <v-icon>note</v-icon>
        <span>{{post.category.name}}</span>
      </nuxt-link>

      <div
          v-bind:class="{'hidden-sm-and-down': true}"
          v-for="tag in post.tags" :key="tag.id">
        <nuxt-link :to="'/tag/' + tag.id" class="cfy-my-link">
          <v-icon>bookmark</v-icon>
          <span>{{tag.name}}</span>
        </nuxt-link>
      </div>
      <div
          v-bind:class="{'hidden-sm-and-down': true}"
          v-for="(sec, index) in post.sections" :key="index">
        <nuxt-link :to="sectionUrl + sec.id" class="cfy-my-link">
          <v-icon>view_column</v-icon>
          <span>{{sec.name}}</span>
        </nuxt-link>
      </div>
      <v-spacer></v-spacer>
      <v-icon>date_range</v-icon>
      <span>{{post.createTime}}</span>
      <v-btn flat color="blue" :to="postUrl + post.id">更多</v-btn>
    </v-card-actions>

  </v-card>
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