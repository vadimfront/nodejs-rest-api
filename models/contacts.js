const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contacts = model("contact", movieSchema);

const modelContacts = { Contacts };

module.exports = {
  modelContacts,
};
