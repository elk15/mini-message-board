const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    user: {type: String, required: true, maxLength: 20},
    text: {type: String, required: true},
    createdAt: {type: Date}
})

MessageSchema.virtual("date_formatted").get(function () {
    return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATETIME_MED)
})

module.exports = mongoose.model("Message", MessageSchema);