const { modelContacts } = require("../../models");
const { HttpError } = require("../../utils");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await modelContacts.Contacts.findByIdAndUpdate(
    contactId,
    req.body,
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(400, "Not found");
  }
  res.json(result);
};

module.exports = updateContact;
