<template>
	<v-navigation-drawer
			v-model="drawer"
			app
			@input="handleInput">
		<v-card>
			<v-card-media src="https://my-blog-images.oss-cn-qingdao.aliyuncs.com/oss_test3.jpg" height="300px">
				<v-layout column class="media">
					<router-link to="/">
						<v-card-title>
							<v-avatar
									:tile="tile"
									:size="avatarSize"
									class="grey lighten-4"
									to="/"
							>
								<img src="https://my-blog-images.oss-cn-qingdao.aliyuncs.com/about_225.jpg" alt="avatar">
							</v-avatar>
						</v-card-title>
					</router-link>
					<v-spacer></v-spacer>
					<v-card-title class="white--text pl-5 pt-5">
						<div class="display-1 pl-2 pt-5">{{user.username}}</div>
						<span class="title">
							{{user.signature}}
						</span>
					</v-card-title>
				</v-layout>
			</v-card-media>
			<v-list class="pt-0" dense>
				<v-divider></v-divider>
				<v-list-tile v-for="(item, index) in menuItems" :key="index" v-if="item.active">
					<nuxt-link :to="item.url" class="cfy-my-link">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            </v-list-tile-content>
					</nuxt-link>
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
							v-for="subItem in item.data" :key="subItem.title"
							@click="clickPostInfoItems(infoIndex, subItem.info.id)">
						<v-list-tile-content>
							<v-list-tile-title>{{ subItem.info.name }}</v-list-tile-title>
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
    name: 'BaseLeftDrawer',
    props: {
      drawer: {
        type: Boolean,
        required: true
      },
      menuItems: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>