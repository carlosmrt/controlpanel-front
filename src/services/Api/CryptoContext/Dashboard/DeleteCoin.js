import API from "../../Api";

export default {
  deleteCoin(dashboardCoinId) {
    return API.METHODS.delete(
        API.CRYPTO_CONTEXT_PATH + '/dashboard-coin/'+dashboardCoinId
    );
  }
};

