<template>
  <v-card>
    <v-container fluid grid-list-lg>
      <v-layout row wrap align-center>
        <v-flex xs12 md12>
          <div v-for="post in posts" :key="post.id">
            <post-summary :post="post"/>
          </div>
        </v-flex>
      </v-layout>
    </v-container>

    <v-card-title>
      <v-pagination :length="totalPages" v-model="page" class="mx-auto"
                    @input="pageChanged"
                    :total-visible="7"></v-pagination>
    </v-card-title>

  </v-card>
</template>

<script>
  /**
   * 主页
   */
  import postSummary from '../components/common/PostSummary'
  import postApi from '../api/post'
  export default {
    name: 'index',
    data () {
      return {
        page: 1
      }
    },
    methods: {
      pageChanged () {
        this.$store.dispatch('post/' + 'GET_POST_LIST', this.page)
      }
    },
    mounted () {
      postApi.allPost()
        .then(res => {
          this.$store.dispatch('post/SET_POST_LIST', {
            content: res.data.body.content,
            totalPages: res.data.body.totalPages
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    computed: {
      posts () {
        return this.$store.state.post.list.content
      },
      totalPages () {
        return this.$store.state.post.list.totalPages
      }
    },
    components: {
      postSummary
    }
  }
</script>