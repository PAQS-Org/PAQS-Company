/* eslint-disable linebreak-style */
import { defineStore } from "pinia";
import getData from "src/api/getData.js";
import { Notify } from "quasar";

export const useTransactionStore = defineStore("transaction", {
  state: () => ({
    transactions: [],
    currentPage: 1,
    pageSize: 5,
  }),
  getters: {
    paginatedTransactions(state) {
      const start = (state.currentPage - 1) * state.pageSize;
      const end = start + state.pageSize;
      return state.transactions.slice(start, end);
    },
    totalPages: (state) => {
      return Math.ceil(state.transactions.length / state.pageSize);
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
  },
});
