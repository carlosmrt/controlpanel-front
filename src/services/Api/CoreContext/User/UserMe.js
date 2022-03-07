import API from "../../Api";

export default {
  me() {
    return API.METHODS.get(
      API.CORE_CONTEXT_PATH + "/user/me"
      );
  }
};
