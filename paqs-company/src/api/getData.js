import { $axios } from "boot/axios";

const getData = {
  getReceipts: (data) => $axios.get("payment/invoice/", data),
  getTrends: (data) => $axios.get("payment/trends/", data),
  getCustomers: (data) => $axios.get("payment/customers/", data),
  getReport() {
    $axios.get("/api/report", { responseType: "blob" });
  },
  getCustomerReport() {
    $axios.get("/api/report", { responseType: "blob" });
  },
  // Line Chart
  getLineChart: (data) => $axios.get("chart-data/line-scan/", data),
  getCompletedChart: (data) => $axios.get("chart-data/line-completed/", data),
  //  Bar chart
  getBarScanChart: (data) => $axios.get("chart-data/bar-scan/", data),
  getBarCompleteChart: (data) => $axios.get("chart-data/bar-completed/", data),
};
export default getData;
