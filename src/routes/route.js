const express = require("express");
const router = express.Router();
const userController= require('../controllers/userController')
const bookController = require('../controllers/bookController')
const mw = require('../middleware/auth')



router.post("/register", userController.createUser)
router.post("/login", userController.loginUser)

router.post("/books", mw.authentication , bookController.createBook)


module.exports = router;