
const fs = require("fs");
let code = fs.readFileSync("./src/landing_page/signup/Signup.js", "utf-8");
code = code.replace(/fetch\("http:\/\/localhost:3002\/signup"/g, `fetch((process.env.REACT_APP_BACKEND_URL || "http://localhost:3002") + "/signup"`);
code = code.replace(/window\.location\.href = "http:\/\/localhost:3001";/g, `window.location.href = process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";`);
fs.writeFileSync("./src/landing_page/signup/Signup.js", code);

