<template>
 <v-dialog v-model="dialog" max-width="500px">
   <v-btn slot="activator" fab dark color="indigo"><v-icon dark>mdi-plus</v-icon></v-btn>
   <v-card>
     <v-card-title>
       <h2>Añadir Crypto</h2>
     </v-card-title>
      <v-card-text>
        <v-form class="px-3">
          <v-autocomplete
            :items="coins"
            v-model="selectedCoin"
            :item-text="'name'"
            :item-value="'id'"
            clearable
            label="Select a coin"
          />
          <div class="float">
            <v-btn class="mx-0 mt-3" @click="submit(), dialog = false">Añadir</v-btn>
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
    dashboardId: String
  },
  data() {
    return {
      selectedCoin: null,
      coins: null,
      dialog:true,
    }
  },
  methods: {
    submit() {
      AddCoinToDashboard.addCoin(this.dashboardId, this.selectedCoin).then(() => {
        this.$emit("coinAdded");
      })
    },
    getCoins() {
      CoinsList.list().then((response) => {
          this.coins = response.data;
        });
    }
  },
  mounted() {
    this.getCoins()
  }
}
</script>
