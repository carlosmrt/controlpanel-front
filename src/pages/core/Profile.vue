<template>
  <v-container>
    <v-avatar color="#F8F5F5" size="100px">
      <a style="color: #8A4086;;">{{ user ? getInitials() : '' }}</a>
    </v-avatar>
    {{user.firstName}} {{user.lastName}}
  </v-container>
</template>
<script>
import UserMe from "../../services/Api/CoreContext/User/UserMe";

export default {
  data() {
    return{
      user: null,
    }
  },
  methods: {
    getUser() {
      UserMe.me().then((response) => {
        this.user = response.data;
      })
    },
    getInitials(){
      const name = this.user.firstName + ' ' + this.user.lastName;
      let initials = name.split(' ');

      if(initials.length > 1) {
        initials = initials.shift().charAt(0) + initials.shift().charAt(0);
      } else {
        initials = name.substring(0, 2);
      }

      return initials.toUpperCase();
    }
  },
  mounted() {
    this.getUser()
  }
}
</script>
