const { modelContacts } = require("../../models");

const addNewContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await modelContacts.Contacts.create({ ...req.body, owner });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addNewContact;
