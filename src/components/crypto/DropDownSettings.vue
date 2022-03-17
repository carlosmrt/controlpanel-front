<template>
  <div class="text-center">
    <v-menu offset-y>
      <template slot="activator">
        <v-btn
          color="purple"
          dark
        >
          <v-icon dark>mdi-wrench</v-icon>
          Settings
        </v-btn>
      </template>
      <v-list>
        <v-list-tile
          v-for="(item, index) in items"
          :key="index"
          @click="openModal(item.id)"
        >
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <AddCryptoModal
      :show="showAddCryptoModal"
      :dashboard-id="dashboardId"
      @coinAdded="updateDashboardsPage('coinAdded')"
      @addCryptoModalClosed="updateShowAddCryptoModal()"
    />
    <EditDashboardModal
      :show="showEditDashboardModal"
      :dashboard-id="dashboardId"
      @dashboardUpdated="updateDashboardsPage('coinAdded')"
      @editDashboardModalClosed="updateShowEditDashboardModal()"
    />
  </div>
</template>

<script>
import AddCryptoModal from "./AddCryptoModal";
import EditDashboardModal from "./EditDashboardModal";

export default {
  components: {EditDashboardModal, AddCryptoModal},
  props: {
    dashboardId: String,
  },
  data: () => ({
    items: [
      {
        title: 'Edit',
        id: 'editDashboard'
      },
      {
        title: 'Add Crypto',
        id: 'addCrypto'
      },
      {
        title: 'Delete Crypto',
        id: 'deleteCrypto'
      }
    ],
    name: null,
    showAddCryptoModal: false,
    showEditDashboardModal: false,
    selectedFiatCoin: null,
    fiatCoins: [
      {
        id: '1505',
        name: 'USD $'
      },
      {
        id: '1506',
        name: 'EUR €'
      }
    ]
  }),
  methods: {
    openModal(data){
      if(data === 'addCrypto'){
        this.showAddCryptoModal = true;
      }

      if(data === 'editDashboard'){
        console.log('dd');
        this.showEditDashboardModal = true;
      }
    },
    updateDashboardsPage(value){
      this.showAddCryptoModal = false;
      this.showEditDashboardModal = false;
      this.$emit(value);
    },
    updateShowAddCryptoModal(){
      this.showAddCryptoModal = false;
    },
    updateShowEditDashboardModal(){
      this.showEditDashboardModal = false;
    },
  },
}
</script>
