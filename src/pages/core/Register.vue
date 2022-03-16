<template>
  <v-app id="register" class="background">
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
                  v-model="email"
                  :error="error"
                  :rules="[rules.required]"/>
                <v-text-field
                  :type="hidePassword ? 'password' : 'text'"
                  :append-icon="hidePassword ? 'visibility_off' : 'visibility'"
                  name="password"
                  label="Password"
                  :rules="[rules.required]"
                  v-model="password"
                  :error="error"
                  @click:append="hidePassword = !hidePassword"/>
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
                <v-icon left>mdi-arrow-left</v-icon>Back
              </v-btn>

              <v-spacer></v-spacer>
              <v-btn block center class="btnLogin" color="#c700ff" @click="register" :loading="loading">Register</v-btn>
            </v-card-actions>
          </v-card>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import UserLogin from "../../services/Api/CoreContext/User/UserLogin";
import UserRegister from "../../services/Api/CoreContext/User/UserRegister";

export default {
  data() {
    return {
      loading: false,
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      hidePassword: true,
      hideConfirmPassword: true,
      error: false,
      showResult: false,
      result: '',
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },

  methods: {
    async register() {
      const vm = this;

      if (!vm.email || !vm.password || !vm.firstName || !vm.lastName || !vm.confirmPassword) {

        vm.result = "Email and Password can't be null.";
        vm.showResult = true;

        return;
      }

      if (vm.password !== vm.confirmPassword){

        vm.result = "Passwords don't match";
        vm.showResult = true;

        return;
      }

      try{
        const register = await UserRegister.register(this.firstName,this.lastName,this.email, this.password);
      }catch (error){
        vm.error = true;
        vm.result = "Register Error.";
        vm.showResult = true;
      }

      try {
        const res = await UserLogin.login(this.email, this.password);
        sessionStorage.setItem('token',res.data.token)
        this.$router.push("/dashboard")
        this.$notification.dark("Welcome "+ this.firstName +" to CryptoBoard!", {timer: 3});
      } catch (error) {
        vm.error = true;
        vm.result = "Email or Password is incorrect.";
        vm.showResult = true;
      }
    },
    backToLogin(){
      this.$router.push("/")
    }
  }
}
</script>

<style scoped lang="css">
  #register {
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
