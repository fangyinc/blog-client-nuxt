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

      <v-card-title>
        <span class="headline mx-auto">{{ post.title }}</span>
      </v-card-title>
      <v-card-title v-show="true">
        <span>{{post.summary}}...</span>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-actions>
        <span @click.prevent="toInfo(`/category/` + post.category.id)">
          <v-icon>note</v-icon>
          <span>{{post.category.name}}</span>
        </span>
        <div
            v-bind:class="{'hidden-sm-and-down': true}"
            v-for="tag in post.tags" :key="tag.id">
          <div @click.prevent="toInfo(`/tag/` + tag.id)">
            <v-icon>bookmark</v-icon>
            <span>{{tag.name}}</span>
          </div>
        </div>
        <div
            v-bind:class="{'hidden-sm-and-down': true}"
            v-for="(sec, index) in post.sections" :key="index">
          <div @click.prevent="toInfo(`/section/` + sec.id)">
            <v-icon>view_column</v-icon>
            <span>{{sec.name}}</span>
          </div>
        </div>
        <v-spacer></v-spacer>
        <v-icon>date_range</v-icon>
        <span>{{post.createTime}}</span>
        <div @click.prevent="toInfo(`/post/` + post.id)">
          <v-btn flat color="blue" >更多</v-btn>
        </div>
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
    },
    methods: {
      toInfo (routerPath) {
        this.$router.push({
          path: routerPath
        })
      }
    }
  }
</script>

<style scoped>

</style>