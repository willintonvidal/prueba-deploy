import configUrlService from './configUrl'
const axios = require('axios');
import createAuthRefreshInterceptor from 'axios-auth-refresh';


//Obtenemos el refres_token
function getRefreshToken() {
  return localStorage.getItem('refresh_token');
}

//Funcion para instancear la ruta para nuestro axios
const instance = axios.create({
  baseURL: configUrlService.apiUrl
});

//Interceptors
instance.interceptors.request.use(request => {
  const token = window.localStorage.token
  request.headers['Authorization'] = 'Bearer ' + token;
  request.headers['Accept'] = 'application/json';
  request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  return request;
}, function (error) {
  const originalRequest = error.config;
  console.error(originalRequest)
});


//Add a response interceptor

instance.interceptors.response.use((response) => {
  return response
}, function (error) {
  if (error == 'Error: Network Error') {
    // Funcion para cuando se hace el refresh token
    /* let formData = new FormData();
    formData.append('refresh_token', getRefreshToken());

    return instance.post('refresh', formData).then(tokenRefreshResponse => {
      console.log(tokenRefreshResponse.data);
      const config = error.config;
      config.headers['Authorization'] = `Bearer ${tokenRefreshResponse.data.acces_token}`;

      return new Promise((resolve, reject) => {
        instance.request(config).then(response => {
          resolve(response);
        }).catch((error) => {
          reject(error);
        })
      });
    })
      .catch((error) => {
        Promise.reject(error);
      }); */
  } else {
    window.localStorage.clear();
  }
  console.log(error.config);
  return Promise.reject(error);
});


//Definiendo el content-type
//instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// Funcion para cuando se hace el refresh token
let formData = new FormData();
formData.append('refresh_token', getRefreshToken());

const refreshAuthLogic = failedRequest => instance.post('/api/v1/refresh', formData).then(tokenRefreshResponse => {
  localStorage.setItem('token', tokenRefreshResponse.data.acces_token);
  localStorage.setItem('refresh_token', tokenRefreshResponse.data.refresh_token);
  console.log("Se hizo un refresh token");
  failedRequest.response.config.headers['Authentication'] = 'Bearer ' + tokenRefreshResponse.data.acces_token;
  return Promise.resolve();
});

createAuthRefreshInterceptor(instance, refreshAuthLogic);


export default instance