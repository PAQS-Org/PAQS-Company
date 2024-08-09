import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Updated to named import without destructuring
import dayjs from "dayjs";
import { Loading, QSpinnerBall, Notify } from "quasar";

// Creating Axios instance with default configuration
const $axios = axios.create({
  // baseURL: "http://127.0.0.1:8000",
  baseURL: "https://web-production-9209.up.railway.app",
  withCredentials: true,
  "Content-type": "application/json",
});

// Function to refresh access token
const TakeRefreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) return null;
  try {
    const response = await axios.post(
      `${$axios.defaults.baseURL}/account/token/refresh/`,
      {
        refresh: refreshToken,
      }
    );
    const { access } = response.data;
    if (access) {
      // Update Authorization header directly in the interceptor
      $axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
      return { accessToken: access };
    }
  } catch (e) {
    let errorMessage = "Error refreshing token";

    // Check if error response has data and a specific error message
    if (e.response && e.response.data && e.response.data.detail) {
      errorMessage = e.response.data.detail;
    } else if (e.message) {
      // Fallback to error message if no specific error message from server
      errorMessage = e.message;
    }

    Notify.create({
      type: "negative",
      message: errorMessage,
    });
    return null;
  }
};

export default async ({ router }) => {
  let userIsActive = true;

  const setUserActive = () => {
    userIsActive = true;
    localStorage.setItem("lastActive", new Date().toISOString());
  };

  // Event listeners to track user activity
  window.addEventListener("mousemove", setUserActive);
  window.addEventListener("keydown", setUserActive);
  window.addEventListener("scroll", setUserActive);

  // Function to schedule token refresh checks
  const scheduleTokenRefresh = () => {
    setInterval(async () => {
      const accessTokens = localStorage.getItem("accessToken");
      const refreshTokens = localStorage.getItem("refreshToken");

      if (accessTokens && refreshTokens) {
        const user = jwtDecode(accessTokens);
        const accessExpTime = dayjs.unix(user.exp);
        const now = dayjs();

        const refreshTokenExpTime = dayjs.unix(jwtDecode(refreshTokens).exp);

        // console.log("user", user);
        // console.log("accessExpTime", accessExpTime);
        // console.log("now", now);
        // console.log("refreshTokenExpTime", refreshTokenExpTime);

        // Refresh the access token if it will expire in the next minute and the user is active
        if (accessExpTime.diff(now, "minute") <= 1 && userIsActive) {
          await TakeRefreshToken();
        }

        // Refresh the refresh token if it will expire in the next minute and the user is active
        if (refreshTokenExpTime.diff(now, "minute") <= 1 && userIsActive) {
          await TakeRefreshToken();
        }

        // Log out user if the refresh token will expire in the next minute and they are inactive
        const lastActive = dayjs(localStorage.getItem("lastActive"));
        if (
          now.diff(lastActive, "minute") >= 10 &&
          refreshTokenExpTime.diff(now, "minute") <= 1
        ) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          userIsActive = false;
          router.push("/auth/login"); // Or your login route
        }
      }
    }, 30000); // Check every minute
  };

  scheduleTokenRefresh();

  $axios.interceptors.request.use(async (req) => {
    let accessToken = localStorage.getItem("accessToken");

    Loading.show({
      spinner: QSpinnerBall,
      message: "Loading...",
      spinnerSize: 140,
      spinnerColor: "red",
    });

    if (accessToken) {
      const user = jwtDecode(accessToken);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

      if (!isExpired) {
        req.headers.Authorization = `Bearer ${accessToken}`;
      } else {
        const tokens = await TakeRefreshToken();
        if (tokens && tokens.accessToken) {
          req.headers.Authorization = `Bearer ${tokens.accessToken}`;
        } else {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          router.push("/auth/login");
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
