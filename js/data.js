// js/data.js

const batteryData = [
    {
        id: "A-55",
        model: "A-55",
        plates: 7,
        ah: 32,
        p: 12,
        tech: "Graphite Lead-Acid Technology",
        image: "assets/batteries/a55.png",
        categories: ["Automotive"], // Fixed filters
        uses: "Small Hatchbacks, Generators",
        tags: ["Compact", "Fast Charge"]
    },
    {
        id: "Solar-50",
        model: "Solar-50",
        plates: 5,
        ah: 50,
        p: 12,
        tech: "Graphite Lead-Acid Technology",
        image: "assets/batteries/s50.png",
        categories: ["Solar"], 
        uses: "Home UPS, Solar Inverters",
        tags: ["Dual Purpose", "Deep Endurance"]
    }
    // Add all 23 here...
];

// Helper function to get products by series
const getProductsBySeries = (seriesName) => {
    return batteryData.filter(item => item.series === seriesName);
};