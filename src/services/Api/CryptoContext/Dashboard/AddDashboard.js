import API from "../../Api";

export default {
  addDashboard(name,fiatCoinId) {
    return API.METHODS.post(
        API.CRYPTO_CONTEXT_PATH + '/dashboard/create',
        {
          name: name,
          fiatCoinId
        }
    );
  }
};

