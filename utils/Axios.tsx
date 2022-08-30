import _axios from 'axios';
import Swal from 'sweetalert2';
import {
  AxiosRequestConfig as OriginalAxiosRequestConfig,
  AxiosResponse as OriginalAxiosResponse,
} from 'axios';

const url = 'http://localhost:3000/api/';

const pendingRequests = new Map();
let store;

export const injectStore = (_store: any) => {
  store = _store;
};

interface AxiosRequestConfig extends OriginalAxiosRequestConfig {
  requestKey?: string;
}
interface AxiosResponse extends OriginalAxiosResponse {
  config: AxiosRequestConfig;
}

const axios = () => {
  const instance = _axios.create({
    baseURL: url,
    timeout: 10000,
  });

  instance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      // Before Request
      if (!Swal.isVisible()) {
        Swal.fire({
          showConfirmButton: false,
          allowEscapeKey: false,
          allowOutsideClick: false,
        });
        Swal.showLoading();
      }

      const requestKey = `${config.url}/${JSON.stringify(
        config.params
      )}/${JSON.stringify(config.data)}&request_type=${config.method}`;

      if (pendingRequests.has(requestKey)) {
        config.cancelToken = new _axios.CancelToken((cancel) => {
          cancel(`Request repeat: ${requestKey}`);
        });
      } else {
        pendingRequests.set(requestKey, config);
        config.requestKey = requestKey;
      }

      config.headers = {
        ...config.headers,
        // authorization: `JWT ${store.getState().Customer.token}`,
      };

      config.params = {
        ...config.params,
        t: new Date().getTime(),
      };
      return config;
    },
    (error) => {
      // Request Error
      pendingRequests.clear();
      return error;
    }
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Response Success
      try {
        if (Swal.isLoading()) {
          Swal.close();
        }
      } catch {}
      const requestKey = response.config.requestKey;
      pendingRequests.delete(requestKey);
      return response;
    },
    (error) => {
      // Response Error
      try {
        if (Swal.isLoading()) {
          Swal.close();
        }
      } catch {}
      if (_axios.isCancel(error)) {
        return error;
      }
      pendingRequests.clear();

      console.log(error);
      Swal.fire({
        title: '發生意外錯誤',
        confirmButtonText: '確定',
        confirmButtonColor: '#ffb559',
        icon: 'info',
      });

      return Promise.reject(error);
    }
  );

  return instance;
};
export { axios };
export default axios();
