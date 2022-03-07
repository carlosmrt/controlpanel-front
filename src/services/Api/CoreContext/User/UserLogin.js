import API from "../../Api";

export default {
  login(email, password) {
    return API.METHODS.post(
      API.CORE_CONTEXT_PATH + "/user/login",
      {
        'email' : email,
        'password' : password
        }
      );
  }
};
