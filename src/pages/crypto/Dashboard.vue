<template>
  <v-container fluid >
    <v-layout>

      <v-tabs  style="width: 100%" slider-color="purple">
        <v-tab @click="tab = item.id" v-for="(item, index) in dashboards" :key="index">{{item.name}}</v-tab>
      </v-tabs>
      <AddDashboardModal @dashboardAdded="getDashboards('dashboardAdded')"></AddDashboardModal>
    </v-layout>

    <div style="float: right;display: block;width: 140px;">
    <DropDownSettings
      :dashboardId='tab'
      @dashboardDeleted="getDashboards('dashboardDeleted')"
      @coinAdded="getDashboards('coinAdded')"/>
    </div>

    <v-container flex items-center justify-center>

    <v-layout v-show="tab === dashboard.id" row wrap v-for="(dashboard, index) in dashboards" :key="index">
      <CryptoIframe class="cryptoIframe" v-for="(item, index) in dashboard.coins" :iframe="item" :key="index"/>
      <div v-if="!dashboard.coins.length">Data Not Found</div>
    </v-layout>
    </v-container>
  </v-container>
</template>
<script>

import CryptoIframe from "../../components/crypto/CryptoIframe";
import DashboardList from "../../services/Api/CryptoContext/Dashboard/DashboardList";
import AddCryptoModal from "../../components/crypto/AddCryptoModal";
import AddDashboardModal from "../../components/crypto/AddDashboardModal";
import DropDownSettings from "../../components/crypto/DropDownSettings";

export default {
  components: {AddDashboardModal, AddCryptoModal, CryptoIframe, DropDownSettings},
  data() {
    return {
      dashboards: null,
      tab: null
    }

  },
  methods: {
    getDashboards(event) {
      DashboardList.list().then((response) => {
          this.dashboards = response.data;

          if(event === 'dashboardAdded' || event === 'dashboardDeleted'){
            this.tab = null;
          }

          if(this.tab === null){
            this.tab = this.dashboards.length > -1 ?  this.dashboards[0].id : null;
          }
        },
        () => {
          this.$notification.error("Internal Error", {timer: 3});
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
</style>
