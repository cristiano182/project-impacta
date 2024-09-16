const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      primary: true,
      generated: "uuid",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    data: {
      type: Date,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model("Event", EventSchema);
