const express = require("express");
const dontenv = require("dotenv").config();


const {
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getSingleContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.use(validateToken)
router.route("/").get(getContact).post(createContact);

router
  .route("/:id")
  .get(getSingleContact)
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;
