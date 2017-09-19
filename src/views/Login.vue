<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card-group mb-0">
            <div class="card p-4">
              <div class="card-body">
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                <div class="input-group mb-3">
                  <span class="input-group-addon"><i class="icon-user"></i></span>
                  <input type="text" class="form-control" placeholder="Username" v-model="username">
                </div>
                <div class="input-group mb-4">
                  <span class="input-group-addon"><i class="icon-lock"></i></span>
                  <input type="password" class="form-control" placeholder="Password" v-model="password">
                </div>
                <div class="row">
                  <div class="col-6">
                    <button type="button" class="btn btn-primary px-4" @click="login" :disabled="disable">Login</button>
                  </div>
                  <!-- <div class="col-6 text-right">
                    <button type="button" class="btn btn-link px-0">Forgot password?</button>
                  </div> -->
                </div>
              </div>
            </div>
            <div class="card text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <div class="card-body text-center">
                <div>
                  <h2>MrTreasure's Admin</h2>
                  <p style="margin-top: 20%">暂不开放访问，项目搭建中</p>
                  <!-- <button type="button" class="btn btn-primary active mt-3">Register Now!</button> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    disable () {
      if (this.username && this.password) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    ...mapMutations([
      'SET_LOGGED'
    ]),
    ...mapActions([
      'GET_RESUME'
    ]),
    async login () {
      await this.GET_RESUME({id: 1});
      this.$message({
        message: '登录成功',
        type: 'success',
        duration: 1500
      });
      this.SET_LOGGED({state: true});
      this.$router.push({name: 'Home'})
    }
  }
}
</script>
