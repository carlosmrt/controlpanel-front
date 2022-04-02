<template>
  <v-dialog v-model="dashboardDialog" max-width="500px">
    <v-btn class="right roundBorder" slot="activator" dark color="purple">
      <v-icon dark>mdi-plus</v-icon>
      <span>Board</span>
    </v-btn>
    <v-card class="roundBorder">
      <v-card-title>
        <h2>Create CryptoBoard</h2>
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
            <v-btn style="border-radius: 20px;" class="mx-0 mt-3" color="purple" dark @click="submit();">Add</v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import AddDashboard from "../../services/Api/CryptoContext/Dashboard/AddDashboard";

export default {
  data() {
    return {
      name: null,
      dashboardDialog: false,
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
      AddDashboard.addDashboard(this.name, this.selectedFiatCoin).then(() => {
          this.$emit("dashboardAdded");
          this.name = null;
          this.selectedFiatCoin = null;
          this.dashboardDialog = false;
        },
        (error) => {
          if (error.response.status === 422) {
            this.$notification.error(error.response.data.error.message, {timer: 3});
          }
          this.coinDialog = false;
        }
      )
    },
  },
}
</script>
