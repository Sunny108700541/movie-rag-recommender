const { runDemoApplication } = require("./DemoApplication.js");


(async () => {
    const controller = await runDemoApplication();

    console.log("\n--- Search: 'space survival adventure' ---");
    const searchResults = await controller.search("space survival adventure");
    searchResults.forEach(m => console.log(m.title, "->", m.match.toFixed(4)));

    console.log("\n--- Similar to: 'Inception' ---");
    const similar = await controller.similarMovies("Inception");
    similar.forEach(m => console.log(m.title, "->", m.match.toFixed(4)));
})();