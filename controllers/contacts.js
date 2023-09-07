const contacts = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../utils");

const getContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

// const getContactsById = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contacts.getContactById(contactId);

//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

// const addNewContact = async (req, res) => {
//   const result = await contacts.addContact(req.body);
//   res.status(201).json(result);
// };

// const deleteContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contacts.removeContact(contactId);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json({
//     message: "Deleted successfully!",
//   });
// };

// const updateContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contacts.updateContact(contactId, req.body);
//   if (!result) {
//     throw HttpError(400, "Not found");
//   }
//   res.json(result);
// };

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  // getContactsById: ctrlWrapper(getContactsById),
  // addNewContact: ctrlWrapper(addNewContact),
  // deleteContact: ctrlWrapper(deleteContact),
  // updateContact: ctrlWrapper(updateContact),
};
