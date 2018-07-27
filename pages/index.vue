<template>
  <v-card>
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
  </v-card>
</template>

<script>
  /**
   * 主页, 这里只有第一页的数据是经过服务端渲染的， 其余的都是通过客户端请求重新渲染页面
   */
  import postSummary from '../components/common/PostSummary'
  // import postApi from '../api/post'
  import {GET_POST_LIST, SET_CURRENT_PAGE} from '../store/post'
  // const VmBackTop = () => import('vue-multiple-back-top')

  export default {
    name: 'index',
    async fetch ({store}) {
      let page = 1
      store.dispatch('post/' + SET_CURRENT_PAGE, page)
      return store.dispatch('post/' + GET_POST_LIST, page)
    },
    data () {
      return {
        currentPage: 1
      }
    },
    methods: {
      async pageChanged () {
        return this.$store.dispatch('post/' + GET_POST_LIST, this.currentPage)
      }
    },
    computed: {
      posts () {
        return this.$store.state.post.list.content
      },
      totalPages () {
        return this.$store.state.post.list.totalPages
      },
      page () {
        return this.$store.state.post.pagination.currentPage
      }
    },
    components: {
      postSummary
    }
  }
</script>