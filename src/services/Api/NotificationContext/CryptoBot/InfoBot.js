import API from "../../Api";

export default {
  info() {
    return API.METHODS.get(
      API.NOTIFICATION_CONTEXT_PATH + "/bot/info",
      );
  }
};
