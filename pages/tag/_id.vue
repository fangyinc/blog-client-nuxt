<template>
  <v-card>
    <post-info
        :posts="posts"
        :info-name="infoName"
        info-type="标签"
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
  import {GET_TAG_ID_POST, GET_TAG_BY_ID} from '../../store/tag'

  export default {
    validate ({ params }) {
      // Must be a number
      return /^\d+$/.test(params.id)
    },
    name: 'tagId',
    head () {
      return {
        title: '标签(' + this.infoName + ')',
        meta: this.headMeta
      }
    },
    fetch ({store, route}) {
      return Promise.all([
        store.dispatch('tag/' + GET_TAG_ID_POST, {id: route.params.id, page: 1}),
        store.dispatch('tag/' + GET_TAG_BY_ID, route.params.id)
      ])
    },
    data () {
      return {
        currentPage: 1
      }
    },
    methods: {
      async pageChanged () {
        return this.$store.dispatch('tag/' + GET_TAG_ID_POST, {id: this.$route.params.id, page: this.currentPage})
      },
      deleteInfo () {
        let $vm = this
        postApi.deleteTagById(this.$route.params.id)
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
      posts () {
        return this.$store.state.tag.postList.list
      },
      totalElements () {
        return this.$store.state.tag.postList.totalElements
      },
      totalPages () {
        return this.$store.state.tag.postList.totalPages
      },
      infoName () {
        return this.$store.state.tag.info.name
      },
      canEdit () {
        return this.$store.state.user.isLogin
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
          let tagNames = firstPost.tags.map(t => { return t.name })
          let keys = tagNames.reduce((a, b) => { return a.concat(' | ' + b) })
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