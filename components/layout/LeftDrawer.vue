<template>
  <v-navigation-drawer
      v-model="drawer"
      app
      @input="handleInput">
    <v-card>
      <v-card-media src="user.backgroundImg" height="300px">
        <v-layout column class="media">
          <nuxt-link to="/">
            <v-card-title>
              <v-avatar
                  :tile="tile"
                  :size="avatarSize"
                  class="grey lighten-4"
                  to="/"
              >
                <img :src="user.avatarImg" alt="avatar">
              </v-avatar>
            </v-card-title>
          </nuxt-link>
          <v-spacer></v-spacer>
          <v-card-title class="white--text mx-auto">
            <div class="display-1 pl-2 pt-5">{{user.username}}</div>
          </v-card-title>
          <v-card-title class="white--text mx-auto">
             <span >
							{{user.signature}}
						</span>
          </v-card-title>
        </v-layout>
      </v-card-media>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in menuItems" :key="item.name" v-if="item.active">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <!-- :to="item.url" -->
            <nuxt-link :to="item.url" class="cfy-my-link">
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            </nuxt-link>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>

        <v-list-group
            v-for="(item, infoIndex) in postInfoItems"
            v-model="item.active"
            :key="item.title"
            :prepend-icon="item.icon"
            no-action
        >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
              v-for="subItem in item.data" :key="subItem.title">
            <v-list-tile-content>
              <nuxt-link :to="item.url + subItem.info.id" class="cfy-my-link">
                <v-list-tile-title>{{ subItem.info.name }}</v-list-tile-title>
              </nuxt-link>
            </v-list-tile-content>
            <v-list-tile-action>
              <span>({{subItem.postCount}})</span>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-card>

  </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'LeftDrawer',
    props: {
      drawer: {
        type: Boolean,
        default: false
      },
      menuItems: {
        type: Array,
        required: true
      }
    },
    data: () => {
      return {
        avatarSize: 100,
        tile: false // 头像边框形状（false为圆形
      }
    },
    methods: {
      handleInput () {
        this.$emit('update:drawer', this.drawer)
      }
    },
    computed: {
      user () {
        return this.$store.state.user.authUser
      },
      postInfoItems () {
        let arr = []
        arr.push({
          title: '分类',
          url: '/category/',
          data: this.$store.state.category.list
        })
        arr.push({
          title: '标签',
          url: '/tag/',
          data: this.$store.state.tag.list
        })
        arr.push({
          title: '专栏',
          url: '/section/',
          data: this.$store.state.section.list
        })
        return arr
      }
    }
  }
</script>

<style scoped>

</style>