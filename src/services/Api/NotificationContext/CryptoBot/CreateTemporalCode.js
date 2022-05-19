import API from "../../Api";

export default {
  create() {
    return API.METHODS.post(
      API.NOTIFICATION_CONTEXT_PATH + "/bot/create",
      );
  }
};
