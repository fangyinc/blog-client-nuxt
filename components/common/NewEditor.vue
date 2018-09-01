<template>
  <div>
    <mavon-editor
        v-model="mdValue"
        :codeStyle="codeStyle"
        @change="handleChange"
        @imgAdd="$imgAdd"
        ref="md"></mavon-editor>
  </div>
</template>

<script>
  import postApi from '../../api/post'

  let OSS = require('ali-oss')

  export default {
    name: 'MdEditor',
    props: {
      mdValue: {
        type: String,
        default: ''
      },
      codeStyle: {
        type: String,
        default: 'monokai'
      }
    },
    data () {
      return {
        signature: {},
        ossClient: {}
      }
    },
    mounted () {
      this.getSignature()
      if (process.browser) {
        this.loadPlugins()
        this.mermaid = require('mermaid')
        this.echarts = require('echarts')
      }
    },
    methods: {
      handleChange (val, html) {
        this.change(val, html)
      },
      change (val, html) {
        this.$emit('change', val, html)
      },
      $imgAdd (pos, $file) {
        let newName = this.genImgName($file.name)
        this.ossClient.put(newName, $file)
          .then(res => {
            this.$log.debug(res)
            let httpsUrl = 'https' + res.url.substring(5, res.url.length)
            this.$refs.md.$img2Url(pos, httpsUrl)
          })
          .catch(err => {
            this.$log.debug(err)
          })
      },
      getSignature () {
        postApi.getSignature()
          .then(res => {
            this.signature = res.data.body
            this.ossClient = new OSS(this.signature)
          })
          .catch(err => {
            this.$log.error(err)
          })
      },
      genImgName (oldName) {
        let suffixName = '.' + oldName.split('.').pop() // 得到后缀名
        const rnd = (start, end) => {
          // 指定范围的随机整数
          return Math.floor(Math.random() * (end - start) + start)
        }
        return (new Date().getTime()).toString() + rnd(1000, 10000).toString() + suffixName
      },
      loadPlugins () {
        let markdownItMermaid = require('../../plugins/markdown-it-mermaid')
        // let markdownItCharts = require('../../plugins/markdown-it-charts')
        let md = this.$refs.md.markdownIt
        md.use(markdownItMermaid)
        md.use(this.getChart())
      },
      getChart () {
        // /* eslint-disable */
        const ChartsPlugin = (md) => {
          const tokenInfo = {
            CHART: 'chart',
            ECHARTS: 'echarts',
            HIGHCHARTS: 'highcharts',
            CHARTIST: 'chartist',
            C3: 'c3',
            TAUCHARTS: 'taucharts'
          }
          const temp = md
            .renderer
            .rules
            .fence
            .bind(md.renderer.rules)
          if (Object.freeze) {
            Object.freeze(tokenInfo)
          }
          md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
            const token = tokens[idx]
            const code = token
              .content
              .trim()
            if (Object.keys(tokenInfo).some((key) => token.info === tokenInfo[key])) {
              try {
                const json = JSON.parse(code)
                switch (token.info) {
                  case tokenInfo.CHART:
                    return `<canvas class="chartjs">${JSON.stringify(json)}</canvas>`
                  case tokenInfo.ECHARTS:
                    return `<div class="echarts"></div><div class="echarts-data" style='display:none'>${JSON.stringify(json)}</div>`
                  case tokenInfo.HIGHCHARTS:
                    return `<div class="highcharts"><div class="highcharts-data" style='display:none'>${JSON.stringify(json)}</div></div>`
                  case tokenInfo.CHARTIST:
                    return `<div class='ct-chart ct-golden-section'></div><div class='chartist-data' style='display:none'>${JSON.stringify(json)}</div>`
                  case tokenInfo.C3:
                    return `<div class='c3-chart' id=${json
                      .id}></div><div class='c3-data' style='display:none'>${JSON
                      .stringify(json)}</div>`
                  case tokenInfo.TAUCHARTS:
                    return `<div class='taucharts' id=${json
                      .id}></div><div class='taucharts-data' style='display:none'>${JSON
                      .stringify(json)}</div>`
                  default:
                    break
                }
              } catch (err) {
                return `<pre>${err}</pre>`
              }
            }
            return temp(tokens, idx, options, env, slf)
          }
        }
        return ChartsPlugin
      }
    },
    watch: {
      mdValue: {
        immediate: true,
        handler (val) {
          this.$nextTick(() => {
            if (process.browser) {
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
              this.mermaid.init(undefined, document.querySelectorAll('.mermaid'))
            }
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>