<template>
 <v-dialog v-model="coinDialog" max-width="500px">
   <v-card>
     <v-card-title>
       <h2>Delete Crypto</h2>
     </v-card-title>
      <v-card-text>
        <v-form class="px-3">
          <v-autocomplete
            :items="coins"
            v-model="selectedCoin"
            :item-text="'coin.name'"
            :item-value="'id'"
            clearable
            label="Select Crypto"
          />
          <div class="float">
            <v-btn style="border-radius: 20px;" class="mx-0 mt-3" color="purple" dark @click="submit();">Delete</v-btn>
          </div>
        </v-form>
      </v-card-text>
   </v-card>
 </v-dialog>
</template>

<script>
import AddCoinToDashboard from "../../services/Api/CryptoContext/Dashboard/AddCoinToDashboard";
import CoinsList from "../../services/Api/CryptoContext/Dashboard/CoinsList";
import DashboardCoinsList from "../../services/Api/CryptoContext/Dashboard/DashboardCoinsList";
import DeleteCoin from "../../services/Api/CryptoContext/Dashboard/DeleteCoin";
export default {
  props: {
    dashboardId: String,
    show: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return{
      selectedCoin: null,
      coins: null,
      coinDialog: this.show,
    }
  },
  methods: {
    submit() {
      DeleteCoin.deleteCoin(this.selectedCoin).then(() => {
        this.$emit("coinDeleted");
        this.coinDialog = false;
      })
    },
    getCoins() {
      DashboardCoinsList.list(this.dashboardId).then((response) => {
          this.coins = response.data;
        });
    },
  },
  watch: {
    show: function (value) {
      this.coinDialog = value;
      this.getCoins();
    },
    coinDialog: function (value){
      if(!value){
        this.$emit('deleteCryptoModalClosed');
      }
    }
  }
}
</script>
