import API from "../../Api";

export default {
  addDashboard(name) {
    return API.METHODS.post(
        API.CRYPTO_CONTEXT_PATH + '/dashboard/create',
        {
          name: name
        }
    );
  }
};

