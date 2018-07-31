<template>
  <div>
    <left-drawer
        :drawer.sync="drawer"
        :menuItems="menuItems"></left-drawer>
    <v-toolbar app fixed >
      <v-toolbar-side-icon @click="show" v-if="!drawer"></v-toolbar-side-icon>
      <v-btn icon v-if="drawer" @click="drawer=!drawer">
        <v-icon>close</v-icon>
      </v-btn>
      <nuxt-link to="/" class="cfy-my-link">
        <v-toolbar-title v-if="!showSearch" v-bind:class="{'hidden-sm-and-down': false}">Staneyffer</v-toolbar-title>
      </nuxt-link>
      <v-spacer v-bind:class="{'hidden-sm-and-down': true}">
      </v-spacer>
      <!--<v-container fluid>-->
      <v-layout row wrap>
        <!--<v-flex lg6>-->
        <!--</v-flex>-->
        <v-flex md6 xs10>
          <v-btn
              icon v-if="!showSearch"
              @click="handleSBT"
              v-bind:class="{'hidden-md-and-up': true}"
              style="margin-left: 70%;">
            <v-icon>search</v-icon>
          </v-btn>
          <search-box v-bind:class="{'hidden-sm-and-down': true}"></search-box>
          <search-box style="margin-top: 3%" v-if="showSearch"></search-box>
          <!--<search-post v-bind:class="{'hidden-sm-and-down': true}"></search-post>-->
          <!--<search-post style="margin-top: 3%" v-if="showSearch"></search-post>-->
        </v-flex>
        <v-flex md4 offset-md1 v-bind:class="{'hidden-sm-and-down': true}">
          <v-layout row wrap>
            <v-flex v-for="(item, i) in menuItems" :key="i" v-if="item.active">
              <!--   -->
              <v-btn icon :to="item.url">
                <v-icon>{{item.icon}}</v-icon>
                <span>{{item.name}}</span>
              </v-btn>
            </v-flex>
            <v-flex v-bind:class="{'hidden-sm-and-down': true}" v-if="isLogin">
              <v-menu offset-y>
                <v-btn slot="activator" flat>用户</v-btn>
                <v-list>
                  <v-list-tile
                      v-for="(item, index) in userMenuItems" :key="index">
                    <!--  -->
                    <nuxt-link :to="item.url" class="cfy-my-link">
                      <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                    </nuxt-link>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex md1 xs1 v-bind:class="{'hidden-md-and-up': true}">
          <v-menu bottom left min-width="100px" style="margin-left: 80%; margin-top: 55%">
            <!--<v-btn slot="activator" icon dark>
              <v-icon>more_vert</v-icon>
            </v-btn>-->
            <v-icon slot="activator">more_vert</v-icon>
            <v-list>
              <!---->
              <v-list-tile v-for="(item, i) in menuItems" :key="i" :to="item.url" v-if="item.active">
                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
              </v-list-tile>
              <v-list-tile
                  v-if="isLogin"
                  v-for="(item, index) in userMenuItems" :key="item.name">
                <!--   -->
                <nuxt-link :to="item.url" class="cfy-my-link">
                  <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                </nuxt-link>
              </v-list-tile>

            </v-list>
          </v-menu>
        </v-flex>
      </v-layout>
    </v-toolbar>
    <!--<notifications group="user" position="top center" :duration="1500"/>-->
    <!--<notifications group="post" position="top center" :duration="1500"/>-->
  </div>
</template>

<script>
  import leftDrawer from './LeftDrawer'
  import searchBox from './SearchBox'

  export default {
    name: 'Header',
    data: () => {
      return {
        drawer: false,
        showSearch: false,
        appendIcon: null,
        hiddenTitle: false
      }
    },
    methods: {
      show () {
        this.drawer = !this.drawer
      },
      handleSBT () {
        this.showSearch = !this.showSearch
        this.hiddenTitle = true
      },
      searchChange () {
        if (this.appendIcon === null) {
          this.appendIcon = 'clear'
        } else {
          this.appendIcon = null
        }
        this.showSearch = false
        // this.hiddenTitle = false
      }
    },
    computed: {
      isLogin () {
        return this.$store.state.user.isLogin
      },
      user () {
        return this.$store.state.user.authUser
      },
      menuItems () {
        return [
          {url: '/post/archive', name: '归档', icon: 'archive', active: true},
          {url: '/friend', name: '友链', icon: 'link', active: true},
          {url: '/register', name: '注册', icon: 'person_add', active: !this.isLogin},
          {url: '/login', name: '登录', icon: 'person', active: !this.isLogin}
        ]
      },
      userMenuItems () {
        return [
          {name: '账户', url: '/user/' + this.user.id || 1},
          {name: '写文章', url: '/post/create'},
          {name: '草稿箱', url: '/post/draft'},
          {name: '添加友链', url: '/friend/create'},
          {name: '注销', url: '/logout'}
        ]
      }
    },
    components: {
      leftDrawer,
      searchBox
    }
  }
</script>

<style scoped>

</style>