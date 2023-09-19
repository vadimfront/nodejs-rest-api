const { modelUser } = require("../../models");
const { HttpError } = require("../../utils");

const updSubscription = async (req, res) => {
  const { _id: owner, email, name } = req.user;
  const { subscription } = req.body;

  // const allowedSubscriptions = ["starter", "pro", "business"];

  if (subscription === undefined) {
    throw HttpError(400, "Missing field subscription");
  }
  // if (!allowedSubscriptions.includes(subscription)) {
  //   throw HttpError(400, "The subscription type is incorrect");
  // }
  await modelUser.User.findByIdAndUpdate(owner, { subscription });
  res.status(200).json({ email, name, subscription });
};

module.exports = updSubscription;
