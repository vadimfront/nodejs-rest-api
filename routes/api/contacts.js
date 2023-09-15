const express = require("express");
const ctrl = require("../../controllers/contacts");
const schemas = require("../../schemas/contacts");
const { validateBody, isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", ctrl.getContacts);

router.get("/:contactId", isValidId, ctrl.getContactsById);

router.post("/", validateBody(schemas.addSchema), ctrl.addNewContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

router.delete("/:contactId", isValidId, ctrl.deleteContact);

module.exports = router;
