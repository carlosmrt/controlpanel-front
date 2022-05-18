import API from "../../Api";

export default {
  addAlert(coinId,fiatCoinId,minPrice,maxPrice) {
    return API.METHODS.post(
        API.CRYPTO_CONTEXT_PATH + '/coin-alert',
        {
          coinId: coinId,
          fiatCoinId: fiatCoinId,
          minPrice: minPrice,
          maxPrice: maxPrice
        }
    );
  }
};

