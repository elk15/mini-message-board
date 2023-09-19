const express = require('express');
const router = express.Router();
const message_controller = require("../controllers/messageController");

/* GET home page. */
router.get('/', message_controller.get_index);

// Get new message form
router.get('/new', message_controller.get_new);

router.post('/new', message_controller.post_new);

module.exports = router;
