<template>
  <v-dialog v-model="coinDialog" max-width="500px">
    <v-card class="roundBorder">
      <v-card-title>
        <h2>Link Account</h2>
      </v-card-title>
      <v-card-text>
        1. Generate temporal code to login from telegram bot.
        <v-btn class="roundBorder" dark color="purple" @click="generateTemporalCode()">
          Generate Code
        </v-btn>
        <br/>
        <br/>
        2. Copy next message.
        <pre><code>/link {{temporalCode}}</code></pre>
        <br/>
        <br/>
        3. Send it to CryptoBoardBot. Click on Telegram button to open chat.
        <br/>
        <br/>
        <a style="display:block;font-size:16px;font-weight:500;text-align:center;border-radius:8px;padding:5px;background:#389ce9;text-decoration:none;color:#fff;" href="https://xn--r1a.click/CryptoBoardBot" target="_blank"><svg style="width:30px;height:20px;vertical-align:middle;margin:0px 5px;" viewBox="0 0 21 18"><g fill="none"><path fill="#ffffff" d="M0.554,7.092 L19.117,0.078 C19.737,-0.156 20.429,0.156 20.663,0.776 C20.745,0.994 20.763,1.23 20.713,1.457 L17.513,16.059 C17.351,16.799 16.62,17.268 15.88,17.105 C15.696,17.065 15.523,16.987 15.37,16.877 L8.997,12.271 C8.614,11.994 8.527,11.458 8.805,11.074 C8.835,11.033 8.869,10.994 8.905,10.958 L15.458,4.661 C15.594,4.53 15.598,4.313 15.467,4.176 C15.354,4.059 15.174,4.037 15.036,4.125 L6.104,9.795 C5.575,10.131 4.922,10.207 4.329,10.002 L0.577,8.704 C0.13,8.55 -0.107,8.061 0.047,7.614 C0.131,7.374 0.316,7.182 0.554,7.092 Z"></path></g></svg>Telegram CryptoBoardBot</a>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>

import CreateTemporalCode from "../../services/Api/NotificationContext/CryptoBot/CreateTemporalCode";

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      coinDialog: this.show,
      temporalCode: ''
    }
  },
  methods: {
    generateTemporalCode() {
      CreateTemporalCode.create().then((response) => {
          this.temporalCode = response.data.temporalCode;
        },
        (error) => {
          if (error.response.status === 422) {
            this.$notification.error(error.response.data.error.message, {timer: 3});
          }
          sessionStorage.removeItem('token');
          this.$router.push({name: 'Login'});
        });
    },
  },
  mounted() {
  },
  watch: {
    show: function (value) {
      this.coinDialog = value;
    },
    coinDialog: function (value) {
      if (!value) {
        this.$emit('connectBotClosed');
      }
    }
  }
}
</script>
