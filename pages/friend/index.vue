<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">友链</span>
        </v-card-title>
        <v-card-text>
          <v-list three-line>
            <template v-for="(item, index) in items">
                <v-list-tile
                    avatar
                >
                  <a :href="item.siteUrl" target="_blank" :key="index" class="cfy-my-link">
                  <v-list-tile-avatar>
                    <img :src="item.imgUrl">
                  </v-list-tile-avatar>
                  </a>
                  <v-list-tile-content>
                    <v-list-tile-title v-html="item.username"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="item.about"></v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-spacer></v-spacer>

                  <v-list-tile-avatar>
                    <v-btn color="primary" fab small v-if="canEdit" @click="deleteFriend(item.id)">
                      <v-icon medium class="icon-pos">delete</v-icon>
                    </v-btn>
                    <v-btn color="primary" fab small v-if="canEdit" :to="`/friend/update/` + item.id">
                      <v-icon medium class="icon-pos">edit</v-icon>
                    </v-btn>
                  </v-list-tile-avatar>
                </v-list-tile>
            </template>
          </v-list>
          <v-pagination :length="totalPages" v-model="page"
                        @input="pageChanged"
                        :total-visible="7"></v-pagination>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="cancel">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import authApi from '../../api/user'

  export default {
    name: 'friend',
    data () {
      return {
        dialog: true,
        items: [],
        page: 1,
        totalPages: 0
      }
    },
    mounted () {
      this.getFriend()
    },
    methods: {
      deleteFriend (id) {
        if (!confirm('确认删除该友链吗?')) {
          return
        }
        authApi.deleteFriendById(id)
          .then(res => {
            this.$notify({
              group: 'user',
              title: '友链删除成功'
            })
            this.$router.back()
          })
          .catch(err => {
            console.debug(err)
            this.$notify({
              group: 'user',
              title: '友链删除失败'
            })
          })
      },
      cancel () {
        this.dialog = false
        this.$router.back()
      },
      getFriend () {
        authApi.getAllFriend(this.page)
          .then(res => {
            this.totalPages = res.data.body.totalPages
            this.items = res.data.body.content
          })
          .catch(err => {
            this.$log.debug(err)
          })
      },
      pageChanged () {
        this.getFriend()
      }
    },
    computed: {
      canEdit () {
        return this.$store.state.user.isLogin
      }
    }
  }
</script>

<style scoped>

</style>