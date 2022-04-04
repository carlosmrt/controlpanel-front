<template>
  <v-dialog v-model="editDashboardDialog" max-width="500px">
    <v-card class="roundBorder">
      <v-card-title>
        <h2>Edit Board</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3">
          <v-text-field
            v-model="name"
            clearable
            label="Name"
          />
          <v-autocomplete
            :items="fiatCoins"
            v-model="selectedFiatCoin"
            :item-text="'name'"
            :item-value="'id'"
            clearable
            label="Select Fiat Coin"
          />
          <div class="float">
            <v-btn style="border-radius: 20px;" class="mx-0 mt-3" color="purple" dark @click="submit();">Update</v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import UpdateDashboard from "../../services/Api/CryptoContext/Dashboard/UpdateDashboard";
import DashboardRetrieve from "../../services/Api/CryptoContext/Dashboard/DashboardRetrieve";

export default {
  props: {
    dashboardId: String,
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      name: null,
      editDashboardDialog: this.show,
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
    }
  },
  methods: {
    submit() {
      UpdateDashboard.updateDashboard(this.dashboardId, this.name, this.selectedFiatCoin).then(() => {
        this.$emit("dashboardUpdated");
        this.editDashboardDialog = false;
      }, (error) => {
        if (error.response.status === 422) {
          this.$notification.error(error.response.data.error.message, {timer: 3});
        }
        this.coinDialog = false;
      })
    },
    getDashboard() {
      DashboardRetrieve.retrieve(this.dashboardId).then((response) => {
        this.name = response.data.name;
        this.selectedFiatCoin = response.data.fiatCoinId;
      }, (error) => {
        if (error.response.status === 422) {
          this.$notification.error(error.response.data.error.message, {timer: 3});
        }
        this.coinDialog = false;
      })
    }
  },
  watch: {
    show: function (value) {
      this.editDashboardDialog = value;
      this.getDashboard();
    },
    editDashboardDialog: function (value) {
      if (!value) {
        this.$emit('editDashboardModalClosed');
      }
    }
  }
}
</script>
