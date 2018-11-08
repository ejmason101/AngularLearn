const express = require("express");

const News = require("../models/news");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

// ------------ POST ---- CREATE NEWS ARTICLE
router.post("", checkAuth, (req, res, next) => {
    console.log("POST @ /api/news");

    const newNews = new News({
        title: req.body.title,
        content: req.body.content,
        postedDate: req.body.postedDate
    });

    newNews.save().then(createdNews => {
        console.log("Saved News Article to DB: ");
        console.log(createdNews);
        res.status(200).json({
            message: 'News article added successfully!',
            newsId: createdNews._id
        });
    });

});

// ----------- GET ALL NEWS ARTICLES -------- GET
router.get("", (req,res, next) => {
    console.log('GET @ /api/news');

    News.find()
        .then(documents => {
            console.log(documents);
            res.status(200).json({
                message: 'All News Articles fetched successfully',
                news: documents
            });
        });
});



module.exports = router;