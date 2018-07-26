<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">用户注册</span>
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
                label="密码"
                v-model="password"
                :rules="passwordRules"
                type="password"
                required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="cancel">取消</v-btn>
          <v-btn color="blue darken-1" flat @click.native="submitRegister">注册</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import authApi from '../api/user'

  export default {
    name: 'register',
    head () {
      return {
        title: '注册'
      }
    },
    data: () => ({
      dialog: true,
      valid: true,
      username: '',
      usernameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 15 || 'Name must be less than 15 characters'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length > 5 || 'Password must be more then 5 characters'
      ]
    }),
    methods: {
      submitRegister () {
        if (!this.$refs.form.validate()) {
          return
        }
        authApi.userRegister({username: this.username, password: this.password})
          .then(res => {
            // this.login(res.data.obj)
            this.$notify({
              group: 'user',
              title: '注册成功'
            })
            this.dialog = false
            this.$router.back()
          })
          .catch(res => {
            this.$notify({
              group: 'user',
              title: '注册失败'
            })
            console.debug(res)
          })
      },
      cancel () {
        this.$router.back()
      }
    },
    mounted () {
    }
  }
</script>

<style scoped>

</style>