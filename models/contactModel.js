const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please provide a user ID for this contact."],
      ref:"User",
    },
    name: {
      type: String,
      required: [true, "Please provide a name for this contact."],
    },
    email: {
      type: String,
      required: [true, "Please provide an email address for this contact."],
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number for this contact."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
