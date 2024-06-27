/* eslint-disable linebreak-style */
import { defineStore } from "pinia";
import getData from "src/api/getData.js";

export const useTransactionStore = defineStore("transaction", {
  state: () => ({
    BarScanChartData: JSON.parse(localStorage.getItem("lineChartData")) || [
      {
        country: "Ghana",
        region: "Accra",
        city: "labadi",
        town: "nshornaa",
        locality: "kwaa",
        value: 2,
      },
      {
        country: "Ghana",
        region: "Accra",
        city: "labadi",
        town: "town park",
        locality: "hwe",
        value: 5,
      },
      {
        country: "Ghana",
        region: "Accra",
        city: "labadi",
        town: "Church road",
        locality: "rws",
        value: 3,
      },
      {
        country: "Ghana",
        region: "Accra",
        city: "labadi",
        town: "kingsway",
        locality: "kik",
        value: 10,
      },
      {
        country: "Ghana",
        region: "Accra",
        city: "Teshie",
        town: "Tweibleoo",
        locality: "hay",
        value: 12,
      },
      {
        country: "Ghana",
        region: "Accra",
        city: "Teshie",
        town: "Park O",
        locality: "hh",
        value: 5,
      },
      {
        country: "Ghana",
        region: "Accra",
        city: "Nungua",
        town: "Beach road",
        locality: "lal",
        value: 10,
      },
      {
        country: "Ghana",
        region: "Accra",
        city: "Nungua",
        town: "Beach road",
        locality: "ewa",
        value: 3,
      },
      {
        country: "Ghana",
        region: "Accra",
        city: "labadi",
        town: "School",
        locality: "kjj",
        value: 8,
      },
      {
        country: "Ghana",
        region: "Accra",
        city: "Teshie",
        town: "kingsway",
        locality: "jua",
        value: 4,
      },
      {
        country: "Ghana",
        region: "Accra",
        city: "Nungua",
        town: "Senas",
        locality: "jdf",
        value: 9,
      },
      {
        country: "Ghana",
        region: "Accra",
        city: "labadi",
        town: "Street",
        locality: "sds",
        value: 7,
      },
      {
        country: "Ghana",
        region: "Kumasi",
        city: "Tafo",
        town: "mile 3",
        locality: "swe",
        value: 12,
      },
      {
        country: "Ghana",
        region: "Kumasi",
        city: "Pankros",
        town: "Atimatim",
        locality: "rash",
        value: 7,
      },
      {
        country: "Ghana",
        region: "Kumasi",
        city: "Suame",
        town: "Maakro",
        locality: "sds",
        value: 8,
      },
      {
        country: "Ghana",
        region: "Accra",
        city: "Teshie",
        town: "Lake",
        locality: "oio",
        value: 12,
      },
      {
        country: "Ghana",
        region: "Kumasi",
        city: "Kejetia",
        town: "Station",
        locality: "uio",
        value: 12,
      },
      {
        country: "Ghana",
        region: "Takoradi",
        city: "Paado",
        town: "market",
        locality: "umn",
        value: 13,
      },
      {
        country: "Ghana",
        region: "Kumasi",
        city: "Tafo",
        town: "mile 3",
        locality: "kaw",
        value: 5,
      },
      {
        country: "Ghana",
        region: "Accra",
        city: "Tema",
        town: "Comm 5",
        locality: "chu",
        value: 10,
      },
      {
        country: "Ghana",
        region: "Kumasi",
        city: "Tafo",
        town: "mile 4",
        locality: "mja",
        value: 5,
      },
      {
        country: "Ghana",
        region: "Kumasi",
        city: "Tafo",
        town: "market",
        locality: "uka",
        value: 8,
      },
      {
        country: "Ghana",
        region: "Takoradi",
        city: "Fijai",
        town: "town park",
        locality: "lio",
        value: 3,
      },
      {
        country: "Ghana",
        region: "Accra",
        city: "Nungua",
        town: "Maa mli",
        locality: "pqa",
        value: 7,
      },
      {
        country: "Ghana",
        region: "Kumasi",
        city: "Pankros",
        town: "Junction",
        locality: "site",
        value: 15,
      },
      {
        country: "Ghana",
        region: "Accra",
        city: "Tema",
        town: "Comm 2",
        locality: "Police",
        value: 14,
      },
      {
        country: "Ghana",
        region: "Takoradi",
        city: "Market Circle",
        town: "stra",
        locality: "line",
        value: 13,
      },
      {
        country: "Ghana",
        region: "Kumasi",
        city: "Kejetia",
        town: "Police",
        locality: "line 3",
        value: 15,
      },
      {
        country: "Ghana",
        region: "Takoradi",
        city: "Fijai",
        town: "stadium",
        locality: "airport",
        value: 8,
      },
    ],
    BarCompleteChartData: JSON.parse(localStorage.getItem("lineChartData")) || [
      {
        country: "Ghana",
        region: "Accra",
        city: "labadi",
        town: "nshornaa",
        locality: "kwaa",
        value: 7,
      },
      {
        country: "Ghana",
        region: "Accra",
        city: "labadi",
        town: "town park",
        locality: "hwe",
        value: 5,
      },
      {
        country: "Ghana",
        region: "Accra",
        city: "labadi",
        town: "Church road",
        locality: "rws",
        value: 13,
      },
      {
        country: "Ghana",
        region: "Accra",
        city: "labadi",
        town: "kingsway",
        locality: "kik",
        value: 14,
      },
      {
        country: "Ghana",
        region: "Accra",
        city: "Teshie",
        town: "Tweibleoo",
        locality: "hay",
        value: 9,
      },
      {
        country: "Ghana",
        region: "Accra",
        city: "Teshie",
        town: "Park O",
        locality: "hh",
        value: 8,
      },
      {
        country: "Ghana",
        region: "Accra",
        city: "Nungua",
        town: "Beach road",
        locality: "lal",
        value: 18,
      },
      {
        country: "Ghana",
        region: "Accra",
        city: "Nungua",
        town: "Beach road",
        locality: "ewa",
        value: 12,
      },
      {
        country: "Ghana",
        region: "Accra",
        city: "labadi",
        town: "School",
        locality: "kjj",
        value: 14,
      },
      {
        country: "Ghana",
        region: "Accra",
        city: "Teshie",
        town: "kingsway",
        locality: "jua",
        value: 6,
      },
      {
        country: "Ghana",
        region: "Accra",
        city: "Nungua",
        town: "Senas",
        locality: "jdf",
        value: 3,
      },
      {
        country: "Ghana",
        region: "Accra",
        city: "labadi",
        town: "Street",
        locality: "sds",
        value: 16,
      },
      {
        country: "Ghana",
        region: "Kumasi",
        city: "Tafo",
        town: "mile 3",
        locality: "swe",
        value: 14,
      },
      {
        country: "Ghana",
        region: "Kumasi",
        city: "Pankros",
        town: "Atimatim",
        locality: "rash",
        value: 13,
      },
      {
        country: "Ghana",
        region: "Kumasi",
        city: "Suame",
        town: "Maakro",
        locality: "sds",
        value: 2,
      },
      {
        country: "Ghana",
        region: "Accra",
        city: "Teshie",
        town: "Lake",
        locality: "oio",
        value: 11,
      },
      {
        country: "Ghana",
        region: "Kumasi",
        city: "Kejetia",
        town: "Station",
        locality: "uio",
        value: 10,
      },
      {
        country: "Ghana",
        region: "Takoradi",
        city: "Paado",
        town: "market",
        locality: "umn",
        value: 2,
      },
      {
        country: "Ghana",
        region: "Kumasi",
        city: "Tafo",
        town: "mile 3",
        locality: "kaw",
        value: 8,
      },
      {
        country: "Ghana",
        region: "Accra",
        city: "Tema",
        town: "Comm 5",
        locality: "chu",
        value: 7,
      },
      {
        country: "Ghana",
        region: "Kumasi",
        city: "Tafo",
        town: "mile 4",
        locality: "mja",
        value: 5,
      },
      {
        country: "Ghana",
        region: "Kumasi",
        city: "Tafo",
        town: "market",
        locality: "uka",
        value: 6,
      },
      {
        country: "Ghana",
        region: "Takoradi",
        city: "Fijai",
        town: "town park",
        locality: "lio",
        value: 17,
      },
      {
        country: "Ghana",
        region: "Accra",
        city: "Nungua",
        town: "Maa mli",
        locality: "pqa",
        value: 2,
      },
      {
        country: "Ghana",
        region: "Kumasi",
        city: "Pankros",
        town: "Junction",
        locality: "site",
        value: 16,
      },
      {
        country: "Ghana",
        region: "Accra",
        city: "Tema",
        town: "Comm 2",
        locality: "Police",
        value: 10,
      },
      {
        country: "Ghana",
        region: "Takoradi",
        city: "Market Circle",
        town: "stra",
        locality: "line",
        value: 2,
      },
      {
        country: "Ghana",
        region: "Kumasi",
        city: "Kejetia",
        town: "Police",
        locality: "line 3",
        value: 10,
      },
      {
        country: "Ghana",
        region: "Takoradi",
        city: "Fijai",
        town: "stadium",
        locality: "airport",
        value: 9,
      },
    ],
    lineChartData: JSON.parse(localStorage.getItem("lineChartData")) || [
      { date: "2024-01-01", label: "January", value: 65 },
      { date: "2024-02-01", label: "February", value: 78 },
      { date: "2024-02-08", label: "February", value: 38 },
      { date: "2024-02-10", label: "February", value: 69 },
      { date: "2024-02-12", label: "February", value: 33 },
      { date: "2024-03-01", label: "March", value: 66 },
      { date: "2024-04-01", label: "April", value: 44 },
      { date: "2024-05-01", label: "May", value: 56 },
      { date: "2024-06-01", label: "June", value: 67 },
      { date: "2024-07-01", label: "July", value: 75 },
      { date: "2023-01-01", label: "January", value: 13 },
      { date: "2023-02-01", label: "February", value: 96 },
      { date: "2023-03-01", label: "March", value: 45 },
      { date: "2023-04-01", label: "April", value: 49 },
      { date: "2023-05-01", label: "May", value: 33 },
      { date: "2023-06-01", label: "June", value: 29 },
      { date: "2023-07-01", label: "July", value: 75 },
      { date: "2022-01-01", label: "January", value: 40 },
      { date: "2022-02-01", label: "February", value: 68 },
      { date: "2022-02-03", label: "February", value: 96 },
      { date: "2022-03-01", label: "March", value: 86 },
      { date: "2022-04-01", label: "April", value: 74 },
      { date: "2022-05-01", label: "May", value: 56 },
      { date: "2022-06-01", label: "June", value: 60 },
      { date: "2022-07-01", label: "July", value: 87 },
    ],
    CompletedChartData: JSON.parse(localStorage.getItem("lineChartData")) || [
      { date: "2024-01-01", label: "January", value: 25 },
      { date: "2024-02-01", label: "February", value: 33 },
      { date: "2024-02-08", label: "February", value: 69 },
      { date: "2024-02-10", label: "February", value: 37 },
      { date: "2024-02-12", label: "February", value: 47 },
      { date: "2024-03-01", label: "March", value: 93 },
      { date: "2024-04-01", label: "April", value: 85 },
      { date: "2024-05-01", label: "May", value: 62 },
      { date: "2024-06-01", label: "June", value: 42 },
      { date: "2024-07-01", label: "July", value: 47 },
      { date: "2023-01-01", label: "January", value: 59 },
      { date: "2023-02-01", label: "February", value: 34 },
      { date: "2023-03-01", label: "March", value: 62 },
      { date: "2023-04-01", label: "April", value: 81 },
      { date: "2023-05-01", label: "May", value: 69 },
      { date: "2023-06-01", label: "June", value: 12 },
      { date: "2023-07-01", label: "July", value: 19 },
      { date: "2022-01-01", label: "January", value: 67 },
      { date: "2022-02-01", label: "February", value: 44 },
      { date: "2022-02-03", label: "February", value: 58 },
      { date: "2022-03-01", label: "March", value: 73 },
      { date: "2022-04-01", label: "April", value: 28 },
      { date: "2022-05-01", label: "May", value: 92 },
      { date: "2022-06-01", label: "June", value: 33 },
      { date: "2022-07-01", label: "July", value: 18 },
    ],
    // lineChartData: JSON.parse(localStorage.getItem("lineChartData")) || [],

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

    filteredLineData(state) {
      const year = state.lineChartrange.year;
      const month = state.lineChartrange.month;
      return state.lineChartData.filter((item) => {
        const date = new Date(item.date);
        return (
          (year ? date.getFullYear() === year : true) &&
          (month !== null ? date.getMonth() === month : true)
        );
      });
    },
    filteredCompletedData(state) {
      const year = state.lineChartrange.year;
      const month = state.lineChartrange.month;
      return state.CompletedChartData.filter((item) => {
        const date = new Date(item.date);
        return (
          (year ? date.getFullYear() === year : true) &&
          (month !== null ? date.getMonth() === month : true)
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
    async fetchBarScanData() {
      try {
        const response = await getData.getBarScanChart(); // Replace with your backend endpoint
        this.BarScanChartData = response.data;
        localStorage.setItem(
          "barScanData",
          JSON.stringify(this.BarScanChartData)
        );
      } catch (error) {
        console.error("Failed to fetch bar scan data:", error);
      }
    },
    async fetchBarCompleteData() {
      try {
        const response = await getData.getBarCompleteChart(); // Replace with your backend endpoint
        this.BarCompleteChartData = response.data;
        localStorage.setItem(
          "barCompleteData",
          JSON.stringify(this.BarCompleteChartData)
        );
      } catch (error) {
        console.error("Failed to fetch bar complete data:", error);
      }
    },
    async fetchLineData() {
      try {
        const response = await getData.getLineChart(); // Replace with your backend endpoint
        this.lineChartData = response.data;
        localStorage.setItem(
          "lineChartData",
          JSON.stringify(this.lineChartData)
        );
      } catch (error) {
        console.error("Failed to fetch line data:", error);
      }
    },
    async fetchCompletedData() {
      try {
        const response = await getData.getCompletedChart(); // Replace with your backend endpoint
        this.CompletedChartData = response.data;
        localStorage.setItem(
          "CompletedChartData",
          JSON.stringify(this.CompletedChartData)
        );
      } catch (error) {
        console.error("Failed to fetch completed data:", error);
      }
    },
    updateRange(range) {
      this.lineChartrange.year = range.year;
      this.lineChartrange.month = range.month;
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
        const response = await getData.getCustomerReport(); // Assuming getReport fetches the file from backend
        return response;
      } catch (error) {
        console.error("Error downloading report:", error);
        throw error;
      }
    },
  },
});
