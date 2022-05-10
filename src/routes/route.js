const express = require("express");
const router = express.Router();
const userController= require('../controllers/userController')
const bookController = require('../controllers/bookController')
const reviewController = require('../controllers/reviewController')
const mw = require('../middleware/auth')



router.post("/register", userController.createUser)
router.post("/login", userController.loginUser)


router.post("/books", mw.authentication, bookController.createBook)
router.get("/books", mw.authentication, bookController.getBookDetails)
router.get("/books/:bookId", mw.authentication, bookController.getBookDetailsByID)
router.put("/books/:bookId", mw.authentication, bookController.updateBook)
router.delete("/books/:bookId", mw.authentication, bookController.deleteBook)


router.post("/books/:bookId/review", mw.authentication, reviewController.addReview )


module.exports = router;