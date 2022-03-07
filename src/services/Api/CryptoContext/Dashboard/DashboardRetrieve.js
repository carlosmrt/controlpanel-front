import API from "../../Api";

export default {
  retrieve() {
    return API.METHODS.get(
      API.CRYPTO_CONTEXT_PATH + "/dashboard"
      );
  }
};

