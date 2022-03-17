import API from "../../Api";

export default {
  updateDashboard(dashboardId,name,fiatCoinId) {
    return API.METHODS.put(
        API.CRYPTO_CONTEXT_PATH + '/dashboard/update/'+dashboardId,
        {
          name: name,
          fiatCoinId
        }
    );
  }
};

