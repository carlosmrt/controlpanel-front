import API from "../../Api";

export default {
  updateAlert(alert) {
    return API.METHODS.put(
        API.CRYPTO_CONTEXT_PATH + '/coin-alert/' + alert.id,
        {
          fiatCoinId: alert.fiatCoinId,
          minPrice: alert.minPrice,
          maxPrice: alert.maxPrice
        }
    );
  }
};

