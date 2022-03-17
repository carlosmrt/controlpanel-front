import API from "../../Api";

export default {
  deleteDashboard(dashboardId) {
    return API.METHODS.delete(
        API.CRYPTO_CONTEXT_PATH + '/dashboard/delete/'+dashboardId
    );
  }
};

