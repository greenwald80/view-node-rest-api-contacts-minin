const express = require("express");
const path = require("path");
const cors = require("cors");
const { v4 } = require("uuid");
const app = express();

app.use(cors());
//for requests
app.use(express.json());

let CONTACTS = [{ id: v4(), name: "Alex", value: "054", marked: false }];

//GET
app.get("/api/contacts", (req, res) => {
  setTimeout(() => {
    res.status(200).json(CONTACTS);
  }, 1000);
});

//POST
app.post("/api/contacts", (req, res) => {
  //no validation for body
  const contact = { ...req.body, id: v4(), marked: false };
  CONTACTS.push(contact);
  res.status(201).json(contact);
  //201 = created
});

//DELETE
app.delete("/api/contacts/:id", (req, res) => {
  const id = req.params.id;
  console.log("ID: ", id);
  CONTACTS = CONTACTS.filter((c) => c.id !== id);
  res.status(200).json({ message: `Contact was deleted with id: ${id}` });
});

//PUT
app.put("/api/contacts/:id", (req, res) => {
  const idx = CONTACTS.findIndex((c) => c.id === req.params.id);
  CONTACTS[idx] = req.body;
  res.status(200).json(CONTACTS[idx]);
});

app.use(express.static(path.resolve(__dirname, "client")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
