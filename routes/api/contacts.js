const express = require("express");
const ctrl = require("../../controllers/contacts");
const schemas = require("../../schemas/contacts");
const { validateBody } = require("../../middlewares");

const router = express.Router();

// router.get("/", ctrl.getContacts);

// router.get("/:contactId", ctrl.getContactsById);

// router.post("/", validateBody(schemas.addSchema), ctrl.addNewContact);

// router.put("/:contactId", validateBody(schemas.addSchema), ctrl.updateContact);

// router.delete("/:contactId", ctrl.deleteContact);

module.exports = router;
