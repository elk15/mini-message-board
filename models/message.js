const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    user: {type: String, required: true, maxLength: 20},
    text: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
})

MessageSchema.virtual("createdAt_formatted").get(function () {
    return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATETIME_SHORT)
})

module.exports = mongoose.model("Message", MessageSchema);