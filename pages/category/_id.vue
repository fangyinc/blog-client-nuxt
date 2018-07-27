<template>
  <v-card>
    <post-info
        :posts="posts"
        :info-name="infoName"
        info-type="分类"
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
  import {GET_CATE_ID_POST, GET_CATE_BY_ID} from '../../store/category'

  export default {
    validate ({ params }) {
      // Must be a number
      return /^\d+$/.test(params.id)
    },
    name: 'categoryId',
    head () {
      return {
        title: '分类(' + this.infoName + ')'
      }
    },
    fetch ({store, route}) {
      return Promise.all([
        store.dispatch('category/' + GET_CATE_ID_POST, {id: route.params.id, page: 1}),
        store.dispatch('category/' + GET_CATE_BY_ID, route.params.id)
      ])
    },
    data () {
      return {
        currentPage: 1
      }
    },
    methods: {
      pageChanged () {
        return this.$store.dispatch('category/' + GET_CATE_ID_POST, {id: this.$route.params.id, page: this.currentPage})
      },
      deleteInfo () {
        let $vm = this
        postApi.deleteCateById(this.$route.params.id)
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
        return this.$store.state.category.postList.list
      },
      totalElements () {
        return this.$store.state.category.postList.totalElements
      },
      totalPages () {
        return this.$store.state.category.postList.totalPages
      },
      infoName () {
        return this.$store.state.category.info.name
      }
    },
    components: {
      postInfo
    }
  }
</script>

<style scoped>

</style>