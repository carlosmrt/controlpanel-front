<template>
 <v-dialog v-model="editDashboardDialog" max-width="500px">
   <v-card>
     <v-card-title>
       <h2>Edit CryptoBoard</h2>
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
            <v-btn class="mx-0 mt-3" color="purple" dark @click="submit();">Update</v-btn>
          </div>
        </v-form>
      </v-card-text>
   </v-card>
 </v-dialog>
</template>

<script>
import UpdateDashboard from "../../services/Api/CryptoContext/Dashboard/UpdateDashboard";

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
      })

    }
  },
  watch: {
    show: function (value) {
      this.editDashboardDialog = value;
    },
    editDashboardDialog: function (value){
      if(!value){
        this.$emit('editDashboardModalClosed');
      }
    }
  }
}
</script>
