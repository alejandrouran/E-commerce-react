const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");


const app = express();

app.use(cors({ origin: "http://localhost: 3000"}));
app.use(express.json())

app.listen(3001, ()=>console.log("Server listening port", 3001));