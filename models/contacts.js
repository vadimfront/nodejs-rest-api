const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(`${__dirname}/contacts.json`);

// const withErrorHandling = async (fn) => {
//   try {
//     return await fn();
//   } catch (error) {
//     throw new Error(`Error ${error.message}`);
//   }
// };

async function writeContactsFile(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.filter(({ id }) => id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await writeContactsFile(contacts);
  return result;
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await writeContactsFile(contacts);
  return newContact;
};

const updateContact = async (contactId, updatedData) => {
  const contacts = await listContacts();
  const newContacts = contacts.map((contact) => {
    if (contact.id === contactId) {
      const updatedContact = { ...contact, ...updatedData };
      return updatedContact;
    }
    return contact;
  });
  await writeContactsFile(newContacts);
  return contacts;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
