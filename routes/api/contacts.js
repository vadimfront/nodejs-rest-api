const express = require("express");
const schemas = require("../../schemas/contacts");
const { validateBody, isValidId } = require("../../middlewares");

const ctrlContacts = require("../../controllers/contacts/index.js");

const authenticate = require("../../middlewares/authenticate");

const router = express.Router();

router.use(authenticate);

router.get("/", ctrlContacts.getContacts);

router.get("/favorite", authenticate, ctrlContacts.getFavorite);

router.get("/:contactId", isValidId, ctrlContacts.getContactsById);

router.post("/", validateBody(schemas.addSchema), ctrlContacts.addNewContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  ctrlContacts.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrlContacts.updateFavorite
);

router.delete("/:contactId", isValidId, ctrlContacts.deleteContact);

module.exports = router;
