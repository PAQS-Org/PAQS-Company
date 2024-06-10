import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { Loading, QSpinnerGears } from "quasar";

const $axios = axios.create({
  baseURL: "http://127.0.0.1:8000",
  // baseURL: "https://web-production-9209.up.railway.app",
  withCredentials: true,
  "Content-type": "application/json",
});

export default () => {
  $axios.interceptors.request.use(async (req) => {
    let accessToken = localStorage.getItem("accessToken");
    let refreshToken = localStorage.getItem("refreshToken");

    Loading.show({
      spinner: QSpinnerGears, // You can choose other spinners as well
      message: "Loading...",
      spinnerSize: 140,
      spinnerColor: "white",
    });

    if (accessToken) {
      const user = jwtDecode(accessToken);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

      if (!isExpired) {
        req.headers.Authorization = `Bearer ${accessToken}`;
      } else if (refreshToken) {
        try {
          const response = await axios.post(
            `${req.baseURL}account/token/refresh/`,
            {
              refresh: refreshToken,
            }
          );
          accessToken = response.data.access;
          localStorage.setItem("accessToken", accessToken);
          req.headers.Authorization = `Bearer ${accessToken}`;
        } catch (error) {
          // Handle token refresh error (e.g., logout the user)
          Loading.hide();
          throw error;
        }
      }
    }

    return req;
  });

  $axios.interceptors.response.use(
    (response) => {
      // Hide loading spinner after response
      Loading.hide();
      return response;
    },
    (error) => {
      // Hide loading spinner on error
      Loading.hide();
      return Promise.reject(error);
    }
  );
};

export { $axios };
