<template>
  <v-toolbar
    dark
    app
    color="#1D2330"
    class="toolbar">
    <router-link :to="{ name: 'Dashboard' }">
      <img src="static/logo_small.png" width="50%" class="icon-image"/>
    </router-link>
    <router-link :to="{ name: 'Dashboard' }" class="text">
    </router-link>
    <v-spacer></v-spacer>

    <v-menu class="toolbar-menu-item" offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
      <v-btn icon large flat slot="activator" :ripple="false">
        <v-avatar color="#F8F5F5" size="42px">
          <a style="color: purple;">{{ user ? getInitials() : '' }}</a>
        </v-avatar>
      </v-btn>
      <v-list>
        <v-list-tile
          v-for="(item,index) in items"
          :key="index"
          :to="!item.href ? { name: item.name } : null"
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

export default {
  data() {
    return {
      user: null,
      items: [
        {
          icon: 'account_circle',
          href: '#',
          title: 'Profile',
          click: () => {
            this.$router.push({name: 'Profile'});
          }
        },
        {
          icon: 'feedback',
          href: '#',
          title: 'Feedback',
          click: () => {
            this.$router.push({name: 'Feedback'});
          }
        },
        {
          icon: 'power_settings_new',
          href: '#',
          title: 'Logout',
          click: () => {
            sessionStorage.removeItem('token');
            this.$router.push({name: 'Login'});
          }
        }
      ],
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
        (error) => {
          sessionStorage.removeItem('token');
          this.$router.push({name: 'Login'});
        });
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
    }
  },
  mounted: function () {
    this.getUser()
    this.$root.$on('userUpdated', () => {
      this.getUser()
    })
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
}

.toolbar .text {
  padding-left: 15px;
  color: white;
  text-decoration: none;
}

.icon-image {
  margin-top: 3%;
}
</style>
