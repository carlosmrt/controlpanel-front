import API from "../../Api";

export default {
  addCoin(dashboardId, coinId) {
    return API.METHODS.post(
        API.CRYPTO_CONTEXT_PATH + '/dashboard/'+dashboardId+'/add-coin',
        {
          coinId: coinId
        }
    );
  }
};

