const fs = require("fs").promises;
const path = require("path");
const { dirNamePath } = require("./db/index");
const contactsPath = path.join(`${dirNamePath}`, "contacts.json");
const { nanoid } = require("nanoid");

/**
 * Function return list of the Contacts
 */
const listContacts = async () => {
  const buffer = await fs.readFile(contactsPath);
  //   return JSON.parse(buffer)
  const arrContacts = JSON.parse(buffer);
  return arrContacts;
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const result = allContacts.find((item) => item.id === contactId);
  return result || null;
};

const addContact = async (data) => {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
