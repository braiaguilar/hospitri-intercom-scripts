const axios = require("axios");
require("dotenv").config();

const intercomClient = axios.create({
  baseURL: process.env.INTERCOM_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.INTERCOM_ACCESS_TOKEN}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

module.exports = intercomClient;
