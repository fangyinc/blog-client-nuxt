<template>
  <v-card>
    <v-card-title>
      <div class="headline mx-auto">
        <span >{{infoType}}({{infoName}})下共有{{totalElements}}篇文章</span>
      </div>
      <v-btn color="primary" fab small v-if="canEdit" @click="deleteInfo">
        <v-icon medium class="icon-pos">delete</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <div v-for="post in posts" :key="post.title">
        <post-summary :post="post">
        </post-summary>
      </div>
    </v-card-text>
  </v-card>

</template>

<script>
  import postSummary from './PostSummary'

  export default {
    name: 'PostInfo',
    props: {
      posts: {
        type: Array,
        required: true
      },
      infoName: {
        type: String,
        required: true
      },
      infoType: {
        type: String,
        required: true
      },
      totalElements: {
        type: Number,
        required: true
      }
    },
    methods: {
      deleteInfo () {
        if (!confirm('确认删除' + this.infoType + '(' + this.infoName + ')吗？')) {
          return
        }
        this.$emit('delete')
      }
    },
    components: {
      postSummary
    },
    computed: {
      canEdit () {
        return this.$store.state.user.isLogin
      }
    }
  }
</script>

<style scoped>
  .icon-pos {
    margin-top: 30%;
  }
</style>