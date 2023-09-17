const { modelContacts } = require("../../models");
const { HttpError } = require("../../utils");

const getFavorite = async (req, res) => {
  const { _id: owner } = req.user;
  const { favorite = true } = req.query;

  const result = await modelContacts.Contacts.find({ owner, favorite });

  if (result.length === 0) {
    throw HttpError(404);
  }

  console.log(`Find ${result.length} contacts in your list`);

  res.json(result);
};

module.exports = getFavorite;
