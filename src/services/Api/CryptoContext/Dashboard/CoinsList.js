import API from "../../Api";

export default {
  list() {
    return API.METHODS.get(
      API.CRYPTO_CONTEXT_PATH + "/coin/list"
      );
  }
};

