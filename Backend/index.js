require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { UserModel } = require("./model/UserModel");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();
app.use(cors({ origin: function(origin, callback) { callback(null, origin || true); }, methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.post("/newOrder", async (req, res) => {
  let newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });

  newOrder.save();
  res.send("Order saved!");
});

app.get("/addHoldings", async (req, res) => {
  let tempHoldings = [
    {
      name: "RELIANCE",
      qty: 12,
      avg: 1286.2,
      price: 1389.4,
      net: "+8.02%",
      day: "+₹1,238.40",
    },
    {
      name: "TCS",
      qty: 8,
      avg: 2780.5,
      price: 3042.2,
      net: "+9.41%",
      day: "+₹2,093.60",
    },
    {
      name: "INFY",
      qty: 15,
      avg: 1326.1,
      price: 1518.7,
      net: "+14.52%",
      day: "+₹2,889.00",
    },
    {
      name: "HDFCBANK",
      qty: 20,
      avg: 918.3,
      price: 967.45,
      net: "+5.35%",
      day: "+₹983.00",
    },
    {
      name: "ITC",
      qty: 30,
      avg: 382.1,
      price: 405.65,
      net: "+6.16%",
      day: "+₹706.50",
    },
  ];

  tempHoldings.forEach((item) => {
    let newHolding = new HoldingsModel({
      name: item.name,
      qty: item.qty,
      avg: item.avg,
      price: item.price,
      net: item.net,
      day: item.day,
    });
    newHolding.save();
  });
  res.send("Holdings added to Database!");
});

app.get("/addPositions", async (req, res) => {
  let tempPositions = [
    {
      product: "CNC",
      name: "NIFTY 50",
      qty: 50,
      avg: 25012.0,
      price: 25168.65,
      net: "+₹7,832.50",
      day: "+0.62%",
      isLoss: false,
    },
    {
      product: "CNC",
      name: "RELIANCE",
      qty: 10,
      avg: 1372.4,
      price: 1389.4,
      net: "+₹170.00",
      day: "+1.23%",
      isLoss: false,
    },
    {
      product: "CNC",
      name: "SBIN",
      qty: 15,
      avg: 808.2,
      price: 801.1,
      net: "-₹106.50",
      day: "-0.87%",
      isLoss: true,
    },
  ];

  tempPositions.forEach((item) => {
    let newPosition = new PositionsModel({
      product: item.product,
      name: item.name,
      qty: item.qty,
      avg: item.avg,
      price: item.price,
      net: item.net,
      day: item.day,
      isLoss: item.isLoss,
    });
    newPosition.save();
  });
  res.send("Positions added to Database!");
});
app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.get("/allOrders", async (req, res) => {
  let allOrders = await OrdersModel.find({});
  res.json(allOrders);
});

app.post("/signup", async (req, res) => {
  try {
    const { email, password, username, mobile } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists", success: false });
    }
    const user = await UserModel.create({ email, password, username, mobile });
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY || "SecretKey", {
      expiresIn: 3 * 24 * 60 * 60,
    });
    res.cookie("token", token, { withCredentials: true, httpOnly: false, sameSite: "none", secure: true });
    res.status(201).json({ message: "User signed in successfully", success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || error.toString(), success: false });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required", success: false });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email", success: false });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY || "SecretKey", {
      expiresIn: 3 * 24 * 60 * 60,
    });
    res.cookie("token", token, { withCredentials: true, httpOnly: false, sameSite: "none", secure: true });
    res.status(201).json({ message: "User logged in successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || error.toString(), success: false });
  }
});

app.get("/profile", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json({ status: false });
    
    jwt.verify(token, process.env.TOKEN_KEY || "SecretKey", async (err, decoded) => {
      if (err) return res.json({ status: false });
      const user = await UserModel.findById(decoded.id);
      if (user) return res.json({ status: true, user: user.username });
      else return res.json({ status: false });
    });
  } catch (error) {
    res.json({ status: false });
  }
});

app.listen(PORT, () => {
  console.log("App started!");
  mongoose.connect(uri);
  console.log("DB connected!");
});


