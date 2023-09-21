const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { modelUser } = require("../../models");
const avatarsPath = path.resolve("public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id: owner } = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarsPath, filename);
  fs.rename(oldPath, newPath);

  Jimp.read(newPath)
    .then((avatar) => {
      return avatar.resize(250, 250).quality(60).write(newPath);
    })
    .catch((error) => {
      console.error(error);
    });

  const avatarURL = path.join("avatars", filename);

  await modelUser.User.findByIdAndUpdate(owner, { avatarURL });

  res.status(200).json({
    avatarURL,
  });
};

module.exports = updateAvatar;
