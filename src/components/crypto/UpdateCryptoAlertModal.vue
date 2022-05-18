<template>
  <v-dialog v-model="coinDialog" max-width="500px">
    <v-card class="roundBorder">
      <v-card-title>
        <h2>Edit Alert</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3">
          <h3>{{alert.coin.name}}</h3>
          <v-text-field
            v-model="alert.minPrice"
            type="number"
            clearable
            label="Min. Price"
          />
          <v-text-field
            v-model="alert.maxPrice"
            type="number"
            clearable
            label="Max. Price"
          />
          <v-autocomplete
            :items="fiatCoins"
            v-model="alert.fiatCoinId"
            :item-text="'name'"
            :item-value="'id'"
            clearable
            label="Select Fiat Coin"
          />
          <div>
            <v-btn style="border-radius: 20px;" color="purple" dark @click="submit();">Update</v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import UpdateAlert from "../../services/Api/CryptoContext/Alerts/UpdateAlert";

export default {
  props: {
    alert: {
      default: null
    },
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
      UpdateAlert.updateAlert(this.alert).then(() => {
          this.$emit("alertUpdated");
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
  },
  watch: {
    show: function (value) {
      this.coinDialog = value;
    },
    coinDialog: function (value) {
      if (!value) {
        this.$emit('updateCryptoAlertClosed');
      }
    }
  }
}
</script>
