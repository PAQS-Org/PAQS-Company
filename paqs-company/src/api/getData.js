import { $axios } from "boot/axios";

export default {
  getReceipts: (data) => $axios.get("payment/invoice/", data),
  getQR: (data) => $axios.get("payment/receipt/", data),
};
