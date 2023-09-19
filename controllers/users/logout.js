const modelUser = require("../../models/user");

const logout = async (req, res) => {
  const { _id } = req.user;
  await modelUser.User.findByIdAndUpdate(_id, { token: null });

  res.status(204).json({ status: "No Content" });
};

module.exports = logout;
