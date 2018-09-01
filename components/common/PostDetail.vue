<template>
  <v-card class="elevation-6">
    <v-card-title primary-title>
      <div class="headline mx-auto">
        <span>{{post.title}}</span>
      </div>
      <v-btn color="primary" fab small v-if="canEdit" @click="deletePost">
        <v-icon medium class="icon-pos">delete</v-icon>
      </v-btn>
      <nuxt-link :to="`/post/update/` + post.id" class="cfy-my-link">
        <v-btn color="primary" fab small v-if="canEdit">
          <v-icon medium class="icon-pos">edit</v-icon>
        </v-btn>
      </nuxt-link>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text v-show="true">
      <!--<div v-html="post.contentHtml"></div>-->
      <div class="my-note markdown-body">
        <!--v-note-wrapper v-note-panel v-note-show v-show-content-->
        <div class="v-note-panel shadow">
          <div class="v-note-show">
            <div v-html="post.contentHtml" class="v-show-content scroll-style">
            </div>
          </div>
        </div>
      </div>
    </v-card-text>
    <v-divider/>
    <v-card-actions>
      <nuxt-link :to="`/category/` + post.category.id" class="cfy-my-link">
        <v-icon>note</v-icon>
        <span>{{post.category.name || null}}</span>
      </nuxt-link>
      <span
          v-bind:class="{'hidden-sm-and-down': true}"
          v-for="(tag, i) in post.tags" :key="i">
        <nuxt-link :to="`/tag/` + tag.id" class="cfy-my-link">
          <v-icon>bookmark</v-icon>
          <span>{{tag.name || null}}</span>
        </nuxt-link>
			</span>
      <span
          v-bind:class="{'hidden-sm-and-down': true}"
          v-for="sec in post.sections" :key="sec.name">
        <nuxt-link :to="`/section/` + sec.id" class="cfy-my-link">
          <v-icon>view_column</v-icon>
					<span>{{sec.name || null}}</span>
        </nuxt-link>
			</span>
      <v-spacer></v-spacer>
      <v-icon>date_range</v-icon>
      <span>{{post.createTime}}</span>
    </v-card-actions>
  </v-card>
</template>

<script>
  import loadResource from '~/utils/load-resource'
  import hljsCss from '../../utils/lang.hljs.css'
  import postApi from '../../api/post'
  export default {
    name: 'PostDetail',
    props: {
      codeStyle: {
        type: String,
        default () {
          return 'monokai'
        }
      },
      post: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        s_external_link: {
          markdown_css: function () {
            return 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.9.0/github-markdown.min.css'
          },
          hljs_js: function () {
            return 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js'
          },
          hljs_lang: function (lang) {
            return 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/languages/' + lang + '.min.js'
          },
          hljs_css: function (css) {
            if (hljsCss[css]) {
              return 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/' + css + '.min.css'
            }
            return ''
          },
          katex_js: function () {
            return 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.8.3/katex.min.js'
          },
          katex_css: function () {
            return 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.8.3/katex.min.css'
          }
        }
      }
    },
    mounted () {
      let $vm = this
      if (process.browser) {
        $vm.mermaid = require('mermaid')
        $vm.echarts = require('echarts')
      }
      $vm.loadExternalLink('markdown_css', 'css')
      $vm.loadExternalLink('katex_css', 'css')
      $vm.loadExternalLink('katex_js', 'js')
      $vm.loadExternalLink('hljs_js', 'js')
      $vm.codeStyleChange($vm.codeStyle, true)
    },

    methods: {
      loadExternalLink (name, type, callback) {
        if (typeof this.s_external_link[name] !== 'function') {
          if (this.s_external_link[name] !== false) {
            console.error('external_link.' + name,
              'is not a function, if you want to disabled this error log, set external_link.' + name,
              'to function or false')
          }
          return
        }
        var _obj = {
          'css': loadResource.loadLink,
          'js': loadResource.loadScript
        }
        if (_obj.hasOwnProperty(type)) {
          _obj[type](this.s_external_link[name](), callback)
        }
      },
      codeStyleChange (val, isInit) {
        if (!isInit) {
          isInit = false
        }
        if (typeof this.s_external_link.hljs_css !== 'function') {
          if (this.s_external_link.hljs_css !== false) {
            console.error('external_link.hljs_css is not a function, if you want to disabled this error log, set external_link.hljs_css to function or false')
          }
          return
        }
        var url = this.s_external_link.hljs_css(val)
        if (url.length === 0 && isInit) {
          console.warn('hljs color scheme', val, 'do not exist, loading default monokai')
          url = this.s_external_link.hljs_css('monokai')
        }
        if (url.length > 0) {
          loadResource.loadLink(url)
        } else {
          console.warn('hljs color scheme', val, 'do not exist, hljs color scheme will not change')
        }
      },
      deletePost () {
        if (!confirm('确认删除该文章吗?')) {
          return
        }
        postApi.deletePostById(this.post.id)
          .then(res => {
            this.$log.debug(res)
            this.$notify({
              group: 'post',
              title: '文章删除成功'
            })
            this.$router.push({
              path: '/'
            })
          })
          .catch(err => {
            this.$log.debug(err)
          })
      },
      toInfo (routerName, id) {
        this.$router.push({
          name: routerName,
          params: {id: id}
        })
      }
    },
    computed: {
      canEdit () {
        return this.$store.state.user.isLogin
      }
    },
    watch: {
      codeStyle: function (val) {
        this.codeStyleChange(val)
      },
      post: {
        immediate: true,
        handler (val) {
          this.$nextTick(() => {
            if (process.browser) {
              // 渲染chart
              const changeEchart = (option, element) => {
                let w = option.hasOwnProperty('width') ? (option.width + 'px') : 'auto'
                let h = option.hasOwnProperty('height') ? (option.height + 'px') : '400px'
                element.style.width = w
                element.style.height = h
              }
              let chartElements = document.querySelectorAll('.echarts-data')
              let showElements = document.querySelectorAll('.echarts')
              for (let i = 0; i < chartElements.length; i++) {
                let element = chartElements[i]
                let options = JSON.parse(element.textContent)
                changeEchart(options, showElements[i])
                let chart = this.echarts.init(showElements[i])
                chart.setOption(options)
                console.log(options)
              }
              // 渲染mermaid代码
              this.mermaid.init(undefined, document.querySelectorAll('.mermaid'))
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
.icon-pos {
  margin-top: 30%;
}
</style>