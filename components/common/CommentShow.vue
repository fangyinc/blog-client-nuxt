<template>
  <v-card>
    <v-card-text>
      <div>
        <v-layout>
          <v-flex xs8>
            <div style="text-align: left;" class="headline">
              <a v-if="comment.siteUrl" :href="comment.siteUrl" target="_blank" style="text-decoration: none;">{{comment.name}}</a>
              <span v-else>{{comment.name}}</span>
              <span>说:</span>
            </div>
          </v-flex>
          <v-flex xs4>
            <div style="text-align: right;">{{comment.createTime}}</div>
          </v-flex>
        </v-layout>
      </div>
      <div class="my-note markdown-body">
        <!--ql-container-->
        <div class="ql-snow">
          <div class="ql-editor">
            <div v-html="comment.contentHtml"></div>
          </div>
        </div>
      </div>
    </v-card-text>
    <v-divider/>
    <v-card-actions>
      <!--<v-btn flat @click="showComments">-->
      <!--<v-icon>comment</v-icon>-->
      <!--<span>全部回复</span>-->
      <!--</v-btn>-->
      <v-btn flat @click="replyComment">
        <v-icon>reply</v-icon>
        <span>回复TA</span>
      </v-btn>
      <v-btn flat @click="deleteComment" v-if="canEdit">
        <v-icon>delete</v-icon>
        <span>删除</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'CommentShow',
    props: {
      comment: {
        type: Object,
        required: true
      },
      canEdit: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      toUserSite () {
        alert(this.comment.siteUrl)
      },
      replyComment () {
        let replyText = `<blockquote><h2>引用<strong>` + this.comment.name + `</strong>的留言:</h2>` +
          this.comment.contentHtml + `</blockquote>` + `<br/><br/><br/>`
        this.$emit('reply', replyText)
      },
      showComments () {
      },
      deleteComment () {
        this.$emit('delete', this.comment.id)
      }
    }
  }
</script>

<style scoped>

</style>