import API from "../../Api";

export default {
  deleteAlert(alert) {
    return API.METHODS.delete(
        API.CRYPTO_CONTEXT_PATH + '/coin-alert/' + alert.id
    );
  }
};

