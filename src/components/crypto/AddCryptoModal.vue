<template>
 <v-dialog max-width="500px">
   <v-btn slot="activator" fab dark color="indigo"><v-icon dark>mdi-plus</v-icon></v-btn>
   <v-card>
     <v-card-title>
       <h2>Add new coin to dashboard</h2>
     </v-card-title>
      <v-card-text>
        <v-form class="px-3">
          <v-text-field label="Coin" v-model="coin"></v-text-field>
          <v-btn class="mx-0 mt-3" @click="submit()">Add coin</v-btn>
        </v-form>
      </v-card-text>
   </v-card>
 </v-dialog>
</template>

<script>
import AddCoinToDashboard from "../../services/Api/CryptoContext/Dashboard/AddCoinToDashboard";
export default {
  props: {
    dashboardId: String
  },
  data(){
    return{
      coin: ''
    }
  },
  methods:{
    submit(){
      AddCoinToDashboard.addCoin(this.dashboardId, this.coin).then(() => {
        this.$emit("coinAdded");
      })
    }
  }
}
</script>
