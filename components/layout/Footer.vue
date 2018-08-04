<template>
  <v-footer
      :app="footer.app"
      height="auto"
      :fixed="footer.fixed"
  >
    <v-card
        class="flex"
        flat
        tile
    >
      <v-card-title>

        <v-layout>
          <v-flex offset-md3>
            <a rel="license"
               href="http://creativecommons.org/licenses/by-nc-nd/4.0/"
               target="_blank">
              <img alt="知识共享许可协议" style="border-width:0"
                   src="https://i.creativecommons.org/l/by-nc-nd/4.0/80x15.png" />
            </a>
            本站所有文章均采用<a rel="license"  target="_blank" style="text-decoration: none;"
                        href="http://creativecommons.org/licenses/by-nc-nd/4.0/">
            知识共享署名-非商业性-禁止演绎 4.0 国际许可协议</a>进行许可。
          </v-flex>
        </v-layout>

      </v-card-title>
      <v-divider></v-divider>
      <!---->
      <v-card-actions class="justify-center">
        <v-layout>
          <v-flex offset-md8 md4 offset-xs4>
            <v-btn icon v-for="link in shareLinks" :key="link.url">
              <a v-if="!!link.icon" :href="link.url" class="cfy-my-link" target="_blank">
                <i :class="link.icon" :style="link.styleObj"></i>
              </a>
              <a v-else-if="!!link.img" :href="link.url" class="cfy-my-link" target="_blank">
                <img :src="link.img" :style="link.styleObj"/>
              </a>
              <a v-else :href="link.url" class="cfy-my-link" target="_blank">
                <span :style="link.styleObj">{{link.text}}</span>
              </a>
            </v-btn>
          </v-flex>
        </v-layout>
        <!--&copy;2018 — <strong>ChengFangyin</strong>-->
      </v-card-actions>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    name: 'Footer',
    data: () => ({
      shareLinks: [
        {
          icon: 'fab fa-github-square',
          url: 'https://github.com/staneyffer',
          styleObj: {
            fontSize: '22px'
          }
        },
        {
          img: 'https://static.zhihu.com/static/favicon.ico',
          url: 'https://www.zhihu.com/people/cheng-fang-yin-72',
          styleObj: {
            height: '20px'
          }
        },
        {
          text: '简书',
          url: 'https://www.jianshu.com/u/4152b7e1d47b',
          styleObj: {
            color: 'red',
            fontSize: '15px'
          }
        }
      ],
      footer: {
        fixed: false,
        app: false
      }
    })
  }
</script>

<style scoped>

</style>