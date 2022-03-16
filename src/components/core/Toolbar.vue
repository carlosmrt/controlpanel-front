<template>
  <v-toolbar
    dark
    app
    color="#C2C2C2"
    class="toolbar">
    <router-link :to="{ name: 'Dashboard' }">
      <img src="static/logo_small.png" width="50%" class="icon-image"></img>
    </router-link>
    <router-link :to="{ name: 'Dashboard' }" class="text">
    </router-link>
    <v-spacer></v-spacer>

    <v-menu class="toolbar-menu-item" offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
      <v-btn icon large flat slot="activator" :ripple="false">
        <v-avatar color="#F8F5F5" size="42px">
          <a style="color: #8A4086;;">{{ user ? getInitials() : '' }}</a>
        </v-avatar>
      </v-btn>
      <v-list>
        <v-list-tile
          v-for="(item,index) in items"
          :key="index"
          :to="!item.href ? { name: item.name } : null"
          :href="item.href"
          ripple="ripple"
          :disabled="item.disabled"
          :target="item.target"
          @click="item.click">
          <v-list-tile-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>
<script>

import UserMe from "../../services/Api/CoreContext/User/UserMe";
import VueNotification from "@kugatsu/vuenotification";

export default {
  data() {
    return {
      rating: null,
      dialog: false,
      dialogSettings: false,
      switchEmailNotification: true,
      showPassword: null,
      showPasswordConfirm: null,
      userEmail: null,
      password: null,
      passwordConfirm: null,
      error: false,
      showResult: false,
      result: '',
      user: null,
      loadingResources: false,
      items: [
        {
          icon: 'account_circle',
          href: '#',
          title: 'Profile',
          click: (e) => {
          }
        },
        {
          icon: 'settings',
          href: '#',
          title: 'Settings',
          click: () => {
            const vm = this;

            vm.dialogSettings = true;
          }
        },
        {
          icon: 'power_settings_new',
          href: '#',
          title: 'Logout',
          click: () => {
            const vm = this;
            sessionStorage.setItem('token','')
            vm.$router.push({name: 'Login'});
          }
        }
      ],
      notifications:
        []
    }
  },
  methods: {
    toggleNavigationBar() {
      const vm = this;
      vm.$emit('toggleNavigationBar');
    },
    getUser() {
      UserMe.me().then((response) => {
          this.user = response.data;
        },
        (err) => {
          this.$router.push("/");
        });
    },
    getInitials(){
      const name = this.user.firstName + ' ' + this.user.lastName;
      let initials = name.split(' ');

      if(initials.length > 1) {
      //  initials = initials.shift().charAt(0) + initials.pop().charAt(0);
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
};
</script>
<style>
.toolbar-menu-item {
  padding-left: 5px;
}

.toolbar {
  font-weight: bold;
  font-size: 18px;
  height: 70px;
}

.toolbar .text {
  padding-left: 15px;
  color: white;
  text-decoration:none;
}

.icon-image{
  margin-top: 3%;
}
</style>
