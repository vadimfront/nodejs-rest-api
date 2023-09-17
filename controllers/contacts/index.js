const { ctrlWrapper } = require("../../utils");
const addNewContact = require("./addNewContact");
const deleteContact = require("./deleteContact");
const getContacts = require("./getContacts");
const getContactsById = require("./getContactsById");
const getFavorite = require("./getFavorite");
const updateContact = require("./updateContact");
const updateFavorite = require("./updateFavorite");

const ctrlContacts = {
  getContacts: ctrlWrapper(getContacts),
  getContactsById: ctrlWrapper(getContactsById),
  addNewContact: ctrlWrapper(addNewContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
  getFavorite: ctrlWrapper(getFavorite),
};

module.exports = ctrlContacts;
