import axios from "axios";
import VueNotification from "@kugatsu/vuenotification";

const CORE_CONTEXT_PATH = "/api/core/v1";
const CRYPTO_CONTEXT_PATH = "/api/crypto/v1";
const URL = process.env.API_URL

const axiosAPI = axios.create({
  baseURL: URL
});

const apiRequest = (method, url, request) => {
  const headers = {
    authorization: "Bearer " + sessionStorage.getItem('token')
  };
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  return axiosAPI({
    method,
    url,
    data: request,
    headers
  }).then(res => {
    return Promise.resolve(res.data);
  })
    .catch(err => {
      if (error.response.status === 500) {
          sessionStorage.removeItem('token');
      }
      return Promise.reject(err);
    });
};

const get = (url, request) => apiRequest("get", url, request);

const deleteRequest = (url, request) => apiRequest("delete", url, request);

const post = (url, request) => apiRequest("post", url, request);

const put = (url, request) => apiRequest("put", url, request);

const patch = (url, request) => apiRequest("patch", url, request);

const API = {
  get,
  delete: deleteRequest,
  post,
  put,
  patch
};

export default {
  METHODS: API,
  CORE_CONTEXT_PATH: CORE_CONTEXT_PATH,
  CRYPTO_CONTEXT_PATH: CRYPTO_CONTEXT_PATH
};
