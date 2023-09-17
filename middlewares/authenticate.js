require("dotenv").config();

const { modelUser } = require("../models");
const { HttpError } = require("../utils");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw HttpError(401, "Not authorized");
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await modelUser.User.findById(id);

    if (!user) {
      throw HttpError(401);
    }
    req.user = user;

    next();
  } catch {
    throw HttpError(401, "Not authorized");
  }
};

module.exports = authenticate;
