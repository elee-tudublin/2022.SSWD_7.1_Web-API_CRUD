// Category service functions

// Import dependencies
// DataAccess
const productData = require('../dataAccess/categoryData');

// Function to get all categories
//
async function getCategories() {
    
    // call data access to get all categories
    const categories = await productData.getCategories();
  
    // return categories
    return categories;
  }
  
// Module exports
// expose these functions
module.exports = {
    getCategories
};


