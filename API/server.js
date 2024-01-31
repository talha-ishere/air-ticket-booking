require("dotenv").config();
const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");

const server = () =>
  app.listen(process.env.SERVER_PORT, process.env.SERVER_URL, () => {
    console.log(`Server is Runing ${process.env.SERVER_URL} on Port ${process.env.SERVER_PORT} `);
  });

const start = async () => {
  await connectDB();
  server();
};

start();
