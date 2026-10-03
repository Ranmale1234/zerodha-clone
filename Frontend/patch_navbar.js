
const fs = require("fs");
let code = fs.readFileSync("./src/landing_page/Navbar.js", "utf-8");
code = code.replace(/href="http:\/\/localhost:3001"/g, `href={process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001"}`);
fs.writeFileSync("./src/landing_page/Navbar.js", code);

