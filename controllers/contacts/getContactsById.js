const { modelContacts } = require("../../models");
const { HttpError } = require("../../utils");

const getContactsById = async (req, res) => {
  const { contactId } = req.params;
  const result = await modelContacts.Contacts.findById(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = getContactsById;
