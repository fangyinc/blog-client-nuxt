<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline mx-auto">添加友链</span>
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field
                label="用户名"
                v-model="username"
                :rules="usernameRules"
                :counter="10"
                required
            ></v-text-field>
            <v-text-field
                label="真名"
                v-model="name"
                required
            ></v-text-field>
            <v-text-field
                label="个人主页"
                v-model="siteUrl"
                required
            ></v-text-field>
            <v-text-field
                label="头像地址"
                v-model="imgUrl"
                required
            ></v-text-field>
            <v-text-field
                v-model="about"
                label="简介"
                clearable
            ></v-text-field>

          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="cancel">取消</v-btn>
          <v-btn color="blue darken-1" flat @click.native="submit">创建</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import authApi from '../../api/user'

  export default {
    name: 'createFriend',
    data () {
      return {
        dialog: true,
        valid: true,
        username: '',
        name: '',
        siteUrl: '',
        imgUrl: '',
        about: '',
        usernameRules: [
          v => !!v || 'Username is required',
          v => v.length <= 15 || 'Username must be less than 15 characters'
        ]
      }
    },
    methods: {
      cancel () {
        this.$router.back()
      },
      submit () {
        if (!this.$refs.form.validate()) {
          return
        }
        let params = {
          username: this.username,
          name: this.name,
          siteUrl: this.siteUrl,
          imgUrl: this.imgUrl,
          about: this.about
        }
        authApi.newFriend(params)
          .then(res => {
            this.$log.debug(res.data)
            this.dialog = false
            this.$router.push({
              path: '/'
            })
          })
          .catch(res => {
            console.log(res)
          })
      }
    }
  }
</script>

<style scoped>

</style>