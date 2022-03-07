<template>
  <v-container fluid grid-list-x1>
    <v-tabs>
      <v-tab @click="tab = item.id" v-for="(item, index) in dashboards" :key="index">{{item.name}}</v-tab>
    </v-tabs>
    <v-container><AddCryptoModal :dashboardId='tab'></AddCryptoModal></v-container>
    <v-layout flex items-center justify-center v-show="tab === dashboard.id && dashboard.coins.length > 0" row wrap v-for="(dashboard, index) in dashboards" :key="index">
      <CryptoIframe class="cryptoIframe" v-for="(item, index) in dashboard.coins" :iframe="item" :key="index"/>
    </v-layout>

  </v-container>
</template>
<script>
import CryptoIframe from "../components/crypto/CryptoIframe";
import DashboardRetrieve from "../services/Api/CryptoContext/Dashboard/DashboardRetrieve";
import AddCryptoModal from "../components/crypto/AddCryptoModal";
export default {
  components: {AddCryptoModal, CryptoIframe},
  data() {
    return {
      dashboards: null,
      tab: null
    }

  },
  methods: {
    getDashboards() {
      DashboardRetrieve.retrieve().then((response) => {
          this.dashboards = response.data;
          this.tab = this.dashboards.length > -1 ?  this.dashboards[0].id : null;
        },
        (err) => {
          this.$notification.error("Error Inesperado", {timer: 3});
        });
    }
  },
  mounted() {
    this.getDashboards()
  }
}
</script>

<style>
  .cryptoIframe{
    margin-right: 2%;
    margin-bottom: 2%;
  }
  .tabClass{
    margin-bottom: 5%;

  }
</style>
