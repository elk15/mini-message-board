const Message = require("../models/message");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
require('dotenv').config();

exports.get_index = asyncHandler(async (req, res, next) => {
    const allMessages = await Message.find().sort({createdAt: 1}).exec();
    res.render("index", { title: "Message Board", messages: allMessages});
})

exports.get_new = asyncHandler(async (req, res, next) => {
    const allMessages = await Message.find().sort({createdAt: 1}).exec();
    res.render("new", { title: "Message Board", messages: allMessages});
})

exports.post_new = [
    body("user")
        .trim()
        .isLength({min: 1})
        .withMessage("Username is required")
        .isLength({max: 20})
        .withMessage("Username can't be more than 20 chars")
        .escape()
        .customSanitizer(string => {
            const parts = string.split(" ");
            const bannedWords = process.env.BANNED_WORDS.split(" ");
            let result = "";
            for(let i = 0; i < parts.length; i++) {
                if (bannedWords.includes(parts[i].toLowerCase())) {
                    result += "***** "; 
                } else {
                    result += parts[i];
                    result += " ";
                }
            }
            return result;
        }),
    body("message")
        .trim()
        .isLength({min: 1})
        .withMessage("Message is required")
        .escape()
        .customSanitizer(string => {
            const parts = string.split(" ");
            const bannedWords = process.env.BANNED_WORDS.split(" ");
            let result = "";
            for(let i = 0; i < parts.length; i++) {
                if (bannedWords.includes(parts[i].toLowerCase())) {
                    result += "***** "; 
                } else {
                    result += parts[i];
                    result += " ";
                }
            }
            return result;
        }),
        asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const message = new Message({user: req.body.user, text: req.body.message});

        if (!errors.isEmpty()) {
            res.render("new", {
                title: "Message Board", 
                messages: allMessages,
                errors: errors.array(),
            });
        } else {
            await message.save();
            res.redirect('/');
        }
    })
]