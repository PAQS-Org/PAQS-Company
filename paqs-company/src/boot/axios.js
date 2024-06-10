import { Notify } from 'quasar';
import axios from 'axios';

const $axios = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFTOKEN',
  // Authorization: `Bearer ${token}`,
});

const showErrorNotification = ({ message, caption }) => Notify.create({
  message: message || 'Ooooops! An error occured',
  caption: caption || 'Contact support for more information',
  color: 'negative',
});

// Axios request interceptor to add CSRF token to headers
function getCsrfToken() {
  const csrfCookie = document.cookie.split(';').find((cookie) => cookie.trim().startsWith('csrftoken='));
  if (csrfCookie) {
    return csrfCookie.split('=')[1];
  }
  return null;
}
// function getCsrfToken() {
//   const csrfMeta = document.querySelector('meta[name="csrf-token"]');
//   if (csrfMeta) {
//     return csrfMeta.content;
//   }
//   return null;
// }

function getStoredToken(key) {
  return localStorage.getItem(key);
}

function setStoredToken(key, value) {
  localStorage.setItem(key, value);
}

function removeStoredToken(key) {
  localStorage.removeItem(key);
}

// Function to refresh access token using refresh token
async function refreshToken() {
  try {
    const refreshTokens = getStoredToken('refreshToken');
    if (!refreshTokens) {
      // Handle case where refresh token is missing (e.g., redirect to login)
      return;
    }

    const response = await $axios.post('account/token/refresh/', {
      refresh: refreshToken,
    });

    if (response.status === 200) {
      const newAccessToken = response.data.access;
      setStoredToken('accessToken', newAccessToken);
      console.log('Token refreshed successfully!');
      // Update any components relying on the access token
    } else {
      console.error('Failed to refresh token:', response.data);
      // Handle refresh failure (e.g., logout or show error message)
      removeStoredToken('accessToken');
      removeStoredToken('refreshToken'); // Clear both tokens on failure
    }
  } catch (error) {
    console.error('Error during refresh request:', error);
    // Handle errors during the refresh request
  }
}

export default () => {
  // Request interceptor to add access token to Authorization header
  $axios.interceptors.request.use(
    (config) => {
      const csrfToken = getCsrfToken();
      if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
      }

      const accessToken = getStoredToken('accessToken');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  // Response interceptor to handle 401 (Unauthorized) errors
  // and attempt token refresh before retrying the request (once)
  $axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const status = error.response?.status;

      if (status === 401 && !originalRequest.retry) {
        originalRequest.retry = true; // Mark request as retried
        try {
          await refreshToken();
          return $axios(originalRequest); // Retry the request with new token
        } catch (err) {
          console.error('Failed to retry request after refresh:', err);
          showErrorNotification({ message: 'Session expired. Please login again.' });
        }
      }

      // Handle other errors as before
      const { statusText } = error.response;
      const options = process.env.DEBUGGING ? { message: `${status} ${statusText}` } : {};
      if (![400, 401].includes(status)) showErrorNotification(options);

      return Promise.reject(error);
    },
  );
};

export { $axios };
