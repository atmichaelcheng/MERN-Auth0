const express = require("express");
const {
  getAdminMessage,
  getProtectedMessage,
  getPublicMessage,
  getFakeProtectedMessage,
} = require("./messages.service");
const { validateAccessToken } = require("../middleware/auth0.middleware.js");

const messagesRouter = express.Router();

messagesRouter.get("/public", (req, res) => {
  const message = getPublicMessage();

  res.status(200).json(message);
});

messagesRouter.get("/protected", validateAccessToken, (req, res) => {
  const message = getProtectedMessage();

  res.status(200).json(message);
});

messagesRouter.get("/fakeProtected", (req, res) => {
  const message = getFakeProtectedMessage();

  res.status(200).json(message);
});

messagesRouter.get("/admin", validateAccessToken, (req, res) => {
  const message = getAdminMessage();

  res.status(200).json(message);
});

module.exports = { messagesRouter };
