<template>
  <v-container>
    <v-btn style="border-radius: 20px;" color="#F0F0F0" @click="backToCryptoBoards">
      <v-icon left>mdi-arrow-left</v-icon>
      Back
    </v-btn>
    <v-spacer></v-spacer>
    <v-container style="width: 60%;">
      <v-form class="mt-3">
        <v-rating
          v-model="rate"
          background-color="purple lighten-3"
          color="purple"
          large
        ></v-rating>
        <v-text-field
          label="Subject"
          type="text"
          v-model="subject"
          :error="error"/>
        <v-textarea
          name="body"
          label="Body"
          type="text"
          v-model="body"
          :error="error"/>
      </v-form>
      <v-btn style="width:20%;float: right; border-radius: 20px;" block center class="btnLogin" color="#c700ff"
             @click="sendFeedback()" dark :loading="loading">Send
      </v-btn>
    </v-container>
  </v-container>
</template>
<script>

import SendFeedback from "../../services/Api/CoreContext/Feedback/SendFeedback";

export default {
  data() {
    return {
      loading: false,
      rate: 3,
      subject: null,
      body: null,
      error: false,
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },
  methods: {
    backToCryptoBoards() {
      this.$router.push("/dashboard")
    },
    async sendFeedback() {
      await SendFeedback.send(this.rate, this.subject, this.body);
      this.$notification.dark("Thank you for your feedback.", {timer: 3});
      this.rate = 3;
      this.subject = null;
      this.body = null;
    },
  },
  mounted() {
    this.getUser()
  }
}
</script>
