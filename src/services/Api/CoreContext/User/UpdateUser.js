import API from "../../Api";

export default {
  update(firstName, lastName,email, password, newPassword) {
    return API.METHODS.put(
      API.CORE_CONTEXT_PATH + "/user/update",
      {
        'firstName' : firstName,
        'lastName' : lastName,
        'email' : email,
        'password' : password,
        'newPassword': newPassword
        }
      );
  }
};
