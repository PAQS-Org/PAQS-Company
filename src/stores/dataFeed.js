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
    transactions: JSON.parse(localStorage.getItem("transactionData")) || [],
    currentPageTrendz: 1,
    pageSizeTrendz: 5,
    currentPage: 1,
    pageSize: 5,
    currentPageCust: 1,
    pageSizeCust: 5,
  }),
  getters: {
    getCompanyStatistics(state) {
      if (!state.lineChartData.length) {
        return {
          totalCompleted: 0,
          bestMonth: { monthYear: "", count: 0 },
          ema: [],
        };
      }
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      let completedCounts = {};
      let totalCompleted = 0;
      let completedYearCounts = {};
      let totalScans = {};

      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      state.lineChartData.forEach((item) => {
        const date = new Date(item.timestamp);
        const year = date.getFullYear();

        if (!completedYearCounts[year]) {
          completedYearCounts[year] = 0;
          totalScans[year] = 0;
        }

        if (item.scanned === "completed") {
          completedYearCounts[year]++;
        }

        totalScans[year]++;
      });

      state.lineChartData.forEach((item) => {
        if (item.scanned === "completed") {
          const date = new Date(item.timestamp);
          const formattedDate = new Intl.DateTimeFormat("en-US", {
            timeZone: userTimezone,
            month: "numeric",
            year: "numeric",
          }).format(date);

          const [formattedMonth, formattedYear] = formattedDate.split("/");
          const monthYear = `${monthNames[formattedMonth]}-${formattedYear}`;

          if (!completedCounts[monthYear]) {
            completedCounts[monthYear] = 0;
          }
          completedCounts[monthYear]++;
          totalCompleted++;
        }
      });

      let yearlyPerformance = Object.keys(completedYearCounts).map((year) => {
        return {
          year: year,
          percentage: (
            (completedYearCounts[year] / totalScans[year]) *
            100
          ).toFixed(2),
        };
      });

      // Get the best performing year
      let bestYear = yearlyPerformance.reduce(
        (best, current) =>
          current.percentage > best.percentage ? current : best,
        { year: "", percentage: 0 }
      );

      // Convert completedCounts to an array of counts
      let completedCountsArray = Object.entries(completedCounts).map(
        ([key, value]) => ({
          monthYear: key,
          count: value,
        })
      );

      // Sort by month-year to get a chronological order
      completedCountsArray.sort(
        (a, b) => new Date(`01-${a.monthYear}`) - new Date(`01-${b.monthYear}`)
      );

      // Get the best performing month
      let bestMonth = completedCountsArray.reduce(
        (best, current) => (current.count > best.count ? current : best),
        {
          monthYear: "",
          count: 0,
        }
      );

      return {
        totalCompleted,
        bestMonth,
        bestYear,
      };
    },

    totalScanCompleteForMonthAndYTD(state) {
      const currentMonth = state.lineChartrange.month; // 0-based index for the current month
      const currentYear = state.lineChartrange.year;
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      // Filter data for the current month
      const completedDataForMonth = state.lineChartData.filter((item) => {
        const date = new Date(item.timestamp);
        const formattedDate = new Intl.DateTimeFormat("en-US", {
          timeZone: userTimezone,
          month: "numeric",
          year: "numeric",
        }).format(date);

        const [formattedMonth, formattedYear] = formattedDate.split("/");
        return (
          parseInt(formattedMonth) - 1 === currentMonth &&
          parseInt(formattedYear) === currentYear &&
          item.scanned === "completed"
        );
      });

      const totalForMonth = completedDataForMonth.length;

      // Filter data for the year-to-date (YTD)
      const completedDataForYTD = state.lineChartData.filter((item) => {
        const date = new Date(item.timestamp);
        const formattedYear = new Intl.DateTimeFormat("en-US", {
          timeZone: userTimezone,
          year: "numeric",
        }).format(date);

        return (
          parseInt(formattedYear) === currentYear &&
          item.scanned === "completed"
        );
      });

      const totalForYTD = completedDataForYTD.length;
      const monthsElapsed = currentMonth + 1; // January is 0, so add 1 to get the count of months elapsed
      const averageForYTD = (totalForYTD / monthsElapsed).toFixed(2);

      return {
        totalForMonth,
        averageForYTD,
      };
    },
    totalScanForMonthAndYTD(state) {
      const currentMonth = state.lineChartrange.month; // 0-based index for the current month
      const currentYear = state.lineChartrange.year;
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      // Filter data for the current month
      const scannedDataForMonth = state.lineChartData.filter((item) => {
        const date = new Date(item.timestamp);
        const formattedDate = new Intl.DateTimeFormat("en-US", {
          timeZone: userTimezone,
          month: "numeric",
          year: "numeric",
        }).format(date);

        const [formattedMonth, formattedYear] = formattedDate.split("/");
        return (
          parseInt(formattedMonth) - 1 === currentMonth &&
          parseInt(formattedYear) === currentYear &&
          item.scanned === "scanned"
        );
      });

      const totalForMonth = scannedDataForMonth.length;

      // Filter data for the year-to-date (YTD)
      const scannedDataForYTD = state.lineChartData.filter((item) => {
        const date = new Date(item.timestamp);
        const formattedYear = new Intl.DateTimeFormat("en-US", {
          timeZone: userTimezone,
          year: "numeric",
        }).format(date);

        return (
          parseInt(formattedYear) === currentYear && item.scanned === "scanned"
        );
      });

      const totalForYTD = scannedDataForYTD.length;
      const monthsElapsed = currentMonth + 1; // January is 0, so add 1 to get the count of months elapsed
      const averageForYTD = (totalForYTD / monthsElapsed).toFixed(2);

      return {
        totalForMonth,
        averageForYTD,
      };
    },

    topLocation(state) {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

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
        const day = new Intl.DateTimeFormat("en-US", {
          timeZone: userTimezone,
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }).format(date);

        const [dayYear, dayMonth, dayDay] = day.split("/");

        const month = `${dayYear}-${dayMonth}`;
        const year = dayYear;

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

      const dailyStats = Object.entries(locationData[topLocation]?.daily).map(
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
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

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
        const day = new Intl.DateTimeFormat("en-US", {
          timeZone: userTimezone,
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }).format(date);

        const [dayYear, dayMonth, dayDay] = day.split("/");

        const month = `${dayYear}-${dayMonth}`;
        const year = dayYear;

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

      const sortedLocations = Object.keys(locationData).sort(
        (a, b) => locationData[a]?.completed - locationData[b]?.completed
      );

      const medianIndex = Math.floor(sortedLocations.length / 2);
      const medianLocation = sortedLocations[medianIndex];
      const leastLocation = sortedLocations[0];

      const medianLocationData = locationData[medianLocation];
      const leastLocationData = locationData[leastLocation];

      const getLocationStats = (locationData) => {
        const totalCompleted = locationData.completed;
        const totalScanned = locationData.scanned;
        const conversionRate = (
          totalCompleted /
          (totalScanned + totalCompleted)
        ).toFixed(2);

        const dateRange = locationData.dates;
        const days =
          (Math.max(...dateRange) - Math.min(...dateRange)) /
            (1000 * 60 * 60 * 24) || 1;
        const averagePerDay = (totalScanned / days).toFixed(2);
        const averagePerMonth = (averagePerDay * 30).toFixed(2);
        const averagePerYear = (averagePerDay * 365).toFixed(2);

        const dailyStats = Object.entries(locationData.daily).map(
          ([date, counts]) => ({
            date,
            completed: counts.completed,
            scanned: counts.scanned,
          })
        );

        const monthlyStats = Object.entries(locationData.monthly).map(
          ([date, counts]) => ({
            month: date,
            completed: counts.completed,
            scanned: counts.scanned,
          })
        );

        const yearlyStats = Object.entries(locationData.yearly).map(
          ([date, counts]) => ({
            year: date,
            completed: counts.completed,
            scanned: counts.scanned,
          })
        );

        const reigningProduct = Object.keys(locationData.products).reduce(
          (a, b) =>
            locationData.products[a]?.completed >
            locationData.products[b]?.completed
              ? a
              : b,
          ""
        );

        return {
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
        leastLocation: {
          location: leastLocation,
          ...getLocationStats(leastLocationData),
        },
        medianLocation: {
          location: medianLocation,
          ...getLocationStats(medianLocationData),
        },
      };
    },

    // new code

    filterData(state) {
      return (condition) => state.lineChartData.filter(condition);
    },
    // Calculate metrics for the current and previous day, month, and year
    checkoutMetrics(state, getters) {
      return (productName) => {
        const today = new Date();
        const prevDay = new Date(today);
        prevDay.setDate(today.getDate() - 1);
        const prevMonth = new Date(today);
        prevMonth.setMonth(today.getMonth() - 1);
        const prevYear = new Date(today);
        prevYear.setFullYear(today.getFullYear() - 1);

        const currentDayMetrics = this.calculateMetricsForPeriod(
          today,
          "day",
          productName
        );
        const prevDayMetrics = this.calculateMetricsForPeriod(
          prevDay,
          "day",
          productName
        );
        const currentMonthMetrics = this.calculateMetricsForPeriod(
          today,
          "month",
          productName
        );
        const prevMonthMetrics = this.calculateMetricsForPeriod(
          prevMonth,
          "month",
          productName
        );
        const currentYearMetrics = this.calculateMetricsForPeriod(
          today,
          "year",
          productName
        );
        const prevYearMetrics = this.calculateMetricsForPeriod(
          prevYear,
          "year",
          productName
        );
        return {
          scanned: {
            currentDayMetrics: currentDayMetrics.scannedCount,
            prevDayMetrics: prevDayMetrics.scannedCount,
            currentMonthMetrics: currentMonthMetrics.scannedCount,
            prevMonthMetrics: prevMonthMetrics.scannedCount,
            currentYearMetrics: currentYearMetrics.scannedCount,
            prevYearMetrics: prevYearMetrics.scannedCount,
          },
          completed: {
            currentDayMetrics: currentDayMetrics.completedCount,
            prevDayMetrics: prevDayMetrics.completedCount,
            currentMonthMetrics: currentMonthMetrics.completedCount,
            prevMonthMetrics: prevMonthMetrics.completedCount,
            currentYearMetrics: currentYearMetrics.completedCount,
            prevYearMetrics: prevYearMetrics.completedCount,
          },
        };
      };
    },

    calculateMetricsForPeriod(state) {
      return (date, period, productName) => {
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

        const startTime = start.getTime();
        const endTime = end.getTime();
        const filteredData = state.lineChartData.filter((item) => {
          const itemDate = new Date(item.timestamp).getTime();
          return (
            itemDate >= startTime &&
            itemDate < endTime &&
            item.productName === productName
          );
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

    conversionRate(state) {
      return (prodName) => {
        const prodScan = state.lineChartData.filter(
          (item) => item.productName === prodName && item.scanned === "scanned"
        );
        const prodComp = state.lineChartData.filter(
          (item) =>
            item.productName === prodName && item.scanned === "completed"
        );
        if (prodScan.length > 0) {
          const convRate = ((prodComp.length / prodScan.length) * 100).toFixed(
            2
          );
          return convRate;
        } else {
          return null;
        }
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
        return {
          highestDaily: { date: highestDaily.date, count: highestDaily.count },
          highestMonthly: {
            month: highestMonthly.date,
            count: highestMonthly.count,
          },
          highestYearly: {
            year: highestYearly.date,
            count: highestYearly.count,
          },
        };
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

        return {
          lowestDaily: { date: lowestDaily.date, count: lowestDaily.count },
          lowestMonthly: {
            month: lowestMonthly.date,
            count: lowestMonthly.count,
          },
          lowestYearly: { year: lowestYearly.date, count: lowestYearly.count },
        };
      };
    },

    aggregateMetrics(state) {
      return (data, period) => {
        const metrics = {};
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

        data.forEach((item) => {
          const date = new Date(item.timestamp);
          let key;
          if (period === "day") {
            key = date.toLocaleDateString();
          } else if (period === "month") {
            key = `${monthNames[date.getMonth()]}-${date.getFullYear()}`;
          } else if (period === "year") {
            key = date.getFullYear().toString();
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
        const highestLocation = locationMetrics.reduce(
          (max, curr) => (curr.count > max.count ? curr : max),
          { count: 0 }
        );
        return {
          location: highestLocation.location,
          count: highestLocation.count,
        };
      };
    },
    lowestCheckoutPerLocation(state) {
      return (productName) => {
        const locationData = state.lineChartData.filter(
          (item) =>
            item.productName === productName && item.scanned === "completed"
        );
        const locationMetrics = this.aggregateMetricsByLocation(locationData);
        const lowestLocation = locationMetrics.reduce(
          (min, curr) => (curr.count < min.count ? curr : min),
          { count: Infinity }
        );

        return {
          location: lowestLocation.location,
          count: lowestLocation.count,
        };
      };
    },
    medianCheckoutPerLocation(state) {
      return (productName) => {
        const locationData = state.lineChartData.filter(
          (item) =>
            item.productName === productName && item.scanned === "completed"
        );
        const locationMetrics = this.aggregateMetricsByLocation(locationData);

        // Sort the location metrics by count
        const sortedMetrics = locationMetrics.sort((a, b) => a.count - b.count);

        // Find the median
        const mid = Math.floor(sortedMetrics.length / 2);
        const medianLocation =
          sortedMetrics.length % 2 === 0
            ? {
                location: `${sortedMetrics[mid - 1].location} & ${
                  sortedMetrics[mid].location
                }`,
                count:
                  (sortedMetrics[mid - 1].count + sortedMetrics[mid].count) / 2,
              }
            : sortedMetrics[mid];

        return {
          location: medianLocation.location,
          count: medianLocation.count,
        };
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
        const response = await getData.getReceipts();
        this.transactions = response.data.results.map((item) => ({
          ...item,
          download: `http://127.0.0.1:8000/payment/receipt/${item.transaction_id}/`,
        }));
        localStorage.setItem(
          "transactionData",
          JSON.stringify(this.transactions)
        );
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
    setMonth(newMonth) {
      this.lineChartrange.month = newMonth;
    },
    setYear(newYear) {
      this.lineChartrange.year = newYear;
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
