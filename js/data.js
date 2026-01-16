// js/data.js

const batteryData = [
    {
        id: "al-ns40",
        model: "AL-NS40",
        plates: 9,
        ah: 32,
        tech: "Graphite Enhanced",
        image: "assets/batteries/ns40.png",
        categories: ["Automotive"], // Fixed filters
        uses: "Small Hatchbacks, Generators",
        tags: ["Compact", "Fast Charge"]
    },
    {
        id: "al-tx1000",
        model: "AL-TX1000",
        plates: 15,
        ah: 80,
        tech: "Graphite Enhanced",
        image: "assets/batteries/tx1000.png",
        categories: ["Automotive", "Solar"], 
        uses: "Heavy Duty SUV, Home UPS, Solar Inverters",
        tags: ["Dual Purpose", "Deep Endurance"]
    }
    // Add all 23 here...
];

// Helper function to get products by series
const getProductsBySeries = (seriesName) => {
    return batteryData.filter(item => item.series === seriesName);
};