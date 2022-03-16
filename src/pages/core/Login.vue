<template>
  <v-app id="login" class="background">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-card flex items-center justify-center class="elevation-15 pa-3 border-card">
              <v-card-text>
                <div class="layout column align-center" style="margin: 10%">
                  <img src="static/logo_small.png">
                </div>
                <v-form>
                  <v-text-field
                    append-icon="person"
                    name="login"
                    label="Email"
                    type="text"
                    v-model="email"
                    :error="error"
                    :rules="[rules.required]"/>
                  <v-text-field
                    :type="hidePassword ? 'password' : 'text'"
                    :append-icon="hidePassword ? 'visibility_off' : 'visibility'"
                    name="password"
                    label="Password"
                    id="password"
                    :rules="[rules.required]"
                    v-model="password"
                    :error="error"
                    @click:append="hidePassword = !hidePassword"/>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <a @click="register">Need a CryptoBoard account? Sign up</a>
                <v-spacer></v-spacer>
                <v-btn block dark class="btnLogin" color="#c700ff" @click="login" :loading="loading">Login</v-btn>
              </v-card-actions>
            </v-card>
        </v-layout>
      </v-container>
      <v-snackbar
        v-model="showResult"
        :timeout="2000"
        top>
        {{ result }}
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
import UserLogin from "../../services/Api/CoreContext/User/UserLogin";

export default {
  data() {
    return {
      loading: false,
      email: '',
      password: '',
      hidePassword: true,
      error: false,
      showResult: false,
      result: '',
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },

  methods: {
    async login() {
      const vm = this;

      if (!vm.email || !vm.password) {

        vm.result = "Email and Password can't be null.";
        vm.showResult = true;

        return;
      }

      try {
        const res = await UserLogin.login(this.email, this.password);
        sessionStorage.setItem('token',res.data.token)
        this.$router.push("/dashboard")
        this.$notification.dark("Welcome back!", {timer: 3});
      } catch (error) {
        vm.error = true;
        vm.result = "Email or Password is incorrect.";
        vm.showResult = true;
      }
    },
    register(){
      this.$router.push("/register")
    }
  }
}
</script>

<style scoped lang="css">
  #login {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }

  .background{
    background-image: url(/static/background.jpg);
  }

  .border-card{
    border-radius: 5%;
    background-color: #F0F0F0;
  }

  .btnLogin{
    color: #F0F0F0;
    font-weight: bold;
    border-radius: 20px;
  }
</style>
