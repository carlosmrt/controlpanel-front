<template>
 <v-dialog v-model="dashboardDialog" max-width="500px">
   <v-btn class="right" style="float: right" slot="activator" dark color="purple"><v-icon dark>mdi-plus</v-icon>CryptoBoard</v-btn>
   <v-card>
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
            <v-btn class="mx-0 mt-3" color="purple" dark @click="submit(), dashboardDialog = false">Add</v-btn>
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
      AddDashboard.addDashboard(this.name,this.selectedFiatCoin).then(() => {
        this.$emit("dashboardAdded");
      })
    },
  },
}
</script>
