import API from "../../Api";

export default {
  register(firstName, lastName,email, password) {
    return API.METHODS.post(
      API.CORE_CONTEXT_PATH + "/user/register",
      {
        'firstName' : firstName,
        'lastName' : lastName,
        'email' : email,
        'password' : password
        }
      );
  }
};
