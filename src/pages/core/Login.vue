<template>
  <v-app id="login" style="background-color: #1D2330;">
    <vue-particles
      color="#FF00FF"
      linesColor="#FF00FF"
      :clickEffect="false"
      :hoverEffect="false">
    </vue-particles>
    <div v-if="!showRegister" class="centered-text">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-card width="500px" flex items-center justify-center class="elevation-15 pa-3" style="border-radius: 20px;">
            <v-card-text>
              <v-container>
                <v-img src="static/logo_small.png"/>
              </v-container>
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
              <a @click="showRegisterFunction">Need a CryptoBoard account? <br/>Sign up</a>
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
    </div>
    <div v-if="showRegister" class="centered-text-register">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-card width="500px" flex items-center justify-center class="elevation-15 pa-3" style="border-radius: 20px;">
            <v-card-text>
              <v-container>
                <v-img src="static/logo_small.png"/>
              </v-container>
              <v-form>
                <v-text-field
                  append-icon="person"
                  name="firstName"
                  label="First Name"
                  type="text"
                  v-model="firstName"
                  :error="error"
                  :rules="[rules.required]"/>
                <v-text-field
                  append-icon="person"
                  name="lastName"
                  label="Last Name"
                  type="text"
                  v-model="lastName"
                  :error="error"
                  :rules="[rules.required]"/>
                <v-text-field
                  append-icon="person"
                  name="email"
                  label="Email"
                  type="text"
                  v-model="registerEmail"
                  :error="error"
                  :rules="[rules.required]"/>
                <v-text-field
                  :type="registerHidePassword ? 'password' : 'text'"
                  :append-icon="registerHidePassword ? 'visibility_off' : 'visibility'"
                  name="password"
                  label="Password"
                  :rules="[rules.required]"
                  v-model="registerPassword"
                  :error="error"
                  @click:append="registerHidePassword = !registerHidePassword"/>
                <v-text-field
                  :type="hideConfirmPassword ? 'password' : 'text'"
                  :append-icon="hideConfirmPassword ? 'visibility_off' : 'visibility'"
                  name="password"
                  label="Confirm Password"
                  :rules="[rules.required]"
                  v-model="confirmPassword"
                  :error="error"
                  @click:append="hideConfirmPassword = !hideConfirmPassword"/>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn style="border-radius: 20px;" class="ma-2" color="#F0F0F0" @click="backToLogin">
                <v-icon left>mdi-arrow-left</v-icon>
                Back
              </v-btn>

              <v-spacer></v-spacer>
              <v-btn block dark center class="btnLogin" color="#c700ff" @click="register" :loading="loading">Register
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-layout>
      </v-container>
    </div>
      <div class="footer">
        <a href="https://es.linkedin.com/in/carlos-marti-chafer-055659179" target="_blank" style="text-decoration:none;margin-bottom: 4px; color:white;">
           <v-icon style="color: white;">mdi-linkedin</v-icon>
          <span>Powered By Carlos Martí</span>
        </a>
      </div>
  </v-app>
</template>

<script>
import UserLogin from "../../services/Api/CoreContext/User/UserLogin";
import UserRegister from "../../services/Api/CoreContext/User/UserRegister";
import VueNotification from "@kugatsu/vuenotification";

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
      showRegister: false,
      registerEmail: '',
      firstName: '',
      lastName: '',
      registerPassword: '',
      confirmPassword: '',
      registerHidePassword: true,
      hideConfirmPassword: true,
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
        sessionStorage.setItem('token', res.data.token)
        this.$router.push("/dashboard")
      } catch (error) {
        if(error.response.status === 422) {
          this.$notification.error(error.response.data.error.message, {timer: 3});
        }
        vm.error = true;
      }
    },
    showRegisterFunction() {
      this.error = false;
      this.showRegister = true;
    },
    async register() {
      const vm = this;

      if (!vm.registerEmail || !vm.registerPassword || !vm.firstName || !vm.lastName || !vm.confirmPassword) {

        this.$notification.error("Data can't be null", {timer: 3});
        return;
      }

      if (vm.registerPassword !== vm.confirmPassword) {

        this.$notification.error("Passwords don't match", {timer: 3});
        return;
      }

      try {
        const register = await UserRegister.register(this.firstName, this.lastName, this.registerEmail, this.registerPassword);
        const res = await UserLogin.login(this.registerEmail, this.registerPassword);
        sessionStorage.setItem('token', res.data.token)
        this.$router.push("/dashboard")
        this.$notification.dark("Welcome " + this.firstName + " to CryptoBoard", {timer: 3});
      } catch (error) {
        if(error.response.status === 422) {
          this.$notification.error(error.response.data.error.message, {timer: 3});
        }
        vm.error = true;
      }
    },
    backToLogin() {
      this.error = false;
      this.showRegister = false;
    }
  },
  created() {
    if(sessionStorage.getItem('token')){
      this.$router.push("/dashboard")
    }
  }
}
</script>

<style scoped lang="css">
.btnLogin {
  color: #F0F0F0;
  font-weight: bold;
  border-radius: 20px;
}

.centered-text {
  position: absolute;
  margin-top: 2%;
  width: 100%;
}

.centered-text-register {
  position: absolute;
  margin-top: 2%;
  width: 100%;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  color: white;
  text-align: center;
}
</style>
