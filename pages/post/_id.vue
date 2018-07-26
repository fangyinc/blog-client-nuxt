<template>
	<div>
    <post-detail :post="post"></post-detail>
    <v-card class="elevation-4" v-if="post.comments.length">
      <!--<vm-back-top></vm-back-top>-->
      <v-card-title>
        <div class="headline">
          <span>留言 ({{post.comments.length}}条)</span>
        </div>
      </v-card-title>
      <v-container fluid grid-list-sm>
        <v-layout row wrap align-center>
          <v-flex v-for="(comment, i) in post.comments" :key="i" xs12 md12>
            <!--<div >-->
            <comment-show
                :comment="comment"
                :canEdit="canEdit"
                @delete="deleteComment"
                @reply="handleReply"></comment-show>
            <!--</div>-->
          </v-flex>
        </v-layout>
      </v-container>
      <!--<v-pagination :length="post.comments.length" v-model="page"
                    @input="pageChanged"
                    :total-visible="7"></v-pagination>-->
    </v-card>
    <comment-editor id="cmd"
                    :content="commentContent" :user="commentUser"
                    @upload="uploadComment"
                    @change="commentChange"></comment-editor>
  </div>
</template>

<script>
  import postDetail from '../../components/common/PostDetail'
  // import commentEditor from '../../components/common/CommentEditor'
  import commentShow from '../../components/common/CommentShow'

  import postApi from '../../api/post'
  import commentApi from '../../api/comment'
  const commentEditor = () => import('../../components/common/CommentEditor')

  export default {
    validate ({ params }) {
      // Must be a number
      return /^\d+$/.test(params.id)
    },
    name: 'PostShowById',
    async asyncData ({route}) {
      let post = await postApi.getPostById(route.params.id)
        .then(res => { return res.data.body }).catch(err => console.log(err))
      return {
        post: post
      }
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
      commentChange (html) {
        // this.commentContent = html
      },
      uploadComment (commentContent) {
        // alert(this.commentContent)
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
            this.$log.debug(res)
            this.$notify({
              group: 'post',
              title: '评论成功'
            })
            this.commentContent = ''
            this.getPost()
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
            this.getPost()
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
      }
    },
    components: {
      postDetail,
      commentShow,
      commentEditor
    }
  }
</script>

<style scoped>

</style>