// This is the category controller

// Import router package
const router = require('express').Router();

// Import the category service
const categoryService = require("../services/categoryService.js");

// This endpoint will return all category data from the database
router.get('/', async(req, res) => {

    // Get result from the category service
    const result = await categoryService.getCategories()

    // Send a  response
    res.json(result);
});

// export
module.exports = router;
