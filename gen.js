const fs = require("fs");

function generateDummyData() {
  const products = ["Lenovo Server", "Dell Laptop", "HP Printer"];
  const statuses = ["scanned", "completed", "not scanned"];
  const country = "Ghana";
  const regions = ["Accra", "Kumasi", "Cape Coast", "Takoradi"];
  const cities = [
    ["Teshie", "Nungua", "Tema", "Labadi", "Kaneshie", "Madina"],
    ["Adum", "Kejetia", "Tafo", "Mampong", "Suame", "Tech"],
    ["Oguaa", "Castle Road", "UCC"],
    ["Market circle", "Esikado", "Pampaso"],
  ];
  const towns = [
    ["comm 20", "Laskala", "Agblezaa", "Spintex", "seaside"],
    ["Maakro", "stadium", "kentinkrono", "Eyigya"],
    ["Paado", "NTC", "Adisco", "Gey Hey"],
    ["Patapaa", "Kinaata", "Eben", "Estate"],
  ];
  const localities = [
    ["Police city", "Atadeka", "Ashaiman", "Santo"],
    ["Asada", "roundabout", "kads"],
    ["Gangs", "streets", "highway", "blackmain"],
    ["radio", "light", "bright", "PC", "Junk", "tired"],
  ];
  const batchNumber = "BATCH12345";
  const data = [];

  for (let i = 0; i < 10000; i++) {
    const start = new Date(2020, 0, 1).getTime();
    const end = new Date(2024, 11, 31).getTime();
    const timestamp = new Date(
      start + Math.random() * (end - start)
    ).toISOString();
    const productName = products[Math.floor(Math.random() * products.length)];
    const serialNumber = Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase();
    const scanned = statuses[Math.floor(Math.random() * statuses.length)];

    // Select a random region and its corresponding city, town, and locality
    const regionIndex = Math.floor(Math.random() * regions.length);
    const region = regions[regionIndex];
    const city =
      cities[regionIndex][
        Math.floor(Math.random() * cities[regionIndex].length)
      ];
    const town =
      towns[regionIndex][Math.floor(Math.random() * towns[regionIndex].length)];
    const locality =
      localities[regionIndex][
        Math.floor(Math.random() * localities[regionIndex].length)
      ];

    data.push({
      timestamp,
      batchNumber,
      productName,
      serialNumber,
      country,
      region,
      city,
      town,
      locality,
      scanned,
    });
  }

  return data;
}

const dummyData = generateDummyData();

const ddata = JSON.stringify(dummyData, null, 2);

fs.writeFile("dummy.json", ddata, (err) => {
  if (err) throw err;
  console.log("Dummy data generated and saved to dummy.json");
});

// 1. Name of product
// 2. total scan per month (prevailing month)
// 3. total scan per day (prevailing day (24 hours))
// 4. total scan per year (prevailing year)
// 5. average scan per day
// 6. average scan per month
// 7. average scan per year
// 8. I would want to do the same for completed scan
// 9. the distinct location with the highest scan
// 10. the distinct location for the highest completed scan
// 11. the distinct location with the median scan
// 12. the distinct location for the median completed scan
// 13. the distinct location with the lowest scan
// 14. the distinct location for the lowest completed scan
// 15. the average scan per the highest distinct location
// 16. the average completed scan per the highest distinct location
// 17. the average scan per the median distinct location
// 18. the average completed scan per the median distinct location
// 19. the average scan per the lowest distinct location
// 20. the average completed scan per the lowest distinct location
// 21. the month with the lowest scan
// 22. the month with the lowest completed scan
// 23. the month with the highest scan
// 24. the month with the highest completed scan
// 25. the month with the median scan
// 26. the month with the media completed scan
// 27. the year with the lowest scan
// 28. the year with the lowest completed scan
// 29. the year with the highest scan
// 30. the year with the highest completed scan
// 31. the year with the median scan
// 32. the year with the media completed scan
