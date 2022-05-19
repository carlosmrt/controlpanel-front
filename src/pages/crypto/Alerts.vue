<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card-title>
        <h3>Alerts</h3>
        <v-spacer></v-spacer>
        <v-btn class="roundBorder" dark color="purple" @click="openConnectBot()">
          Link Account
        </v-btn>
        <v-btn class="roundBorder" dark color="purple" @click="openAlertModal()">
          Add Alert
        </v-btn>
      </v-card-title>
      <v-card>
        <v-list
          subheader
          three-line
        >
          <v-layout column fill-height v-for="(alert, index) in alerts" :key="alert.id">
            <v-list-tile>
              <v-card-title>{{ alert.coin.name }}</v-card-title>
              <v-list-tile-content>
                <v-list-tile-sub-title>Min. Price: {{ alert.minPrice }}
                  {{ getFiatCoinSymbol(alert.fiatCoinId) }}
                </v-list-tile-sub-title>
                <v-list-tile-sub-title>Max. Price: {{ alert.maxPrice }}
                  {{ getFiatCoinSymbol(alert.fiatCoinId) }}
                </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-menu class="toolbar-menu-item" offset-y origin="center center" :nudge-bottom="10"
                        transition="scale-transition">
                  <v-btn icon large flat slot="activator" :ripple="false">
                    <v-icon>more_vert</v-icon>
                  </v-btn>
                  <v-list>
                    <v-list-tile
                      v-for="(item,index) in items"
                      :key="index"
                      :to="!item.href ? { name: item.name } : null"
                      ripple="ripple"
                      :disabled="item.disabled"
                      :target="item.target"
                      @click="item.click(alert)">
                      <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-list-tile-action>
            </v-list-tile>
          </v-layout>
          <div v-if="!alerts.length" class="text-lg-center">Empty Alerts</div>
        </v-list>
      </v-card>
    </v-flex>
    <AddCryptoAlert
      :show="showAddAlertModal"
      @alertAdded="getAlerts()"
      @addCryptoAlertClosed="updateAlertsModal()"
    />
    <UpdateCryptoAlertModal
      :show="showUpdateAlertModal"
      :alert="selectedAlert"
      @alertUpdated="getAlerts()"
      @updateCryptoAlertClosed="updateAlertsModal()"
    />
    <DeleteCryptoAlertModal
      :show="showDeleteAlertModal"
      :alert="selectedAlert"
      @alertDeleted="getAlerts()"
      @deleteCryptoAlertClosed="updateAlertsModal()"
    />
    <ConnectBot
      :show="showConnectBot"
      @connectBotClosed="updateAlertsModal()"
    />
  </v-layout>
</template>

<script>
import ListAlerts from "../../services/Api/CryptoContext/Alerts/ListAlerts";
import AddCryptoAlert from "../../components/crypto/AddCryptoAlert";
import UpdateCryptoAlertModal from "../../components/crypto/UpdateCryptoAlertModal";
import DeleteCryptoAlertModal from "../../components/crypto/DeleteCryptoAlertModal";
import ConnectBot from "../../components/crypto/ConnectBot";

export default {
  components: {ConnectBot, DeleteCryptoAlertModal, UpdateCryptoAlertModal, AddCryptoAlert},
  data() {
    return {
      alerts: [],
      items: [
        {
          href: '#',
          title: 'Edit',
          click: (alert) => {
            this.openUpdateAlertModal(alert)
          }
        },
        {
          href: '#',
          title: 'Delete',
          click: (alert) => {
            this.openDeleteAlertModal(alert)
          }
        }
      ],
      fiatCoins: [
        {
          id: '1505',
          name: '$'
        },
        {
          id: '1506',
          name: '€'
        }
      ],
      showAddAlertModal: false,
      showUpdateAlertModal: false,
      showDeleteAlertModal: false,
      showConnectBot: false,
      selectedAlert: null
    }
  },
  methods: {
    getAlerts() {
      ListAlerts.list().then((response) => {
          this.alerts = response.data;
        },
        (error) => {
          if (error.response.status === 422) {
            this.$notification.error(error.response.data.error.message, {timer: 3});
          }
          sessionStorage.removeItem('token');
          this.$router.push({name: 'Login'});
        });
    },
    getFiatCoinSymbol(fiatCoinId) {
      const fiatCoin = this.fiatCoins.find(fiatCoin => fiatCoin.id === fiatCoinId);
      return fiatCoin.name;
    },
    openAlertModal() {
      this.showAddAlertModal = true;
    },
    openConnectBot() {
      this.showConnectBot = true;
    },
    openUpdateAlertModal(alert) {
      this.selectedAlert = alert;
      this.showUpdateAlertModal = true;
    },
    openDeleteAlertModal(alert) {
      this.selectedAlert = alert;
      this.showDeleteAlertModal = true;
    },
    updateAlertsModal() {
      this.showAddAlertModal = false;
      this.showUpdateAlertModal = false;
      this.showDeleteAlertModal = false;
      this.showConnectBot = false;
    },
  },
  mounted() {
    this.getAlerts()
  },

}
</script>
