const { modelContacts } = require("../../models");
const { HttpError } = require("../../utils");

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await modelContacts.Contacts.findOneAndDelete({
    _id: contactId,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Deleted successfully!",
  });
};

module.exports = deleteContact;
