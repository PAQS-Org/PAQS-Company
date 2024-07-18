/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import { defineStore } from "pinia";
import getData from "src/api/getData.js";
import { Notify } from "quasar";

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
        console.log("greeee");
        return {
          totalCompleted: 0,
          bestMonth: { monthYear: "", count: 0 },
          bestYear: { year: "", percentage: 0 },
        };
      }

      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const memoizedFormattedDates = {};
      const memoizedCompletedCounts = {};
      const memoizedTotalScans = {};

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

      // Process data once to populate completed counts and total scans
      state.lineChartData.forEach((item) => {
        const date = new Date(item.timestamp);
        const year = date.getFullYear();
        const formattedMonthYear = formatDate(item.timestamp, {
          timeZone: userTimezone,
          month: "numeric",
          year: "numeric",
        });

        if (!memoizedCompletedCounts[year]) {
          memoizedCompletedCounts[year] = 0;
          memoizedTotalScans[year] = 0;
        }

        if (item.scanned === "completed") {
          memoizedCompletedCounts[year]++;
        }

        memoizedTotalScans[year]++;
      });

      // Calculate totalCompleted and completedCounts for months
      let totalCompleted = 0;
      let completedCounts = {};

      state.lineChartData.forEach((item) => {
        if (item.scanned === "completed") {
          const date = new Date(item.timestamp);
          const formattedDate = formatDate(item.timestamp, {
            timeZone: userTimezone,
            month: "numeric",
            year: "numeric",
          });

          const [formattedMonth, formattedYear] = formattedDate.split("/");
          const monthYear = `${
            monthNames[formattedMonth - 1]
          }-${formattedYear}`;

          if (!completedCounts[monthYear]) {
            completedCounts[monthYear] = 0;
          }
          completedCounts[monthYear]++;
          totalCompleted++;
        }
      });

      let yearlyPerformance = Object.keys(memoizedCompletedCounts).map(
        (year) => {
          return {
            year,
            percentage: (
              (memoizedCompletedCounts[year] / memoizedTotalScans[year]) *
              100
            ).toFixed(2),
          };
        }
      );

      // Get the best performing year
      let bestYear = yearlyPerformance.reduce(
        (best, current) =>
          parseFloat(current.percentage) > parseFloat(best.percentage)
            ? current
            : best,
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
        { monthYear: "", count: 0 }
      );

      return {
        totalCompleted,
        bestMonth,
        bestYear,
      };

      function formatDate(timestamp, options) {
        const key = `${timestamp}_${JSON.stringify(options)}`;
        if (!memoizedFormattedDates[key]) {
          const date = new Date(timestamp);
          memoizedFormattedDates[key] = new Intl.DateTimeFormat(
            "en-US",
            options
          ).format(date);
        }
        return memoizedFormattedDates[key];
      }
    },

    totalScanCompleteForMonthAndYTD(state) {
      const currentMonth = state.lineChartrange.month; // 0-based index for the current month
      const currentYear = state.lineChartrange.year;
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const memoizedFormattedDates = {};
      const memoizedMonthlyCompletions = {};
      const memoizedYearlyCompletions = {};

      function formatDate(timestamp, options) {
        const key = `${timestamp}_${JSON.stringify(options)}`;
        if (!memoizedFormattedDates[key]) {
          const date = new Date(timestamp);
          memoizedFormattedDates[key] = new Intl.DateTimeFormat(
            "en-US",
            options
          ).format(date);
        }
        return memoizedFormattedDates[key];
      }

      // Initialize counts for the current month and year
      let totalForMonth = 0;
      let totalForYTD = 0;

      // Process each item once to populate monthly and yearly completions
      state.lineChartData.forEach((item) => {
        const date = new Date(item.timestamp);
        const monthYear = formatDate(item.timestamp, {
          timeZone: userTimezone,
          month: "numeric",
          year: "numeric",
        });
        const year = formatDate(item.timestamp, {
          timeZone: userTimezone,
          year: "numeric",
        });

        const [formattedMonth, formattedYear] = monthYear.split("/");
        const month = parseInt(formattedMonth) - 1;
        const itemYear = parseInt(formattedYear);

        if (item.scanned === "completed") {
          if (!memoizedMonthlyCompletions[itemYear]) {
            memoizedMonthlyCompletions[itemYear] = {};
          }
          if (!memoizedMonthlyCompletions[itemYear][month]) {
            memoizedMonthlyCompletions[itemYear][month] = 0;
          }

          if (!memoizedYearlyCompletions[itemYear]) {
            memoizedYearlyCompletions[itemYear] = 0;
          }

          memoizedMonthlyCompletions[itemYear][month]++;
          memoizedYearlyCompletions[itemYear]++;
        }
      });

      totalForMonth =
        memoizedMonthlyCompletions[currentYear]?.[currentMonth] || 0;
      totalForYTD = memoizedYearlyCompletions[currentYear] || 0;
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

      const memoizedFormattedDates = {};
      const memoizedMonthlyScans = {};
      const memoizedYearlyScans = {};

      function formatDate(timestamp, options) {
        const key = `${timestamp}_${JSON.stringify(options)}`;
        if (!memoizedFormattedDates[key]) {
          const date = new Date(timestamp);
          memoizedFormattedDates[key] = new Intl.DateTimeFormat(
            "en-US",
            options
          ).format(date);
        }
        return memoizedFormattedDates[key];
      }

      // Initialize counts for the current month and year
      let totalForMonth = 0;
      let totalForYTD = 0;

      // Process each item once to populate monthly and yearly scans
      state.lineChartData.forEach((item) => {
        const date = new Date(item.timestamp);
        const monthYear = formatDate(item.timestamp, {
          timeZone: userTimezone,
          month: "numeric",
          year: "numeric",
        });
        const year = formatDate(item.timestamp, {
          timeZone: userTimezone,
          year: "numeric",
        });

        const [formattedMonth, formattedYear] = monthYear.split("/");
        const month = parseInt(formattedMonth) - 1;
        const itemYear = parseInt(formattedYear);

        if (item.scanned === "scanned") {
          if (!memoizedMonthlyScans[itemYear]) {
            memoizedMonthlyScans[itemYear] = {};
          }
          if (!memoizedMonthlyScans[itemYear][month]) {
            memoizedMonthlyScans[itemYear][month] = 0;
          }

          if (!memoizedYearlyScans[itemYear]) {
            memoizedYearlyScans[itemYear] = 0;
          }

          memoizedMonthlyScans[itemYear][month]++;
          memoizedYearlyScans[itemYear]++;
        }
      });

      totalForMonth = memoizedMonthlyScans[currentYear]?.[currentMonth] || 0;
      totalForYTD = memoizedYearlyScans[currentYear] || 0;
      const monthsElapsed = currentMonth + 1; // January is 0, so add 1 to get the count of months elapsed
      const averageForYTD = (totalForYTD / monthsElapsed).toFixed(2);

      return {
        totalForMonth,
        averageForYTD,
      };
    },

    topLocation(state) {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const memoizedDateFormats = {};
      const memoizedLocationData = {};
      const memoizedProducts = {};

      function formatDate(timestamp, options) {
        const key = `${timestamp}_${JSON.stringify(options)}`;
        if (!memoizedDateFormats[key]) {
          const date = new Date(timestamp);
          memoizedDateFormats[key] = new Intl.DateTimeFormat(
            "en-US",
            options
          ).format(date);
        }
        return memoizedDateFormats[key];
      }

      function initializeCountIfNeeded(acc, location, period, periodKey) {
        if (!acc[location][period][periodKey]) {
          acc[location][period][periodKey] = { completed: 0, scanned: 0 };
        }
      }

      function getLocationKey(item) {
        return `${item.region}, ${item.city}, ${item.town}`;
      }

      const locationData = state.lineChartData.reduce((acc, item) => {
        const location = getLocationKey(item);
        if (!memoizedLocationData[location]) {
          memoizedLocationData[location] = {
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
        const day = formatDate(item.timestamp, {
          timeZone: userTimezone,
          year: "numeric",
          month: "numeric",
          day: "numeric",
        });
        const [dayYear, dayMonth] = day.split("/").slice(0, 2);
        const month = `${dayYear}-${dayMonth}`;
        const year = dayYear;

        if (!memoizedProducts[location]) {
          memoizedProducts[location] = {};
        }

        if (!memoizedProducts[location][item.productName]) {
          memoizedProducts[location][item.productName] = {
            completed: 0,
            scanned: 0,
          };
        }

        if (item.scanned === "completed") {
          memoizedLocationData[location].completed++;
          memoizedProducts[location][item.productName].completed++;
          initializeCountIfNeeded(memoizedLocationData, location, "daily", day);
          initializeCountIfNeeded(
            memoizedLocationData,
            location,
            "monthly",
            month
          );
          initializeCountIfNeeded(
            memoizedLocationData,
            location,
            "yearly",
            year
          );
          memoizedLocationData[location].daily[day].completed++;
          memoizedLocationData[location].monthly[month].completed++;
          memoizedLocationData[location].yearly[year].completed++;
        }
        if (item.scanned === "scanned") {
          memoizedLocationData[location].scanned++;
          memoizedProducts[location][item.productName].scanned++;
          initializeCountIfNeeded(memoizedLocationData, location, "daily", day);
          initializeCountIfNeeded(
            memoizedLocationData,
            location,
            "monthly",
            month
          );
          initializeCountIfNeeded(
            memoizedLocationData,
            location,
            "yearly",
            year
          );
          memoizedLocationData[location].daily[day].scanned++;
          memoizedLocationData[location].monthly[month].scanned++;
          memoizedLocationData[location].yearly[year].scanned++;
        }
        memoizedLocationData[location].dates.push(date);
        return memoizedLocationData;
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

    checkoutMetrics() {
      return (productName) => {
        const today = new Date();
        const prevDay = new Date(today);
        prevDay.setDate(today.getDate() - 1);
        const prevMonth = new Date(today);
        prevMonth.setMonth(today.getMonth() - 1);
        const prevYear = new Date(today);
        prevYear.setFullYear(today.getFullYear() - 1);

        const currentDayMetrics = this.CalculateMetricsForPeriod(
          today,
          "day",
          productName
        );
        const prevDayMetrics = this.CalculateMetricsForPeriod(
          prevDay,
          "day",
          productName
        );
        const currentMonthMetrics = this.CalculateMetricsForPeriod(
          today,
          "month",
          productName
        );
        const prevMonthMetrics = this.CalculateMetricsForPeriod(
          prevMonth,
          "month",
          productName
        );
        const currentYearMetrics = this.CalculateMetricsForPeriod(
          today,
          "year",
          productName
        );
        const prevYearMetrics = this.CalculateMetricsForPeriod(
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

    CalculateMetricsForPeriod(state) {
      const cache = {};

      return (date, period, productName) => {
        const key = JSON.stringify({
          date: date.toString(),
          period,
          productName,
        });
        if (cache[key]) {
          return cache[key];
        }

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

        const result = { completedCount, scannedCount };
        cache[key] = result;
        return result;
      };
    },

    conversionRate(state) {
      return (prodName) => {
        const prodScan = this.FilterByProductName(
          state.lineChartData,
          prodName,
          "scanned"
        );
        const prodComp = this.FilterByProductName(
          state.lineChartData,
          prodName,
          "completed"
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
        const productData = this.FilterByProductName(
          state.lineChartData,
          productName,
          "completed"
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
        const productData = this.FilterByProductName(
          state.lineChartData,
          productName,
          "completed"
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

    aggregateMetrics() {
      const cache = {};

      return (data, period) => {
        const key = JSON.stringify({
          data: data.map((d) => d.timestamp),
          period,
        });
        if (cache[key]) {
          return cache[key];
        }

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
          let periodKey;
          if (period === "day") {
            periodKey = date.toLocaleDateString();
          } else if (period === "month") {
            periodKey = `${monthNames[date.getMonth()]}-${date.getFullYear()}`;
          } else if (period === "year") {
            periodKey = date.getFullYear().toString();
          }

          if (!metrics[periodKey]) {
            metrics[periodKey] = { date: periodKey, count: 0 };
          }

          metrics[periodKey].count++;
        });

        const result = Object.values(metrics);
        cache[key] = result;
        return result;
      };
    },

    highestCheckoutPerLocation(state) {
      return (productName) => {
        const locationData = this.FilterByProductName(
          state.lineChartData,
          productName,
          "completed"
        );
        const locationMetrics = this.AggregateMetricsByLocation(locationData);
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
        const locationData = this.FilterByProductName(
          state.lineChartData,
          productName,
          "completed"
        );
        const locationMetrics = this.AggregateMetricsByLocation(locationData);
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

    aggregateMetricsByLocation() {
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

    AggregateMetricsByLocation() {
      const cache = {};

      return (data) => {
        const key = JSON.stringify(
          data.map((d) => `${d.region}_${d.city}_${d.town}_${d.locality}`)
        );
        if (cache[key]) {
          return cache[key];
        }

        const metrics = {};

        data.forEach((item) => {
          const location = `${item.region}, ${item.city}, ${item.town}, ${item.locality}`;
          if (!metrics[location]) {
            metrics[location] = { location, count: 0 };
          }
          metrics[location].count++;
        });

        const result = Object.values(metrics);
        cache[key] = result;
        return result;
      };
    },

    FilterByProductName() {
      const cache = {};

      return (data, productName, status) => {
        const key = JSON.stringify({ productName, status });
        if (cache[key]) {
          return cache[key];
        }

        const filteredData = data.filter(
          (item) => item.productName === productName && item.scanned === status
        );

        cache[key] = filteredData;
        return filteredData;
      };
    },

    aggregateMetricsByLocation() {
      return (data) => this.AggregateMetricsByLocation(data);
    },

    medianCheckoutPerLocation(state) {
      return (productName) => {
        const locationData = this.FilterByProductName(
          state.lineChartData,
          productName,
          "completed"
        );
        const locationMetrics = this.AggregateMetricsByLocation(locationData);

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
          download: `https://web-production-ef21.up.railway.app/payment/receipt/${item.transaction_id}/`,
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
      } catch (e) {
        let errorMessage = "An error occurred during login.";

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
      } catch (e) {
        let errorMessage = "An error occurred during login.";

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
      } catch (e) {
        let errorMessage = "An error occurred during login.";

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
      } catch (e) {
        let errorMessage = "An error occurred during login.";

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
      }
    },
    async fetchLineData() {
      try {
        //const response = await getData.getLineChart(); // Replace with your backend endpoint
        const response = await fetch("/dummy.json");
        console.log("res", response);
        const data = await response.json();
        console.log("data", data);
        this.lineChartData = data;
        localStorage.setItem(
          "lineChartData",
          JSON.stringify(this.lineChartData)
        );
      } catch (e) {
        let errorMessage = "An error occurred during login.";

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
      } catch (e) {
        let errorMessage = "An error occurred during login.";

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
      }
    },
  },
});
