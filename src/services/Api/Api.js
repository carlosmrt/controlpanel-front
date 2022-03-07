import axios from "axios";

const CORE_CONTEXT_PATH = "/private/core/v1";
const CRYPTO_CONTEXT_PATH = "/private/crypto/v1";

const axiosAPI = axios.create({
  baseURL : "http://localhost:8000"
});

const apiRequest = (method, url, request) => {
  const headers = {
    authorization: "Bearer " + sessionStorage.getItem('token')
  };


  return axiosAPI({
    method,
    url,
    data: request,
    headers
  }).then(res => {
    return Promise.resolve(res.data);
  })
    .catch(err => {
      return Promise.reject(err);
    });
};

const get = (url, request) => apiRequest("get",url,request);

const deleteRequest = (url, request) =>  apiRequest("delete", url, request);

const post = (url, request) => apiRequest("post", url, request);

const put = (url, request) => apiRequest("put", url, request);

const patch = (url, request) =>  apiRequest("patch", url, request);

const API ={
  get,
  delete: deleteRequest,
  post,
  put,
  patch
};

export default {
  METHODS : API,
  CORE_CONTEXT_PATH : CORE_CONTEXT_PATH,
  CRYPTO_CONTEXT_PATH : CRYPTO_CONTEXT_PATH
};
