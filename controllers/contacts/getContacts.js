const { modelContacts } = require("../../models");

const getContacts = async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await modelContacts.Contacts.find(
    { owner },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "email");
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getContacts;
