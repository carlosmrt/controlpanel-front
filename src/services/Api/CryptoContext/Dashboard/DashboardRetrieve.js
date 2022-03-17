import API from "../../Api";

export default {
  retrieve(dashboardId) {
    return API.METHODS.get(
      API.CRYPTO_CONTEXT_PATH + "/dashboard/retrieve/" + dashboardId
      );
  }
};

