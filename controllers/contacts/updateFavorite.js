const { modelContacts } = require("../../models");
const { HttpError } = require("../../utils");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    throw HttpError(400, "Missing field favorite");
  }

  const result = await modelContacts.Contacts.findByIdAndUpdate(
    contactId,
    req.body,
    {
      new: true,
    }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateFavorite;
