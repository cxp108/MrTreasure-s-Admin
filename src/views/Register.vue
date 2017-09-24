<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card mx-4">
            <div class="card-body p-4">
              <h1>Register</h1>
              <p class="text-muted">Create your account</p>
              <div class="input-group mb-3">
                <span class="input-group-addon"><i class="icon-user"></i></span>
                <input type="text" class="form-control" placeholder="Username" v-model="username">
              </div>

              <!-- <div class="input-group mb-3">
                <span class="input-group-addon">@</span>
                <input type="text" class="form-control" placeholder="Email">
              </div> -->

              <div class="input-group mb-3">
                <span class="input-group-addon"><i class="icon-lock"></i></span>
                <input type="password" class="form-control" placeholder="Password" v-model="password">
              </div>

              <div class="input-group mb-4 error">
                <span class="input-group-addon"><i class="icon-lock"></i></span>
                <input type="password" class="form-control" placeholder="Repeat password" v-model="confirm">
              </div>
              <div class="tip" v-show="isShow">
                两次密码不一致
              </div>

              <button type="button" class="btn btn-block btn-success" :disabled="disable" @click="signUp">Create Account</button>
            </div>
            <!-- <div class="card-footer p-4">
              <div class="row">
                <div class="col-6">
                  <button class="btn btn-block btn-facebook" type="button"><span>facebook</span></button>
                </div>
                <div class="col-6">
                  <button class="btn btn-block btn-twitter" type="button"><span>twitter</span></button>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Register',
  data () {
    return {
      username: '',
      password: '',
      confirm: ''
    }
  },
  computed: {
    disable () {
      let flag = this.password === this.confirm;
      if (this.username && this.password && this.confirm && flag) {
        return false;
      } else {
        return true;
      }
    },
    isShow () {
      let flag = this.password === this.confirm;
      if (this.confirm != '' && this.disable && !flag) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    ...mapActions([
      'SIGN_UP'
    ]),
    async signUp() {
      let data = {
        username: this.username,
        password: this.password
      };
      let result = await this.SIGN_UP({data});
      if (result.code == 1) {
        this.$message({
          message: result.msg,
          type: 'success',
          duration: 1500
        });
        this.$router.push({name: 'Login'});
      } else {
        this.$message({
          message: result.msg,
          type: 'error',
          duration: 1500
        });
        this.username = '';
        this.password = '';
        this.confirm = '';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// .error{
//   border: 1px solid red;
//   .input-group-addon{
//     border: none;
//     border-right: 1px solid red;
//   }
// }
.tip{
  margin: -10px 0 10px;
  text-align: center;
  color: red;
}
</style>

