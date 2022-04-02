<template>
  <v-container>
    <v-btn style="border-radius: 20px;" color="#F0F0F0" @click="backToCryptoBoards">
      <v-icon left>mdi-arrow-left</v-icon>
      Back
    </v-btn>
    <v-spacer></v-spacer>

    <v-container class="mb-5" style="width: 60%;">
      <v-container flex items-center width="100%">
        <v-avatar color="#F8F5F5" size="100px">
          <a style="color: #8A4086;font-size: 24px;">{{ getInitials() }}</a>
        </v-avatar>
        <span style="color: black;font-size: 18px;margin-left: 10px">{{ user.firstName }} {{ user.lastName }}</span>
      </v-container>
      <v-form class="mt-3">
        <v-text-field
          append-icon="person"
          name="firstName"
          label="First Name"
          type="text"
          v-model="user.firstName"
          :error="error"
          :rules="[rules.required]"/>
        <v-text-field
          append-icon="person"
          name="lastName"
          label="Last Name"
          type="text"
          v-model="user.lastName"
          :error="error"
          :rules="[rules.required]"/>
        <v-text-field
          append-icon="person"
          name="email"
          label="Email"
          type="text"
          v-model="user.email"
          :error="error"
          :rules="[rules.required]"/>
        <v-spacer></v-spacer>
        <v-text-field
          :type="hidePassword ? 'password' : 'text'"
          :append-icon="hidePassword ? 'visibility_off' : 'visibility'"
          name="password"
          label="Password"
          v-model="password"
          :error="error"
          @click:append="hidePassword = !hidePassword"/>
        <v-text-field
          :type="hideNewPassword ? 'password' : 'text'"
          :append-icon="hideNewPassword ? 'visibility_off' : 'visibility'"
          name="password"
          label="New Password"
          v-model="newPassword"
          :error="error"
          @click:append="hideNewPassword = !hideNewPassword"/>
        <v-text-field
          :type="hideConfirmNewPassword ? 'password' : 'text'"
          :append-icon="hideConfirmNewPassword ? 'visibility_off' : 'visibility'"
          name="password"
          label="Confirm New Password"
          v-model="confirmNewPassword"
          :error="error"
          @click:append="hideConfirmNewPassword = !hideConfirmNewPassword"/>
      </v-form>
      <v-btn style="width:20%;float: right; border-radius: 20px;" block center class="btnLogin" color="#c700ff"
             @click="updateUser" dark :loading="loading">Save
      </v-btn>
    </v-container>

  </v-container>
</template>
<script>
import UserMe from "../../services/Api/CoreContext/User/UserMe";
import UpdateUser from "../../services/Api/CoreContext/User/UpdateUser";
import DashboardRetrieve from "../../services/Api/CryptoContext/Dashboard/DashboardRetrieve";

export default {
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: '',
      },
      loading: false,
      password: null,
      newPassword: null,
      confirmNewPassword: null,
      hidePassword: true,
      hideNewPassword: true,
      hideConfirmNewPassword: true,
      error: false,
      showResult: false,
      result: '',
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },
  methods: {
    getUser() {
      UserMe.me().then((response) => {
        this.user = response.data;
      })
    },
    getInitials() {
      const name = this.user.firstName + ' ' + this.user.lastName;
      let initials = name.split(' ');

      if (initials.length > 1) {
        initials = initials.shift().charAt(0) + initials.shift().charAt(0);
      } else {
        initials = name.substring(0, 2);
      }

      return initials.toUpperCase();
    },
    backToCryptoBoards() {
      this.$router.push("/dashboard")
    },
    async updateUser() {
      const vm = this;

      if (!this.user.email || !this.user.firstName || !this.user.lastName) {

        this.$notification.error("Data can't be null", {timer: 3});

        vm.showResult = true;

        return;
      }

      if (vm.newPassword !== vm.confirmNewPassword) {

        this.$notification.error("Passwords don't match", {timer: 3});
        vm.showResult = true;

        return;
      }

      UpdateUser.update(this.user.firstName, this.user.lastName, this.user.email, this.password, this.newPassword).then((response) => {
        this.$notification.dark("User Updated Successfully!", {timer: 3});
        this.$root.$emit('userUpdated');
      }, (error) => {
        if (error.response.status === 422) {
          this.$notification.error(error.response.data.error.message, {timer: 3});
        }
        this.coinDialog = false;
      })
    },
  },
  mounted() {
    this.getUser()
  }
}
</script>
