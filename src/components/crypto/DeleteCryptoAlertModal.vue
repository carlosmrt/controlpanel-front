<template>
  <v-dialog v-model="coinDialog" max-width="500px">
    <v-card class="roundBorder">
      <v-card-title>
        <h2>Delete Alert</h2>
      </v-card-title>
      <v-card-text>
        <p>Are you sure you want to delete "{{alert.coin.name}}" alert?</p>
        <div class="float">
          <v-btn style="border-radius: 20px;" class="mx-0 mt-3" color="purple" dark @click="submit();">Delete</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import DeleteAlert from "../../services/Api/CryptoContext/Alerts/DeleteAlert";

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
      DeleteAlert.deleteAlert(this.alert).then(() => {
          this.$emit("alertDeleted");
        },
        (error) => {
          if (error.response.status === 422) {
            this.$notification.error(error.response.data.error.message, {timer: 3});
          }
        })

      this.coinDialog = false;
    },
  },
  watch: {
    show: function (value) {
      this.coinDialog = value;
    },
    coinDialog: function (value) {
      if (!value) {
        this.$emit('deleteCryptoAlertClosed');
      }
    }
  }
}
</script>
