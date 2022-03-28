<template>
  <v-card>
    <div class="cryptoContainer">
        <iframe :src="iframe" width="100%" height="350px" style="border:0;"></iframe>
      </div>
  </v-card>

</template>

<script>
export default {
  props: {
    toggle: {
        type: Boolean,
        required: false,
        default: true,
    },
    iframe:{
      type: String,
      required: true,
      default: false
    }
  },

  data() {
    return {
      selectedIndex: 1
    }
  },
  methods: {
    changeRoute(routeName, selectedIndex) {
      const vm = this;

      vm.selectedIndex = selectedIndex;

      return vm.$router.push({ name: routeName });
    }
  }
}
</script>

<style>
  .cryptoContainer {
    height:200px;
    background-color: #1D2330;
    overflow:hidden;
    box-sizing: border-box;
    border: 1px solid #282E3B;
    border-radius: 4px;
    text-align: right;
    line-height:14px;
    font-size: 12px;
    font-feature-settings: normal;
    box-shadow: inset 0 -20px 0 0 #262B38;
    padding: 0;
    margin: 0;
    width: 100%;
    pointer-events: none !important;
  }
</style>
