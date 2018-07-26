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
              <a :href="item.siteUrl" target="_blank" :key="item.username" style="text-decoration: none; color:black">
                <v-list-tile
                    avatar
                >
                  <v-list-tile-avatar>
                    <img :src="item.imgUrl">
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title v-html="item.username"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="item.about"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </a>
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
    }
  }
</script>

<style scoped>

</style>