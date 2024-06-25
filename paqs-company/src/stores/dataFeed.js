/* eslint-disable linebreak-style */
import { defineStore } from "pinia";
import getData from "src/api/getData.js";

export const useTransactionStore = defineStore("transaction", {
  state: () => ({
    lineChartData: JSON.parse(localStorage.getItem("chartData")) || [],
    lineChartrange: {
      year: new Date().getFullYear(),
      month: null,
      day: null,
    },
    loyalCust: [],
    trendProducts: [],
    transactions: [],
    currentPageTrendz: 1,
    pageSizeTrendz: 5,
    currentPage: 1,
    pageSize: 5,
    currentPageCust: 1,
    pageSizeCust: 5,
  }),
  getters: {
    paginatedTrendz(state) {
      const start = (state.currentPageTrendz - 1) * state.pageSizeTrendz;
      const end = start + state.pageSizeTrendz;
      return state.trendProducts.slice(start, end);
    },
    totalPageTrendzs: (state) => {
      return Math.ceil(state.trendProducts.length / state.pageSizeTrendz);
    },
    paginatedTransactions(state) {
      const start = (state.currentPage - 1) * state.pageSize;
      const end = start + state.pageSize;
      return state.transactions.slice(start, end);
    },
    totalPages: (state) => {
      return Math.ceil(state.transactions.length / state.pageSize);
    },
    paginatedCustomers(state) {
      const start = (state.currentPageCust - 1) * state.pageSizeCust;
      const end = start + state.pageSizeCust;
      return state.loyalCust.slice(start, end);
    },
    totalCustomers: (state) => {
      return Math.ceil(state.loyalCust.length / state.pageSizeCust);
    },
    filteredData(state) {
      const { year, month, day } = state.lineChartrange;
      return state.lineChartData.filter((item) => {
        const date = new Date(item.date);
        return (
          date.getFullYear() === year &&
          (month === null || date.getMonth() === month) &&
          (day === null || date.getDate() === day)
        );
      });
    },
  },
  actions: {
    async fetchTransactions() {
      try {
        const storedData = localStorage.getItem("transactionData");
        if (storedData) {
          this.transactions = JSON.parse(storedData);
        } else {
          const response = await getData.getReceipts();
          this.transactions = response.data.results.map((item) => ({
            ...item,
            download: `http://127.0.0.1:8000/payment/receipt/${item.transaction_id}/`,
          }));
          localStorage.setItem(
            "transactionData",
            JSON.stringify(this.transactions)
          );
        }
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    },
    setCurrentPage(page) {
      this.currentPage = page;
    },
    setCurrentPageTrendz(page) {
      this.currentPageTrendz = page;
    },
    setCurrentPageCust(page) {
      this.currentPageCust = page;
    },
    async fetchTrends() {
      try {
        const trendData = localStorage.getItem("trendProduct");
        if (trendData) {
          this.trendProducts = JSON.parse(trendData);
        } else {
          const response = await getData.getTrends();
          this.trendProducts = response.data.results.map((item) => ({
            ...item,
          }));
          localStorage.setItem(
            "trendProduct",
            JSON.stringify(this.trendProducts)
          );
        }
      } catch (error) {
        console.error("Error fetching trend products data:", error);
      }
    },
    async fetchLoyalCust() {
      try {
        const custData = localStorage.getItem("loyalCustomers");
        if (custData) {
          this.loyalCust = JSON.parse(custData);
        } else {
          const response = await getData.getCustomers();
          console.log(response);
          this.loyalCust = response.data.results.map((item) => ({
            ...item,
          }));
          localStorage.setItem(
            "loyalCustomers",
            JSON.stringify(this.loyalCust)
          );
        }
      } catch (error) {
        console.error("Error fetching trend products data:", error);
      }
    },
    async fetchData() {
      try {
        const response = await axios.get("https://api.example.com/chart-data"); // Replace with your backend endpoint
        this.lineChartData = response.data;
        localStorage.setItem(
          "lineChartData",
          JSON.stringify(this.lineChartData)
        );
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    },
    updateRange(range) {
      this.lineChartrange = range;
    },
    async downloadReport() {
      try {
        const response = await getData.getReport(); // Assuming getReport fetches the file from backend
        return response;
      } catch (error) {
        console.error("Error downloading report:", error);
        throw error;
      }
    },
    async downloadCustomerReport() {
      try {
        const response = getData.getCustomerReport(); // Assuming getReport fetches the file from backend
        return response;
      } catch (error) {
        console.error("Error downloading report:", error);
        throw error;
      }
    },
  },
});
