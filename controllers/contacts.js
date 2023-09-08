const { modelContacts } = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../utils");

const { Contacts } = modelContacts;

const getContacts = async (req, res) => {
  const result = await Contacts.find({}, "-createdAt -updatedAt");
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const getContactsById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contacts.findById(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addNewContact = async (req, res) => {
  const result = await Contacts.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contacts.findOneAndDelete({ _id: contactId });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Deleted successfully!",
  });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contacts.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(400, "Not found");
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    throw HttpError(400, "Missing field favorite");
  }

  const result = await Contacts.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

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

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getContactsById: ctrlWrapper(getContactsById),
  addNewContact: ctrlWrapper(addNewContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
