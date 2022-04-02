<template>
 <v-dialog v-model="deleteDashboardDialog" max-width="500px">
   <v-card class="roundBorder">
     <v-card-title>
       <h2>Delete CryptoBoard</h2>
     </v-card-title>
      <v-card-text>
        <p>Are you sure you want to delete {{name}}?</p>
          <div class="float">
            <v-btn style="border-radius: 20px;" class="mx-0 mt-3" color="purple" dark @click="submit();">Delete</v-btn>
          </div>
      </v-card-text>
   </v-card>
 </v-dialog>
</template>

<script>

import DeleteDashboard from "../../services/Api/CryptoContext/Dashboard/DeleteDashboard";
import DashboardRetrieve from "../../services/Api/CryptoContext/Dashboard/DashboardRetrieve";

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
      deleteDashboardDialog: false,
      name: ''
    }
  },
  methods: {
    submit() {
      DeleteDashboard.deleteDashboard(this.dashboardId).then(() => {
        this.$emit("dashboardDeleted");
        this.deleteDashboardDialog = false;
      }, (error) => {
        if(error.response.status === 422) {
          this.$notification.error(error.response.data.error.message, {timer: 3});
        }
        this.coinDialog = false;
      })
    },
    getDashboard(){
      DashboardRetrieve.retrieve(this.dashboardId).then((response) => {
        this.name = response.data.name;
      }, (error) => {
        if(error.response.status === 422) {
          this.$notification.error(error.response.data.error.message, {timer: 3});
        }
        this.coinDialog = false;
      })
    },
  },
  watch: {
    show: function (value) {
      this.deleteDashboardDialog = value;
      this.getDashboard();
    },
    deleteDashboardDialog: function (value){
      if(!value){
        this.$emit('deleteDashboardModalClosed');
      }
    }
  }
}
</script>
