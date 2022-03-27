import API from "../../Api";

export default {
  send(rate, subject,body) {
    return API.METHODS.post(
      API.CORE_CONTEXT_PATH + "/feedback",
      {
        'rate' : rate,
        'subject' : subject,
        'body' : body
        }
      );
  }
};
