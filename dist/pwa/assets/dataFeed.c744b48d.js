import{d as O}from"./index.e45af843.js";import{$axios as Y}from"./axios.f68c117c.js";const v={getReceipts:t=>Y.get("payment/invoice/",t),getTrends:t=>Y.get("payment/trends/",t),getCustomers:t=>Y.get("payment/customers/",t),getReport(){Y.get("/api/report",{responseType:"blob"})},getCustomerReport(){Y.get("/api/report",{responseType:"blob"})},getLineChart:t=>Y.get("chart-data/line-scan/",t),getCompletedChart:t=>Y.get("chart-data/line-completed/",t),getBarScanChart:t=>Y.get("chart-data/bar-scan/",t),getBarCompleteChart:t=>Y.get("chart-data/bar-completed/",t)},L=O("transaction",{state:()=>({BarScanChartData:JSON.parse(localStorage.getItem("lineChartData"))||[],BarCompleteChartData:JSON.parse(localStorage.getItem("lineChartData"))||[],lineChartData:JSON.parse(localStorage.getItem("lineChartData"))||[],lineChartrange:{year:new Date().getFullYear(),month:new Date().getMonth(),day:null},loyalCust:[],trendProducts:[],transactions:JSON.parse(localStorage.getItem("transactionData"))||[],currentPageTrendz:1,pageSizeTrendz:5,currentPage:1,pageSize:5,currentPageCust:1,pageSizeCust:5}),getters:{getCompanyStatistics(t){if(!t.lineChartData.length)return console.log("greeee"),{totalCompleted:0,bestMonth:{monthYear:"",count:0},ema:[]};const c=Intl.DateTimeFormat().resolvedOptions().timeZone;let n={},s=0,r={},l={};const h=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];t.lineChartData.forEach(a=>{const g=new Date(a.timestamp).getFullYear();r[g]||(r[g]=0,l[g]=0),a.scanned==="completed"&&r[g]++,l[g]++}),t.lineChartData.forEach(a=>{if(a.scanned==="completed"){const o=new Date(a.timestamp),g=new Intl.DateTimeFormat("en-US",{timeZone:c,month:"numeric",year:"numeric"}).format(o),[D,P]=g.split("/"),C=`${h[D]}-${P}`;n[C]||(n[C]=0),n[C]++,s++}});let y=Object.keys(r).map(a=>({year:a,percentage:(r[a]/l[a]*100).toFixed(2)})).reduce((a,o)=>o.percentage>a.percentage?o:a,{year:"",percentage:0}),d=Object.entries(n).map(([a,o])=>({monthYear:a,count:o}));d.sort((a,o)=>new Date(`01-${a.monthYear}`)-new Date(`01-${o.monthYear}`));let e=d.reduce((a,o)=>o.count>a.count?o:a,{monthYear:"",count:0});return{totalCompleted:s,bestMonth:e,bestYear:y}},totalScanCompleteForMonthAndYTD(t){const c=t.lineChartrange.month,n=t.lineChartrange.year,s=Intl.DateTimeFormat().resolvedOptions().timeZone,l=t.lineChartData.filter(e=>{const a=new Date(e.timestamp),o=new Intl.DateTimeFormat("en-US",{timeZone:s,month:"numeric",year:"numeric"}).format(a),[g,D]=o.split("/");return parseInt(g)-1===c&&parseInt(D)===n&&e.scanned==="completed"}).length,p=t.lineChartData.filter(e=>{const a=new Date(e.timestamp),o=new Intl.DateTimeFormat("en-US",{timeZone:s,year:"numeric"}).format(a);return parseInt(o)===n&&e.scanned==="completed"}).length,y=c+1,d=(p/y).toFixed(2);return{totalForMonth:l,averageForYTD:d}},totalScanForMonthAndYTD(t){const c=t.lineChartrange.month,n=t.lineChartrange.year,s=Intl.DateTimeFormat().resolvedOptions().timeZone,l=t.lineChartData.filter(e=>{const a=new Date(e.timestamp),o=new Intl.DateTimeFormat("en-US",{timeZone:s,month:"numeric",year:"numeric"}).format(a),[g,D]=o.split("/");return parseInt(g)-1===c&&parseInt(D)===n&&e.scanned==="scanned"}).length,p=t.lineChartData.filter(e=>{const a=new Date(e.timestamp),o=new Intl.DateTimeFormat("en-US",{timeZone:s,year:"numeric"}).format(a);return parseInt(o)===n&&e.scanned==="scanned"}).length,y=c+1,d=(p/y).toFixed(2);return{totalForMonth:l,averageForYTD:d}},topLocation(t){var C;const c=Intl.DateTimeFormat().resolvedOptions().timeZone,n=t.lineChartData.reduce((i,u)=>{const m=`${u.region}, ${u.city}, ${u.town}`;i[m]||(i[m]={completed:0,scanned:0,dates:[],products:{},daily:{},monthly:{},yearly:{}});const M=new Date(u.timestamp),F=new Intl.DateTimeFormat("en-US",{timeZone:c,year:"numeric",month:"numeric",day:"numeric"}).format(M),[I,S,f]=F.split("/"),w=`${I}-${S}`,T=I;return i[m].products[u.productName]||(i[m].products[u.productName]={completed:0,scanned:0}),u.scanned==="completed"&&(i[m].completed++,i[m].products[u.productName].completed++,i[m].daily[F]||(i[m].daily[F]={completed:0,scanned:0}),i[m].monthly[w]||(i[m].monthly[w]={completed:0,scanned:0}),i[m].yearly[T]||(i[m].yearly[T]={completed:0,scanned:0}),i[m].daily[F].completed++,i[m].monthly[w].completed++,i[m].yearly[T].completed++),u.scanned==="scanned"&&(i[m].scanned++,i[m].products[u.productName].scanned++,i[m].daily[F]||(i[m].daily[F]={completed:0,scanned:0}),i[m].monthly[w]||(i[m].monthly[w]={completed:0,scanned:0}),i[m].yearly[T]||(i[m].yearly[T]={completed:0,scanned:0}),i[m].daily[F].scanned++,i[m].monthly[w].scanned++,i[m].yearly[T].scanned++),i[m].dates.push(M),i},{}),s=Object.keys(n).reduce((i,u)=>{var m,M;return((m=n[i])==null?void 0:m.completed)>((M=n[u])==null?void 0:M.completed)?i:u},""),r=n[s].completed,l=n[s].scanned,h=(r/(l+r)).toFixed(2),p=n[s].dates,y=(Math.max(...p)-Math.min(...p))/(1e3*60*60*24)||1,d=(l/y).toFixed(2),e=(d*30).toFixed(2),a=(d*365).toFixed(2),o=Object.entries((C=n[s])==null?void 0:C.daily).map(([i,u])=>({date:i,completed:u.completed,scanned:u.scanned})),g=Object.entries(n[s].monthly).map(([i,u])=>({month:i,completed:u.completed,scanned:u.scanned})),D=Object.entries(n[s].yearly).map(([i,u])=>({year:i,completed:u.completed,scanned:u.scanned})),P=Object.keys(n[s].products).reduce((i,u)=>{var m,M;return((m=n[s].products[i])==null?void 0:m.completed)>((M=n[s].products[u])==null?void 0:M.completed)?i:u},"");return{location:s,completed:r,scanned:l,conversionRate:h,averagePerDay:d,averagePerMonth:e,averagePerYear:a,dailyStats:o,monthlyStats:g,yearlyStats:D,reigningProduct:P}},leastAndMedianLocations(t){const c=Intl.DateTimeFormat().resolvedOptions().timeZone,n=t.lineChartData.reduce((e,a)=>{const o=`${a.region}, ${a.city}, ${a.town}`;e[o]||(e[o]={completed:0,scanned:0,dates:[],products:{},daily:{},monthly:{},yearly:{}});const g=new Date(a.timestamp),D=new Intl.DateTimeFormat("en-US",{timeZone:c,year:"numeric",month:"numeric",day:"numeric"}).format(g),[P,C,i]=D.split("/"),u=`${P}-${C}`,m=P;return e[o].products[a.productName]||(e[o].products[a.productName]={completed:0,scanned:0}),a.scanned==="completed"&&(e[o].completed++,e[o].products[a.productName].completed++,e[o].daily[D]||(e[o].daily[D]={completed:0,scanned:0}),e[o].monthly[u]||(e[o].monthly[u]={completed:0,scanned:0}),e[o].yearly[m]||(e[o].yearly[m]={completed:0,scanned:0}),e[o].daily[D].completed++,e[o].monthly[u].completed++,e[o].yearly[m].completed++),a.scanned==="scanned"&&(e[o].scanned++,e[o].products[a.productName].scanned++,e[o].daily[D]||(e[o].daily[D]={completed:0,scanned:0}),e[o].monthly[u]||(e[o].monthly[u]={completed:0,scanned:0}),e[o].yearly[m]||(e[o].yearly[m]={completed:0,scanned:0}),e[o].daily[D].scanned++,e[o].monthly[u].scanned++,e[o].yearly[m].scanned++),e[o].dates.push(g),e},{}),s=Object.keys(n).sort((e,a)=>{var o,g;return((o=n[e])==null?void 0:o.completed)-((g=n[a])==null?void 0:g.completed)}),r=Math.floor(s.length/2),l=s[r],h=s[0],p=n[l],y=n[h],d=e=>{const a=e.completed,o=e.scanned,g=(a/(o+a)).toFixed(2),D=e.dates,P=(Math.max(...D)-Math.min(...D))/(1e3*60*60*24)||1,C=(o/P).toFixed(2),i=(C*30).toFixed(2),u=(C*365).toFixed(2),m=Object.entries(e.daily).map(([S,f])=>({date:S,completed:f.completed,scanned:f.scanned})),M=Object.entries(e.monthly).map(([S,f])=>({month:S,completed:f.completed,scanned:f.scanned})),F=Object.entries(e.yearly).map(([S,f])=>({year:S,completed:f.completed,scanned:f.scanned})),I=Object.keys(e.products).reduce((S,f)=>{var w,T;return((w=e.products[S])==null?void 0:w.completed)>((T=e.products[f])==null?void 0:T.completed)?S:f},"");return{completed:a,scanned:o,conversionRate:g,averagePerDay:C,averagePerMonth:i,averagePerYear:u,dailyStats:m,monthlyStats:M,yearlyStats:F,reigningProduct:I}};return{leastLocation:{location:h,...d(y)},medianLocation:{location:l,...d(p)}}},filterData(t){return c=>t.lineChartData.filter(c)},checkoutMetrics(t,c){return n=>{const s=new Date,r=new Date(s);r.setDate(s.getDate()-1);const l=new Date(s);l.setMonth(s.getMonth()-1);const h=new Date(s);h.setFullYear(s.getFullYear()-1);const p=this.calculateMetricsForPeriod(s,"day",n),y=this.calculateMetricsForPeriod(r,"day",n),d=this.calculateMetricsForPeriod(s,"month",n),e=this.calculateMetricsForPeriod(l,"month",n),a=this.calculateMetricsForPeriod(s,"year",n),o=this.calculateMetricsForPeriod(h,"year",n);return{scanned:{currentDayMetrics:p.scannedCount,prevDayMetrics:y.scannedCount,currentMonthMetrics:d.scannedCount,prevMonthMetrics:e.scannedCount,currentYearMetrics:a.scannedCount,prevYearMetrics:o.scannedCount},completed:{currentDayMetrics:p.completedCount,prevDayMetrics:y.completedCount,currentMonthMetrics:d.completedCount,prevMonthMetrics:e.completedCount,currentYearMetrics:a.completedCount,prevYearMetrics:o.completedCount}}}},calculateMetricsForPeriod(t){return(c,n,s)=>{const r=new Date(c),l=new Date(c);n==="day"?l.setDate(r.getDate()+1):n==="month"?(r.setDate(1),l.setMonth(r.getMonth()+1)):n==="year"&&(r.setMonth(0,1),l.setFullYear(r.getFullYear()+1));const h=r.getTime(),p=l.getTime(),y=t.lineChartData.filter(a=>{const o=new Date(a.timestamp).getTime();return o>=h&&o<p&&a.productName===s}),d=y.filter(a=>a.scanned==="completed").length,e=y.filter(a=>a.scanned==="scanned").length;return{completedCount:d,scannedCount:e}}},conversionRate(t){return c=>{const n=t.lineChartData.filter(r=>r.productName===c&&r.scanned==="scanned"),s=t.lineChartData.filter(r=>r.productName===c&&r.scanned==="completed");return n.length>0?(s.length/n.length*100).toFixed(2):null}},highestCheckout(t){return c=>{const n=t.lineChartData.filter(d=>d.productName===c&&d.scanned==="completed"),s=this.aggregateMetrics(n,"day"),r=this.aggregateMetrics(n,"month"),l=this.aggregateMetrics(n,"year"),h=s.reduce((d,e)=>e.count>d.count?e:d,{count:0}),p=r.reduce((d,e)=>e.count>d.count?e:d,{count:0}),y=l.reduce((d,e)=>e.count>d.count?e:d,{count:0});return{highestDaily:{date:h.date,count:h.count},highestMonthly:{month:p.date,count:p.count},highestYearly:{year:y.date,count:y.count}}}},lowestCheckout(t){return c=>{const n=t.lineChartData.filter(d=>d.productName===c&&d.scanned==="completed"),s=this.aggregateMetrics(n,"day"),r=this.aggregateMetrics(n,"month"),l=this.aggregateMetrics(n,"year"),h=s.reduce((d,e)=>e.count<d.count?e:d,{count:1/0}),p=r.reduce((d,e)=>e.count<d.count?e:d,{count:1/0}),y=l.reduce((d,e)=>e.count<d.count?e:d,{count:1/0});return{lowestDaily:{date:h.date,count:h.count},lowestMonthly:{month:p.date,count:p.count},lowestYearly:{year:y.date,count:y.count}}}},aggregateMetrics(t){return(c,n)=>{const s={},r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return c.forEach(l=>{const h=new Date(l.timestamp);let p;n==="day"?p=h.toLocaleDateString():n==="month"?p=`${r[h.getMonth()]}-${h.getFullYear()}`:n==="year"&&(p=h.getFullYear().toString()),s[p]||(s[p]={date:p,count:0}),s[p].count++}),Object.values(s)}},highestCheckoutPerLocation(t){return c=>{const n=t.lineChartData.filter(l=>l.productName===c&&l.scanned==="completed"),r=this.aggregateMetricsByLocation(n).reduce((l,h)=>h.count>l.count?h:l,{count:0});return{location:r.location,count:r.count}}},lowestCheckoutPerLocation(t){return c=>{const n=t.lineChartData.filter(l=>l.productName===c&&l.scanned==="completed"),r=this.aggregateMetricsByLocation(n).reduce((l,h)=>h.count<l.count?h:l,{count:1/0});return{location:r.location,count:r.count}}},medianCheckoutPerLocation(t){return c=>{const n=t.lineChartData.filter(p=>p.productName===c&&p.scanned==="completed"),r=this.aggregateMetricsByLocation(n).sort((p,y)=>p.count-y.count),l=Math.floor(r.length/2),h=r.length%2===0?{location:`${r[l-1].location} & ${r[l].location}`,count:(r[l-1].count+r[l].count)/2}:r[l];return{location:h.location,count:h.count}}},aggregateMetricsByLocation(t){return c=>{const n={};return c.forEach(s=>{const r=`${s.region}, ${s.city}, ${s.town}, ${s.locality}`;n[r]||(n[r]={location:r,count:0}),n[r].count++}),Object.values(n)}},paginatedTrendz(t){const c=(t.currentPageTrendz-1)*t.pageSizeTrendz,n=c+t.pageSizeTrendz;return t.trendProducts.slice(c,n)},totalPageTrendzs:t=>Math.ceil(t.trendProducts.length/t.pageSizeTrendz),paginatedTransactions(t){const c=(t.currentPage-1)*t.pageSize,n=c+t.pageSize;return t.transactions.slice(c,n)},totalPages:t=>Math.ceil(t.transactions.length/t.pageSize),paginatedCustomers(t){const c=(t.currentPageCust-1)*t.pageSizeCust,n=c+t.pageSizeCust;return t.loyalCust.slice(c,n)},totalCustomers:t=>Math.ceil(t.loyalCust.length/t.pageSizeCust)},actions:{async fetchTransactions(){try{const t=await v.getReceipts();this.transactions=t.data.results.map(c=>({...c,download:`http://127.0.0.1:8000/payment/receipt/${c.transaction_id}/`})),localStorage.setItem("transactionData",JSON.stringify(this.transactions))}catch(t){console.error("Error fetching transaction data:",t)}},setCurrentPage(t){this.currentPage=t},setCurrentPageTrendz(t){this.currentPageTrendz=t},setCurrentPageCust(t){this.currentPageCust=t},setMonth(t){this.lineChartrange.month=t},setYear(t){this.lineChartrange.year=t},async fetchTrends(){try{const t=localStorage.getItem("trendProduct");if(t)this.trendProducts=JSON.parse(t);else{const c=await v.getTrends();this.trendProducts=c.data.results.map(n=>({...n})),localStorage.setItem("trendProduct",JSON.stringify(this.trendProducts))}}catch(t){console.error("Error fetching trend products data:",t)}},async fetchLoyalCust(){try{const t=localStorage.getItem("loyalCustomers");if(t)this.loyalCust=JSON.parse(t);else{const c=await v.getCustomers();this.loyalCust=c.data.results.map(n=>({...n})),localStorage.setItem("loyalCustomers",JSON.stringify(this.loyalCust))}}catch(t){console.error("Error fetching trend products data:",t)}},async fetchBarScanData(){try{const t=await v.getBarScanChart();this.BarScanChartData=t.data,localStorage.setItem("barScanData",JSON.stringify(this.BarScanChartData))}catch(t){console.error("Failed to fetch bar scan data:",t)}},async fetchBarCompleteData(){try{const t=await v.getBarCompleteChart();this.BarCompleteChartData=t.data,localStorage.setItem("barCompleteData",JSON.stringify(this.BarCompleteChartData))}catch(t){console.error("Failed to fetch bar complete data:",t)}},async fetchLineData(){try{const c=await(await fetch("../../src/stores/dummy.json")).json();this.lineChartData=c,localStorage.setItem("lineChartData",JSON.stringify(this.lineChartData))}catch(t){console.error("Failed to fetch line data:",t)}},async downloadReport(){try{return await v.getReport()}catch(t){throw console.error("Error downloading report:",t),t}},async downloadCustomerReport(){try{return await v.getCustomerReport()}catch(t){throw console.error("Error downloading report:",t),t}}}});export{L as u};
