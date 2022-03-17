import API from "../../Api";

export default {
  list(dashboardId) {
    return API.METHODS.get(
      API.CRYPTO_CONTEXT_PATH + "/dashboard-coin/" + dashboardId
      );
  }
};

