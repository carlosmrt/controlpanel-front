<template>
  <div class="text-center" style="width: 100%">
    <v-menu offset-y>
      <template slot="activator">
        <v-btn
          right
          color="purple"
          dark
          class="roundBorder px-6"
        >
          <v-icon dark>menu</v-icon>

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
    <DeleteCryptoModal
      :show="showDeleteCryptoModal"
      :dashboard-id="dashboardId"
      @coinDeleted="updateDashboardsPage('coinAdded')"
      @deleteCryptoModalClosed="updateShowDeleteCryptoModal()"
    />
    <DeleteDashboardModal
      :show="showDeleteDashboardModal"
      :dashboard-id="dashboardId"
      @dashboardDeleted="updateDashboardsPage('dashboardDeleted')"
      @deleteDashboardModalClosed="updateShowDeleteDashboardModal()"
    />
  </div>
</template>

<script>
import AddCryptoModal from "./AddCryptoModal";
import EditDashboardModal from "./EditDashboardModal";
import DeleteCryptoModal from "./DeleteCryptoModal";
import DeleteDashboardModal from "./DeleteDashboardModal";

export default {
  components: {DeleteDashboardModal, DeleteCryptoModal, EditDashboardModal, AddCryptoModal},
  props: {
    dashboardId: String,
  },
  data: () => ({
    items: [
      {
        title: 'Add Crypto',
        id: 'addCrypto'
      },
      {
        title: 'Delete Crypto',
        id: 'deleteCrypto'
      },
      {
        title: 'Edit Board',
        id: 'editDashboard'
      },
      {
        title: 'Delete Board',
        id: 'deleteDashboard'
      }
    ],
    showAddCryptoModal: false,
    showEditDashboardModal: false,
    showDeleteCryptoModal: false,
    showDeleteDashboardModal: false,
    selectedFiatCoin: null,
  }),
  methods: {
    openModal(data){
      if(data === 'addCrypto'){
        this.showAddCryptoModal = true;
      }

      if(data === 'editDashboard'){
        this.showEditDashboardModal = true;
      }

      if(data === 'deleteCrypto'){
        this.showDeleteCryptoModal = true;
      }

      if(data === 'deleteDashboard'){
        this.showDeleteDashboardModal = true;
      }
    },
    updateDashboardsPage(value){
      this.showAddCryptoModal = false;
      this.showEditDashboardModal = false;
      this.showDeleteCryptoModal = false;
      this.showDeleteDashboardModal = false;
      this.$emit(value);
    },
    updateShowAddCryptoModal(){
      this.showAddCryptoModal = false;
    },
    updateShowEditDashboardModal(){
      this.showEditDashboardModal = false;
    },
    updateShowDeleteCryptoModal(){
      this.showDeleteCryptoModal = false;
    },
    updateShowDeleteDashboardModal(){
      this.showDeleteDashboardModal = false;
    },
  },
}
</script>
