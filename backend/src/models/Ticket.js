const mongoose = require("mongoose");
const { PRIORITY_OPTIONS, STATUS_OPTIONS } = require("../utils/constants");

const ticketSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 120,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 2000,
    },
    priority: {
      type: String,
      required: true,
      enum: PRIORITY_OPTIONS,
    },
    status: {
      type: String,
      enum: STATUS_OPTIONS,
      default: "NEW",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);

