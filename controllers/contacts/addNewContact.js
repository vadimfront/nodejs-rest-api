const { modelContacts } = require("../../models");

///const avatarsPath = path.resolve("public", "avatars");

const addNewContact = async (req, res) => {
  const { _id: owner } = req.user;
  // const { path: oldPath, filename } = req.file;
  // const newPath = path.join(avatarsPath, filename);
  // fs.rename(oldPath, newPath);
  // const avatar = path.join("avatars", filename);
  const result = await modelContacts.Contacts.create({
    ...req.body,
    owner,
  });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addNewContact;
