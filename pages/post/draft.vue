<template>
  <v-card>
    <v-card-title>
      <span class="mx-auto headline">草稿箱共有 {{totalElements}} 篇文章</span>
    </v-card-title>
    <v-container fluid grid-list-lg>
      <v-layout row wrap align-center>
        <v-flex xs12 md12>
          <div v-for="(post, index) in posts" :key="index">
            <post-summary :post="post"></post-summary>
          </div>
        </v-flex>
      </v-layout>
    </v-container>

    <v-card-title>
      <v-pagination :length="totalPages" v-model="currentPage" class="mx-auto"
                    @input="pageChanged"
                    :total-visible="7"></v-pagination>
    </v-card-title>
    <no-ssr>
      <vm-back-top></vm-back-top>
    </no-ssr>
  </v-card></template>

<script>
  import postApi from '../../api/post'
  import postSummary from '../../components/common/PostSummary'
  export default {
    name: 'draftPost',
    data () {
      return {
        currentPage: 1,
        posts: [],
        totalPages: 0,
        totalElements: 0
      }
    },
    mounted () {
      this.getPosts()
    },
    methods: {
      getPosts () {
        postApi.getDraftPost(this.currentPage)
          .then(res => {
            this.posts = res.data.body.content
            this.totalPages = res.data.body.totalPages
            this.totalElements = res.data.body.totalElements
          })
          .catch(err => {
            console.log(err)
          })
      },
      pageChanged () {
        this.getPosts()
      }
    },
    components: {
      postSummary
    }
  }
</script>

<style scoped>

</style>