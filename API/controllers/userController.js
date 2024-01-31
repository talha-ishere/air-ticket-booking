const User = require("../models/userModel");

// exports.createUser = async (req, res, next) => {
//   try {
//     const doc = await User.create(req.body);
//     console.log(doc);
//     res.status(200).json({
//       status: true,
//       task: doc,
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "success",
//       message: err.message,
//     });
//   }
// };
