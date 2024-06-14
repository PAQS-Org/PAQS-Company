import { $axios } from "boot/axios";

export default {
  getReceipts: (data) => $axios.get("payment/invoice/", data),
  getQR: (credentials) => $axios.get("account/qr-downloads/", credentials),
};
