const reviewModel = require('../models/reviewModel')


const addReview = async function (req, res) {

    let data = req.body

    let reviewData = await reviewModel.create(data)

    res.status(200).send({status: true,  message: 'Success', data: reviewData})
}

module.exports = { addReview }