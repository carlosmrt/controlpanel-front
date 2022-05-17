<template>
  <v-dialog v-model="coinDialog" max-width="500px">
    <v-card class="roundBorder">
      <v-card-title>
        <h2>Add Alert</h2>
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
          <v-text-field
            v-model="minPrice"
            type="number"
            clearable
            label="Min. Price"
          />
          <v-text-field
            v-model="maxPrice"
            type="number"
            clearable
            label="Max. Price"
          />
          <v-autocomplete
            :items="fiatCoins"
            v-model="fiatCoin"
            :item-text="'name'"
            :item-value="'id'"
            clearable
            label="Select Fiat Coin"
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
import CoinsList from "../../services/Api/CryptoContext/Dashboard/CoinsList";
import AddAlert from "../../services/Api/CryptoContext/Alerts/AddAlert";

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      selectedCoin: null,
      coins: null,
      coinDialog: this.show,
      fiatCoin: null,
      maxPrice: null,
      minPrice: null,
      fiatCoins: [
        {
          id: '1505',
          name: 'USD $'
        },
        {
          id: '1506',
          name: 'EUR €'
        }
      ],
    }
  },
  methods: {
    submit() {
      AddAlert.addAlert(this.selectedCoin, this.fiatCoin, this.minPrice, this.maxPrice).then(() => {
          this.$emit("alertAdded");
        },
        (error) => {
          if (error.response.status === 422) {
            this.$notification.error(error.response.data.error.message, {timer: 3});
          }
        })

      this.selectedCoin = null;
      this.fiatCoin = null;
      this.minPrice = null;
      this.maxPrice = null;
      this.coinDialog = false;
    },
    getCoins() {
      CoinsList.list().then((response) => {
          this.coins = response.data;
        },
        (error) => {
          if (error.response.status === 422) {
            this.$notification.error(error.response.data.error.message, {timer: 3});
          }
          this.coinDialog = false;
        }
      );
    },
  },
  mounted() {
    this.getCoins()
  },
  watch: {
    show: function (value) {
      this.coinDialog = value;
    },
    coinDialog: function (value) {
      if (!value) {
        this.$emit('addCryptoAlertClosed');
      }
    }
  }
}
</script>
