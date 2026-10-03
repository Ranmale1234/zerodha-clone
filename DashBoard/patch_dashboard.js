
const fs = require("fs");
let code = fs.readFileSync("./src/App.js", "utf-8");
code = code.replace(/fetch\("http:\/\/localhost:3002\//g, `fetch((process.env.REACT_APP_BACKEND_URL || "http://localhost:3002") + "/`);
code = code.replace(/window\.location\.href = "http:\/\/localhost:3000\/signup"/g, `window.location.href = (process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000") + "/signup"`);
code = code.replace(/window\.location\.href = "http:\/\/localhost:3000"/g, `window.location.href = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000"`);
fs.writeFileSync("./src/App.js", code);

