<template>
  <div>
    <!--<nuxt-link :to="`/post/` + post.id"></nuxt-link>-->
    <!-- 这里尝试过使用 nuxt-link 但是失败了, 可能是不支持嵌套-->
    <v-card class="my-3" hover :to="`/post/` + post.id">
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
        <v-card-title :to="`/category/` + post.category.id">
          <v-icon>note</v-icon>
          <span>{{post.category.name}}</span>
        </v-card-title>
        <div
            v-bind:class="{'hidden-sm-and-down': true}"
            v-for="tag in post.tags" :key="tag.id">
          <v-card-title :to="`/tag/` + tag.id" >
            <v-icon>bookmark</v-icon>
            <span>{{tag.name}}</span>
          </v-card-title>
        </div>
        <div
            v-bind:class="{'hidden-sm-and-down': true}"
            v-for="(sec, index) in post.sections" :key="index">
          <v-card-title :to="`/section/` + sec.id">
            <v-icon>view_column</v-icon>
            <span>{{sec.name}}</span>
          </v-card-title>
        </div>
        <v-spacer></v-spacer>
        <v-icon>date_range</v-icon>
        <span>{{post.createTime}}</span>
        <v-card-title :to="`/post/` + post.id">
          <v-btn flat color="blue" >更多</v-btn>
        </v-card-title>
      </v-card-actions>

    </v-card>
  </div>
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