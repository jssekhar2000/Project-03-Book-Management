const reviewModel = require('../models/reviewModel')
const bookModel = require('../models/bookModel');
const userModel = require('../models/userModel')
const validator = require('../validators/validator')


const addReview = async function (req, res) {

    try {
        let bookID = req.params.bookId 

        if( !validator.isValidObjectId(bookID)){
            return res.status(400).send({ status: false, message: 'Please enter Valid Book-ID' });
        }

        let book = await bookModel.findOne({_id: bookID, isDeleted: false}).lean()
        if(!book ){
            return res.status(404).send({status: false, message: 'Book not Found'})
        }

        let data = req.body

        if(!validator.isValidRequestBody(data)) {
            return res.status(400).send({status: false , Message: 'Invalid request parameters. Please provide review details'})
            
        }

        let {review, rating, reviewedBy} = data

        if(review != undefined && !validator.isValid2(review.trim())) {
            return res.status(400).send({ status: false, message: 'Please enter valid review' });
        }

        if(!validator.isValid(rating)){
            return res.status(400).send({ status: false, message: 'Rating is Required' });
        }

        if((typeof rating != Number) || (rating > 5 || rating < 1)) {
            return res.status(400).send({ status: false, message: 'Please Enter valid Rating' }); 
        }

        if(!validator.isValid(reviewedBy)){
            data.reviewedBy = 'Guest'
        }

        if(reviewedBy != undefined &&  ! validator.isValid2(reviewedBy.trim())){
            return res.status(400).send({ status: false, message: 'Please Enter valid Reviewer Name' }); 
       
        }

        data.reviewedAt = new Date().toISOString()

        let condition = {_id: bookID, isDeleted: false}
        let updateBookreview = await bookModel.updateOne( condition , { $inc: {review: 1}}, {new: true})

        let reviewData = await reviewModel.create(data)

        res.status(200).send({status: true,  message: 'Success', data: reviewData})


    } catch (err) {
        res.status(500).send({status:false , msg: err.message});   
    }
  
}

module.exports = { addReview }