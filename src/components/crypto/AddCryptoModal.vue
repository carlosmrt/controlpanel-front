<template>
 <v-dialog v-model="coinDialog" max-width="500px">
   <v-card class="roundBorder">
     <v-card-title>
       <h2>Add Crypto</h2>
     </v-card-title>
      <v-card-text>
        <v-form class="px-3">
          <v-autocomplete
            :items="coins"
            v-model="selectedCoin"
            :item-text="'name'"
            :item-value="'id'"
            clearable
            label="Select Crypto"
          />
          <div>
            <v-btn style="border-radius: 20px;" color="purple" dark @click="submit();">Add</v-btn>
          </div>
        </v-form>
      </v-card-text>
   </v-card>
 </v-dialog>
</template>

<script>
import AddCoinToDashboard from "../../services/Api/CryptoContext/Dashboard/AddCoinToDashboard";
import CoinsList from "../../services/Api/CryptoContext/Dashboard/CoinsList";

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
        AddCoinToDashboard.addCoin(this.dashboardId, this.selectedCoin).then(() => {
          this.$emit("coinAdded");
          this.coinDialog = false;
        },
        (e) => {
          this.$notification.error("Limit Reached", {timer: 3});
          this.coinDialog = false;
        })
    },
    getCoins() {
      CoinsList.list().then((response) => {
          this.coins = response.data;
        });
    },
  },
  mounted() {
    this.getCoins()
  },
  watch: {
    show: function (value) {
      this.coinDialog = value;
    },
    coinDialog: function (value){
      if(!value){
        this.$emit('addCryptoModalClosed');
      }
    }
  }
}
</script>
