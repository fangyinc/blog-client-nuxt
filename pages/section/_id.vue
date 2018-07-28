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
  import postInfo from '../../components/common/PostInfo'
  import postApi from '../../api/post'
  import {GET_SEC_ID_POST, GET_SEC_BY_ID} from '../../store/section'

  export default {
    validate ({ params }) {
      // Must be a number
      return /^\d+$/.test(params.id)
    },
    head () {
      return {
        title: '专栏(' + this.infoName + ')',
        meta: this.headMeta
      }
    },
    name: 'sectionId',
    fetch ({store, route}) {
      return Promise.all([
        store.dispatch('section/' + GET_SEC_ID_POST, {id: route.params.id, page: 1}),
        store.dispatch('section/' + GET_SEC_BY_ID, route.params.id)
      ])
    },
    data () {
      return {
        currentPage: 1
      }
    },
    methods: {
      pageChanged () {
        return this.$store.dispatch('section/' + GET_SEC_ID_POST, {id: this.$route.params.id, page: this.currentPage})
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
      posts () {
        return this.$store.state.section.postList.list
      },
      totalElements () {
        return this.$store.state.section.postList.totalElements
      },
      totalPages () {
        return this.$store.state.section.postList.totalPages
      },
      infoName () {
        return this.$store.state.section.info.name
      },
      headMeta () {
        /**
         * 设置 meta: description 为第一篇文章的简介; keywords 为第一篇文章的标签及分类
         * @type {Array}
         */
        let data = []
        if (this.posts.length > 0) {
          let firstPost = this.posts[0]
          data.push({ hid: 'description', name: 'description', content: firstPost.summary })
          let keys = firstPost.tags.reduce((a, b) => { return a.name.concat(' | ' + b.name) })
          data.push({ hid: 'keywords', name: 'keywords', content: keys + ' | ' + firstPost.category.name })
          return data
        }
        return data
      }
    },
    components: {
      postInfo
    }

  }
</script>

<style scoped>

</style>