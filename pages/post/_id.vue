<template>
	<div>
    <post-detail :post="post"></post-detail>
 <!--   <div>
      <v-card class="elevation-4" v-if="commentsLength">
        <v-card-title>
          <div class="headline">
            <span>留言 ({{commentsLength}}条)</span>
          </div>
        </v-card-title>
        <v-container fluid grid-list-sm>
          <v-layout row wrap align-center>
            <v-flex v-for="(comment, i) in post.comments" :key="i" xs12 md12>
              <comment-show
                  :comment="comment"
                  :canEdit="canEdit"
                  @delete="deleteComment"
                  @reply="handleReply"></comment-show>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <no-ssr>
        <comment-editor id="cmd"
                        :content="commentContent" :user="commentUser"
                        @upload="uploadComment"></comment-editor>
      </no-ssr>
    </div>
    -->
    <v-card class="elevation-6">

      <v-card-text>
        <no-ssr placeholder="载入评论中....">
          <livere-comment id="city" uid="MTAyMC8zMDA0OC82NjEy"></livere-comment>
        </no-ssr>
      </v-card-text>

    </v-card>

    <vm-back-top></vm-back-top>

  </div>
</template>

<script>
  import postDetail from '../../components/common/PostDetail'
  // import commentEditor from '../../components/common/CommentEditor'
  import commentShow from '../../components/common/CommentShow'
  import {GET_POST_BY_ID} from '../../store/post'
  // import postApi from '../../api/post'
  import commentApi from '../../api/comment'
  import livereComment from '../../components/common/LivereComment'

  const commentEditor = () => import('../../components/common/CommentEditor')
  // const livereComment = () => import('../../components/common/LivereComment')
  // const VueLivere = () => import('vue-livere/VueLivere')

  export default {
    validate ({ params }) {
      // Must be a number
      return /^\d+$/.test(params.id)
    },
    name: 'PostShowById',
    head () {
      return {
        // 经过测试发现这里如果使用this.post.title的话会在客户端渲染标题，
        // 所以直接在asyncData中返回标题，确保在服务端就能渲染标题
        title: this.post.title,
        meta: this.headMeta
      }
    },
    async fetch ({route, store, error}) {
      return store.dispatch('post/' + GET_POST_BY_ID, route.params.id)
        .catch(res => {
          error({ statusCode: 404, message: '没有这篇文章' })
        })
    },
    data () {
      return {
        commentContent: '',
        commentUser: {
          name: '',
          email: '',
          siteUrl: ''
        }
      }
    },
    methods: {
      uploadComment (commentContent) {
        console.log(this.commentUser)
        let comment = {
          name: this.commentUser.name,
          email: this.commentUser.email,
          siteUrl: this.commentUser.siteUrl,
          contentHtml: commentContent,
          post: this.post
        }
        commentApi.uploadComment(this.post.id, comment)
          .then(res => {
            this.$notify({
              group: 'post',
              title: '评论成功'
            })
            this.commentContent = ''
            // this.$router
            this.$store.dispatch('post/' + GET_POST_BY_ID, this.$route.params.id)
          })
          .catch(err => {
            this.$log.error(err)
            this.$notify({
              group: 'post',
              title: '评论失败'
            })
          })
      },
      handleReply (replyText) {
        this.commentContent = replyText
        this.$vuetify.goTo('#cmd')
      },
      deleteComment (commentId) {
        if (!confirm('确认删除该留言吗？')) {
          return
        }
        commentApi.deleteCommentById(commentId)
          .then(res => {
            this.$log.debug(res)
            this.$notify({
              group: 'post',
              title: '删除留言成功'
            })
            this.$store.dispatch('post/' + GET_POST_BY_ID, this.$route.params.id)
          })
          .catch(err => {
            this.$log.error(err)
            this.$notify({
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
      isServer () {
        return process.server
      },
      commentToEditor () {
        return this.commentContent
      },
      commentsLength () {
        if (this.post.comments) {
          return this.post.comments.length
        }
        return 0
      },
      post () {
        return this.$store.state.post.postDetail
      },
      postUrl () {
        if (this.post.id) {
          return process.env.deployUrl + '/post/' + this.post.id
        } else {
          return ''
        }
      },
      headMeta () {
        /**
         * 设置 meta: description 为文章的简介; keywords 为文章的标签及分类
         * @type {Array}
         */
        let data = []
        if (this.post.id) {
          let firstPost = this.post
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
      postDetail,
      commentShow,
      commentEditor,
      livereComment
    }
  }
</script>

<style scoped>

</style>