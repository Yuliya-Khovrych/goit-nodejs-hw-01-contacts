const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");

const contactsPath = path.resolve("./db/contacts.json");
//console.log(contactsPath);

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parseContacts = JSON.parse(contacts);
    return parseContacts;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parseContacts = JSON.parse(contacts);
    const contactById = parseContacts.find(({ id }) => id === contactId);
    if (!contactById) {
      return `Contact with Id: ${contactId} not found!`;
    }
    return contactById;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parseContacts = JSON.parse(contacts);
    const contactDel = parseContacts.filter(({ id }) => id !== contactId);
    return contactDel;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parseContacts = JSON.parse(contacts);
    const newContact = parseContacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (newContact) {
      return "Such contact is already in contacts.";
    }
    const addContact = { id: randomUUID(), name, email, phone };
    const addContacts = [...parseContacts, addContact];
    await fs.writeFile(contactsPath, JSON.stringify(addContacts));
    return addContacts;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
