/* eslint-disable linebreak-style */
import { defineStore } from "pinia";
import getData from "src/api/getData.js";

export const useTransactionStore = defineStore("transaction", {
  state: () => ({
    BarScanChartData: JSON.parse(localStorage.getItem("lineChartData")) || [],
    BarCompleteChartData:
      JSON.parse(localStorage.getItem("lineChartData")) || [],
    lineChartData: JSON.parse(localStorage.getItem("lineChartData")) || [],
    lineChartrange: {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
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
    totalScanCompleteForMonth(state) {
      const currentMonth = state.lineChartrange.month;
      const currentYear = state.lineChartrange.year;
      const completedData = state.lineChartData.filter((item) => {
        const date = new Date(item.timestamp);
        return (
          date.getMonth() === currentMonth &&
          date.getFullYear() === currentYear &&
          item.scanned === "completed"
        );
      });
      const total = completedData.length;
      const average = (total / completedData.length).toFixed(2) || 0;
      return { total, average };
    },
    totalScanForMonth(state) {
      const currentMonth = state.lineChartrange.month;
      const currentYear = state.lineChartrange.year;
      const scanData = state.lineChartData.filter((item) => {
        const date = new Date(item.timestamp);
        return (
          date.getMonth() === currentMonth &&
          date.getFullYear() === currentYear &&
          item.scanned === "scanned"
        );
      });
      const total = scanData.length;
      const average = (total / scanData.length).toFixed(2) || 0;
      return { total, average };
    },

    topLocation(state) {
      const locationData = state.lineChartData.reduce((acc, item) => {
        const location = `${item.region}, ${item.city}, ${item.town}`;
        if (!acc[location]) {
          acc[location] = {
            completed: 0,
            scanned: 0,
            dates: [],
            products: {},
            daily: {},
            monthly: {},
            yearly: {},
          };
        }

        const date = new Date(item.timestamp);
        const day = date.toISOString().split("T")[0]; // YYYY-MM-DD format
        const month = `${date.getFullYear()}-${date.getMonth() + 1}`; // YYYY-M format
        const year = date.getFullYear(); // YYYY format

        if (!acc[location].products[item.productName]) {
          acc[location].products[item.productName] = {
            completed: 0,
            scanned: 0,
          };
        }

        if (item.scanned === "completed") {
          acc[location].completed++;
          acc[location].products[item.productName].completed++;
          if (!acc[location].daily[day])
            acc[location].daily[day] = { completed: 0, scanned: 0 };
          if (!acc[location].monthly[month])
            acc[location].monthly[month] = { completed: 0, scanned: 0 };
          if (!acc[location].yearly[year])
            acc[location].yearly[year] = { completed: 0, scanned: 0 };
          acc[location].daily[day].completed++;
          acc[location].monthly[month].completed++;
          acc[location].yearly[year].completed++;
        }
        if (item.scanned === "scanned") {
          acc[location].scanned++;
          acc[location].products[item.productName].scanned++;
          if (!acc[location].daily[day])
            acc[location].daily[day] = { completed: 0, scanned: 0 };
          if (!acc[location].monthly[month])
            acc[location].monthly[month] = { completed: 0, scanned: 0 };
          if (!acc[location].yearly[year])
            acc[location].yearly[year] = { completed: 0, scanned: 0 };
          acc[location].daily[day].scanned++;
          acc[location].monthly[month].scanned++;
          acc[location].yearly[year].scanned++;
        }
        acc[location].dates.push(date);
        return acc;
      }, {});

      const topLocation = Object.keys(locationData).reduce(
        (a, b) =>
          locationData[a]?.completed > locationData[b]?.completed ? a : b,
        ""
      );

      const totalCompleted = locationData[topLocation].completed;
      const totalScanned = locationData[topLocation].scanned;
      const conversionRate = (
        totalCompleted /
        (totalScanned + totalCompleted)
      ).toFixed(2);

      const dateRange = locationData[topLocation].dates;
      const days =
        (Math.max(...dateRange) - Math.min(...dateRange)) /
          (1000 * 60 * 60 * 24) || 1;
      const averagePerDay = (totalScanned / days).toFixed(2);
      const averagePerMonth = (averagePerDay * 30).toFixed(2);
      const averagePerYear = (averagePerDay * 365).toFixed(2);

      const dailyStats = Object.entries(locationData[topLocation].daily).map(
        ([date, counts]) => ({
          date,
          completed: counts.completed,
          scanned: counts.scanned,
        })
      );

      const monthlyStats = Object.entries(
        locationData[topLocation].monthly
      ).map(([date, counts]) => ({
        month: date,
        completed: counts.completed,
        scanned: counts.scanned,
      }));

      const yearlyStats = Object.entries(locationData[topLocation].yearly).map(
        ([date, counts]) => ({
          year: date,
          completed: counts.completed,
          scanned: counts.scanned,
        })
      );

      const reigningProduct = Object.keys(
        locationData[topLocation].products
      ).reduce(
        (a, b) =>
          locationData[topLocation].products[a]?.completed >
          locationData[topLocation].products[b]?.completed
            ? a
            : b,
        ""
      );

      return {
        location: topLocation,
        completed: totalCompleted,
        scanned: totalScanned,
        conversionRate,
        averagePerDay,
        averagePerMonth,
        averagePerYear,
        dailyStats,
        monthlyStats,
        yearlyStats,
        reigningProduct,
      };
    },
    leastAndMedianLocations(state) {
      const locationData = state.lineChartData.reduce((acc, item) => {
        const location = `${item.region}, ${item.city}, ${item.town}`;
        if (!acc[location]) {
          acc[location] = {
            completed: 0,
            scanned: 0,
            dates: [],
            products: {},
            daily: {},
            monthly: {},
            yearly: {},
          };
        }

        const date = new Date(item.timestamp);
        const day = date.toISOString().split("T")[0]; // YYYY-MM-DD format
        const month = `${date.getFullYear()}-${date.getMonth() + 1}`; // YYYY-M format
        const year = date.getFullYear(); // YYYY format

        if (!acc[location].products[item.productName]) {
          acc[location].products[item.productName] = {
            completed: 0,
            scanned: 0,
          };
        }

        if (item.scanned === "completed") {
          acc[location].completed++;
          acc[location].products[item.productName].completed++;
          if (!acc[location].daily[day])
            acc[location].daily[day] = { completed: 0, scanned: 0 };
          if (!acc[location].monthly[month])
            acc[location].monthly[month] = { completed: 0, scanned: 0 };
          if (!acc[location].yearly[year])
            acc[location].yearly[year] = { completed: 0, scanned: 0 };
          acc[location].daily[day].completed++;
          acc[location].monthly[month].completed++;
          acc[location].yearly[year].completed++;
        }
        if (item.scanned === "scanned") {
          acc[location].scanned++;
          acc[location].products[item.productName].scanned++;
          if (!acc[location].daily[day])
            acc[location].daily[day] = { completed: 0, scanned: 0 };
          if (!acc[location].monthly[month])
            acc[location].monthly[month] = { completed: 0, scanned: 0 };
          if (!acc[location].yearly[year])
            acc[location].yearly[year] = { completed: 0, scanned: 0 };
          acc[location].daily[day].scanned++;
          acc[location].monthly[month].scanned++;
          acc[location].yearly[year].scanned++;
        }
        acc[location].dates.push(date);
        return acc;
      }, {});

      const locations = Object.keys(locationData);

      const sortedLocations = locations.sort(
        (a, b) => locationData[a].completed - locationData[b].completed
      );
      const medianIndex = Math.floor(sortedLocations.length / 2);

      const leastLocation = sortedLocations[0];
      const medianLocation = sortedLocations[medianIndex];

      const getLocationData = (location) => {
        const totalCompleted = locationData[location].completed;
        const totalScanned = locationData[location].scanned;
        const conversionRate = totalCompleted / (totalScanned + totalCompleted);

        const dateRange = locationData[location].dates;
        const days =
          (Math.max(...dateRange) - Math.min(...dateRange)) /
            (1000 * 60 * 60 * 24) || 1;
        const averagePerDay = (totalScanned / days).toFixed(2);
        const averagePerMonth = (averagePerDay * 30).toFixed(2);
        const averagePerYear = (averagePerDay * 365).toFixed(2);

        const dailyStats = Object.entries(locationData[location].daily).map(
          ([date, counts]) => ({
            date,
            completed: counts.completed,
            scanned: counts.scanned,
          })
        );

        const monthlyStats = Object.entries(locationData[location].monthly).map(
          ([date, counts]) => ({
            month: date,
            completed: counts.completed,
            scanned: counts.scanned,
          })
        );

        const yearlyStats = Object.entries(locationData[location].yearly).map(
          ([date, counts]) => ({
            year: date,
            completed: counts.completed,
            scanned: counts.scanned,
          })
        );

        const reigningProduct = Object.keys(
          locationData[location].products
        ).reduce(
          (a, b) =>
            locationData[location].products[a].completed >
            locationData[location].products[b].completed
              ? a
              : b,
          ""
        );

        return {
          location,
          completed: totalCompleted,
          scanned: totalScanned,
          conversionRate,
          averagePerDay,
          averagePerMonth,
          averagePerYear,
          dailyStats,
          monthlyStats,
          yearlyStats,
          reigningProduct,
        };
      };

      return {
        leastLocationData: getLocationData(leastLocation),
        medianLocationData: getLocationData(medianLocation),
      };
    },

    // new code
    filterData(state) {
      return (condition) => state.lineChartData.filter(condition);
    },
    // Calculate metrics for the current and previous day, month, and year
    checkoutMetrics(state, getters) {
      const today = new Date();
      const prevDay = new Date(today);
      prevDay.setDate(today.getDate() - 1);
      const prevMonth = new Date(today);
      prevMonth.setMonth(today.getMonth() - 1);
      const prevYear = new Date(today);
      prevYear.setFullYear(today.getFullYear() - 1);

      const currentDayMetrics = this.calculateMetricsForPeriod(today, "day");
      const prevDayMetrics = this.calculateMetricsForPeriod(prevDay, "day");
      const currentMonthMetrics = this.calculateMetricsForPeriod(
        today,
        "month"
      );
      const prevMonthMetrics = this.calculateMetricsForPeriod(
        prevMonth,
        "month"
      );
      const currentYearMetrics = this.calculateMetricsForPeriod(today, "year");
      const prevYearMetrics = this.calculateMetricsForPeriod(prevYear, "year");

      return {
        currentDayMetrics,
        prevDayMetrics,
        currentMonthMetrics,
        prevMonthMetrics,
        currentYearMetrics,
        prevYearMetrics,
      };
    },
    calculateMetricsForPeriod(state, getters) {
      return (date, period) => {
        const start = new Date(date);
        const end = new Date(date);

        if (period === "day") {
          end.setDate(start.getDate() + 1);
        } else if (period === "month") {
          start.setDate(1);
          end.setMonth(start.getMonth() + 1);
        } else if (period === "year") {
          start.setMonth(0, 1);
          end.setFullYear(start.getFullYear() + 1);
        }

        const filteredData = this.filterData((item) => {
          const itemDate = new Date(item.timestamp);
          return itemDate >= start && itemDate < end;
        });

        const completedCount = filteredData.filter(
          (item) => item.scanned === "completed"
        ).length;
        const scannedCount = filteredData.filter(
          (item) => item.scanned === "scanned"
        ).length;

        return { completedCount, scannedCount };
      };
    },
    conversionRate(state, getters) {
      return (metrics) => {
        if (metrics.scannedCount === 0) return 0;
        return (metrics.completedCount / metrics.scannedCount) * 100;
      };
    },
    highestCheckout(state) {
      return (productName) => {
        const productData = state.lineChartData.filter(
          (item) =>
            item.productName === productName && item.scanned === "completed"
        );
        const dailyMetrics = this.aggregateMetrics(productData, "day");
        const monthlyMetrics = this.aggregateMetrics(productData, "month");
        const yearlyMetrics = this.aggregateMetrics(productData, "year");

        const highestDaily = dailyMetrics.reduce(
          (max, curr) => (curr.count > max.count ? curr : max),
          { count: 0 }
        );
        const highestMonthly = monthlyMetrics.reduce(
          (max, curr) => (curr.count > max.count ? curr : max),
          { count: 0 }
        );
        const highestYearly = yearlyMetrics.reduce(
          (max, curr) => (curr.count > max.count ? curr : max),
          { count: 0 }
        );

        return { highestDaily, highestMonthly, highestYearly };
      };
    },
    lowestCheckout(state) {
      return (productName) => {
        const productData = state.lineChartData.filter(
          (item) =>
            item.productName === productName && item.scanned === "completed"
        );
        const dailyMetrics = this.aggregateMetrics(productData, "day");
        const monthlyMetrics = this.aggregateMetrics(productData, "month");
        const yearlyMetrics = this.aggregateMetrics(productData, "year");

        const lowestDaily = dailyMetrics.reduce(
          (min, curr) => (curr.count < min.count ? curr : min),
          { count: Infinity }
        );
        const lowestMonthly = monthlyMetrics.reduce(
          (min, curr) => (curr.count < min.count ? curr : min),
          { count: Infinity }
        );
        const lowestYearly = yearlyMetrics.reduce(
          (min, curr) => (curr.count < min.count ? curr : min),
          { count: Infinity }
        );

        return { lowestDaily, lowestMonthly, lowestYearly };
      };
    },
    aggregateMetrics(state) {
      return (data, period) => {
        const metrics = {};

        data.forEach((item) => {
          const date = new Date(item.timestamp);
          let key;
          if (period === "day") {
            key = date.toISOString().split("T")[0];
          } else if (period === "month") {
            key = `${date.getFullYear()}-${date.getMonth() + 1}`;
          } else if (period === "year") {
            key = date.getFullYear();
          }

          if (!metrics[key]) {
            metrics[key] = { date: key, count: 0 };
          }

          metrics[key].count++;
        });

        return Object.values(metrics);
      };
    },
    highestCheckoutPerLocation(state) {
      return (productName) => {
        const locationData = state.lineChartData.filter(
          (item) =>
            item.productName === productName && item.scanned === "completed"
        );
        const locationMetrics = this.aggregateMetricsByLocation(locationData);
        return locationMetrics.reduce(
          (max, curr) => (curr.count > max.count ? curr : max),
          { count: 0 }
        );
      };
    },
    lowestCheckoutPerLocation(state) {
      return (productName) => {
        const locationData = state.lineChartData.filter(
          (item) =>
            item.productName === productName && item.scanned === "completed"
        );
        const locationMetrics = this.aggregateMetricsByLocation(locationData);
        return locationMetrics.reduce(
          (min, curr) => (curr.count < min.count ? curr : min),
          { count: Infinity }
        );
      };
    },
    aggregateMetricsByLocation(state) {
      return (data) => {
        const metrics = {};

        data.forEach((item) => {
          const location = `${item.region}, ${item.city}, ${item.town}, ${item.locality}`;
          if (!metrics[location]) {
            metrics[location] = { location, count: 0 };
          }
          metrics[location].count++;
        });

        return Object.values(metrics);
      };
    },
    // new code ends
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
        //const response = await getData.getLineChart(); // Replace with your backend endpoint
        const response = await fetch("../../src/stores/dummy.json");
        const data = await response.json();
        this.lineChartData = data;
        localStorage.setItem(
          "lineChartData",
          JSON.stringify(this.lineChartData)
        );
      } catch (error) {
        console.error("Failed to fetch line data:", error);
      }
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
