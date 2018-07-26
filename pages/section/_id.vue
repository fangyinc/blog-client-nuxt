<template>
  <v-card>
    <post-info
        :posts="posts"
        :info-name="infoName"
        info-type="专栏"
        :total-elements="totalElements"
        @delete="deleteInfo">
    </post-info>
    <v-card-title>
      <v-pagination :length="totalPages" v-model="page" class="mx-auto"
                    @input="pageChanged"
                    :total-visible="7"></v-pagination>
    </v-card-title>
  </v-card>
</template>

<script>
  import postInfo from '../../components/common/PostInfo'
  import postApi from '../../api/post'

  export default {
    validate ({ params }) {
      // Must be a number
      return /^\d+$/.test(params.id)
    },
    name: 'sectionId',
    data () {
      return {
        totalPages: 0,
        page: 1,
        totalElements: 0,
        posts: []
      }
    },
    mounted () {
      this.getPosts()
    },
    methods: {
      pageChanged () {
        this.getPosts()
      },
      getPosts () {
        let $vm = this
        postApi.getPostBySecId(this.$route.params.id, this.page)
          .then(res => {
            $vm.$log.debug(res.data.body.content)
            $vm.totalPages = res.data.body.totalPages
            $vm.totalElements = res.data.body.totalElements
            $vm.posts = res.data.body.content
          })
          .catch(res => {
            $vm.$log.info('获取专栏信息失败')
            $vm.$log.info(res.data)
          })
      },
      deleteInfo () {
        let $vm = this
        postApi.deleteSectionById(this.$route.params.id)
          .then(res => {
            $vm.$log.debug(res)
            $vm.$notify({
              group: 'post',
              title: '删除成功'
            })
            this.$router.push({
              path: '/'
            })
          })
          .catch(res => {
            $vm.$log.debug(res)
            $vm.$notify({
              group: 'post',
              title: '删除失败'
            })
          })
      }
    },
    computed: {
      canEdit () {
        return this.$store.state.user.isLogin
      },
      infoName () {
        if (this.posts.length > 0 && this.posts[0].sections.length > 0) {
          return this.posts[0].sections[0].name
        } else {
          return ''
        }
      }
    },
    components: {
      postInfo
    }

  }
</script>

<style scoped>

</style>