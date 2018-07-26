<template>
  <div>
    <div>
      <v-text-field
          v-model="searchText"
          light
          label="Search"
          solo
          class="mx-3"
          flat
          clearable
          @change="handleChange"
      ></v-text-field>
      <!--<v-progress-linear height="2" :indeterminate="true"></v-progress-linear>-->
    </div>

    <!--<v-spacer></v-spacer>-->
    <div>
      <v-card style="position: fixed;" :width="400" v-if="showItems && !noData">
        <v-progress-circular
            :indeterminate="true"
            color="primary"
            v-if="isLoading"
        ></v-progress-circular>
        <v-container fluid grid-list-md v-if="!isLoading">
          <v-layout row wrap>
            <v-flex v-for="(item, index) in items" :key="index" xs12>
              <v-card hover @click.native="handClick(item.id)">
                <v-card-text>
                  <!--<div class="my-title">{{item.title}}</div>-->
                  <div class="my-title" v-html="item.title"></div>
                  <v-divider/>
                  <div v-html="item.content"></div>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-card style="position: fixed;" v-if="noData">
        <v-card-text>
          <div class="">{{noDataText}}</div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
  import postApi from '../../api/post'
  export default {
    name: 'SearchBox',
    data () {
      return {
        searchText: null,
        items: [],
        isLoading: false,
        showItems: false,
        page: 1,
        postUrl: '/post/',
        noData: false,
        noDataText: '啥也没找到..'
        // testHtml: '<mark>hangge.com</mark>'
      }
    },
    methods: {
      /**
       *
       * @param text 待搜索字符串
       * @param searchText 搜索关键字
       * @param defaultText 搜索不到时的默认值
       * @returns {*} 添加<mark>高亮后的文本
       */
      customFilter (text, searchText, defaultText) {
        const content = text.toLowerCase()
        const search = searchText.toLowerCase()
        let firstIndex = content.indexOf(search)
        if (firstIndex < 0) {
          return defaultText
        }
        let count = 100
        let begin = (firstIndex - count > 0) ? firstIndex - count : 0
        let end = (firstIndex + count < content.length) ? firstIndex + count : content.length
        let firstText = content.substring(begin, firstIndex)
        let secondText = '<mark>' + searchText + '</mark>'
        let thirdText = content.substring(firstIndex + searchText.length, end)
        return firstText + secondText + thirdText
      },
      handClick (id) {
        this.$router.push({
          path: this.postUrl + id
        })
        this.searchText = null
      },
      handleChange () {
        // this.searchText = ''
      },
      parseData (data) {
        return data.map(item => {
          return {
            id: item.id,
            title: this.customFilter(item.title, this.searchText, item.title),
            content: this.customFilter(item.contentHtml, this.searchText, item.summary)
          }
        })
      },
      clearSearch () {
        this.searchText = null
      }
    },
    watch: {
      '$route': 'clearSearch',
      searchText () {
        if (!this.searchText) {
          this.showItems = false
          this.noData = false
          return
        }
        this.isLoading = true
        this.showItems = true // 为了显示加载
        this.noData = false
        this.items = []
        postApi.queryPostByContent(this.searchText)
          .then(res => {
            this.items = this.parseData(res.data.body)
            this.showItems = true
            this.noData = false
          })
          .catch(err => {
            this.$log.debug(err)
            this.noData = true
            this.showItems = false
            this.isLoading = false
          })
          .finally(() => {
            this.isLoading = false
          })
      }
    }
  }
</script>

<style scoped>

</style>