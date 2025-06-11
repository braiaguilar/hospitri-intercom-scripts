import { create } from "axios";
require("dotenv").config();

const intercomClient = create({
  baseURL: "https://api.intercom.io",
  headers: {
    Authorization: `Bearer ${process.env.INTERCOM_ACCESS_TOKEN}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default intercomClient;
