<template>
  <div>
    <v-card class="elevation-2">
      <v-card-title>
        <span class="headline">我要留言</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card class="elevation-4">
        <v-card-text>
          <!--                 @change="onEditorChange($event)"
-->
          <!--<section class="container">-->
            <!--<div class="quill-editor"
                 :content="tempContent"
                 @change="onEditorChange($event)"
                 @blur="onEditorBlur($event)"
                 @focus="onEditorFocus($event)"
                 @ready="onEditorReady($event)"
                 v-quill:myQuillEditor="editorOption">
            </div>-->
          <!--</section>-->
          <quill-editor :content="tempContent"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @change="onEditorChange($event)"
                        @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @ready="onEditorReady($event)">
          </quill-editor>
        </v-card-text>
      </v-card>
      <v-card class="elevation-4">
        <v-card-text>
          <v-text-field
              label="你的名字"
              v-model="user.name"
              required
              :rules="nameRules"
              hint="必填"
          ></v-text-field>
          <v-text-field
              label="你的邮箱"
              v-model="user.email"
              :rules="emailRules"
              required
              hint="必填（不公开）"
          ></v-text-field>
          <v-text-field
              label="你的主页"
              v-model="user.siteUrl"
              hint="选填"
          ></v-text-field>
        </v-card-text>
      </v-card>
      <v-card-text>
        <div class="mx-auto">
          <v-btn  color="info" @click="upload">发表</v-btn>
        </div>
      </v-card-text>
    </v-card>

  </div>
</template>

<script>
  // require styles
  // import 'quill/dist/quill.core.css'
  // import 'quill/dist/quill.snow.css'
  // import 'quill/dist/quill.bubble.css'
  // import {quillEditor} from 'vue-quill-editor'
  import { quillEditor } from 'vue-quill-editor'

  export default {
    name: 'CommentEditor',
    props: {
      content: {
        type: String,
        required: true
      },
      user: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        tempContent: '',
        emailRules: [
          v => !!v || '邮箱必填（不公开）',
          v => /.+@.+/.test(v) || '邮箱格式有误'
        ],
        nameRules: [
          v => !!v || '名字为必填'
        ],
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'underline'],
              ['blockquote', 'code-block'],
              // [{ 'header': '3'}],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              [{'script': 'sub'}, {'script': 'super'}],
              [{'size': ['small', false, 'large', 'huge']}],
              // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              // [{ 'font': [] }],
              [{'color': []}],
              [{'align': []}],
              ['clean'],
              ['link']
              // ['link', 'image', 'video']
            ],
            syntax: {
              // hljs已经引入了
              highlight: text => hljs.highlightAuto(text).value // eslint-disable-line
            }
          },
          placeholder: '请输入留言内容'
        }
      }
    },
    mounted () {
      this.tempContent = this.content
    },
    watch: {
      content (val) {
        this.tempContent = val
      }
    },
    methods: {
      onEditorBlur (quill) {
        console.log('editor blur!', quill)
      },
      onEditorFocus (quill) {
        console.log('editor focus!', quill)
      },
      onEditorReady (quill) {
        console.log('editor ready!', quill)
      },
      onEditorChange ({quill, html, text}) {
        this.tempContent = html
        this.$emit('change', this.tempContent)
      },
      upload () {
        if (this.tempContent === '') {
          alert('留言不能为空')
          return
        }
        this.$emit('upload', this.tempContent)
      }
    },
    components: {
      quillEditor
    }
  }
</script>

<style scoped>
</style>