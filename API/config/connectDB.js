const mongoose = require("mongoose");
const DB = process.env.DB_NAME;

module.exports = async () => {
  try {
    const conn = await mongoose.connect(DB, {});
    console.log("DataBase is Connected");
  } catch (err) {
    console.log("Error While Connceting to DB", err);
    process.exit(1);
  }
};
