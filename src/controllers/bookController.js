const bookModel = require('../models/bookModel');
const userModel = require('../models/userModel')
const validator = require('../validators/validator')
const mongoose = require('mongoose')



const createBook = async function (req, res) {
    try {
        
        let data = req.body

        if(!validator.isValidRequestBody(data)) {
            return res.status(400).send({status: false , Message: 'Invalid request parameters. Please provide Book details'})
            
        }

        let {title, excerpt, userId, ISBN, category, subcategory, reviews, isDeleted, releasedAt} = data

        if (! validator.isValid(userId)) {
            return res.status(400).send({ status: false, message: 'userId is Required' });
        }

        userId = userId.trim()
        if (! validator.isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: 'Please enter valid user ID' });
        }

        // Authorization
        const decodedToken = req.decodedToken
        if(userId != decodedToken.userId){
            return res.status(401).send({status: false , message: "User is Different, unauthorized"})
        }

        if (! validator.isValid(title)) {
            return res.status(400).send({ status: false, message: 'Title is Required' });
        }

        if (! validator.isValid2(title)) {
            return res.status(400).send({ status: false, message: 'Please Enter Valid title' });
        }

        const duplicateTitle = await bookModel.findOne({ title: title })
        if (duplicateTitle) {
            return res.status(400).send({ status: false, message: "Title is Already presents" })
        }

        if (! validator.isValid(excerpt)) {
            return res.status(400).send({ status: false, message: 'Excerpt is Required' });
        }

        if (! validator.isValid2(excerpt)) {
            return res.status(400).send({ status: false, message: 'Please enter valid excerpt' });
        }


        // Check existing of UserId
        const isExistUserId = await userModel.findOne({ userId: userId });
        if (! isExistUserId) {
            return res.status(400).send({ status: true, message: "User ID is Not exists in our Database" })
        }

        if (! validator.isValid(ISBN)) {
            return res.status(400).send({ status: false, message: 'ISBN is Required' });
        }

        
        if (! validator.isValidISBN(ISBN)){
            return res.status(400).send({ status: false, message: 'Please Enter a Valid ISBN' });
        }

         // Check duplicate ISBN
         const duplicateISBN = await bookModel.findOne({ ISBN: ISBN });
         if (duplicateISBN) {
             return res.status(400).send({ status: true, message: "ISBN is already exist" })
         }

         if (! validator.isValid(category)) {
            return res.status(400).send({ status: false, message: 'category is Required' });
        }

        if ( !validator.isValid2(category)) {
            return res.status(400).send({ status: false, message: 'Please Enter a Valid Category' });
        }

        if (! validator.isValid(subcategory)) {
            return res.status(400).send({ status: false, message: 'subcategory is Required' });
        }

        if (! validator.check(subcategory)) {
            return res.status(400).send({ status: false, message: 'Enter Valid Subcategory' });
        }

        if (! validator.isValid(releasedAt)) {
            return res.status(400).send({ status: false, message: 'Please Enter Released Date' });
        }

        
        if (! validator.releaseFormat(releasedAt)) {
            return res.status(400).send({ status: false, message: "Released Date Format Should be in 'YYYY-MM-DD' Format " });
        }

        if (reviews && (typeof reviews !== 'number')) {
            return res.status(400).send({ status: false, message: "Reviews Must be numbers" })
        }

        if(isDeleted === true){
            return res.status(400).send({ status: false, message: "No Data Should Be Deleted At The Time Of Creation" })
        }

        const bookDetails = await bookModel.create(data)
        return res.status(201).send({ status: true, message: 'successfully created ', data: { bookDetails } })


    } 
    catch (err) {
        res.status(500).send({status:false , msg: err.message});
    }

}

module.exports = {createBook }