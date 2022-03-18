// Product service functions

// Import dependencies

// Validation
const validate = require("../validators/baseValidators");
const productValidator = require("../validators/productValidator.js");

// DataAccess
const productData = require("../dataAccess/productData");

// Function to get all products
//
async function getProducts() {
  // call data access to get all products
  const products = await productData.getProducts();

  // return products
  return products;
}

// Function to get product by id
//
async function getProductById(id) {
  // validate the id
  const validatedId = validate.validateId(id);

  if (validatedId) {
    // Call the data access function to get product with matching id
    const product = await productData.getProductById(validatedId);

    // return the product
    return product;
  } else {
    return "Invalid product id";
  }
}

// Function to get products in a specified category (by category id)
//
async function getProductsByCatId(id) {
  // validate the id
  const validatedId = validate.validateId(id);
  if (validatedId) {
    // Call the data access function to get product matching id
    const products = await productData.getProductsByCatId(validatedId);

    // return the products found
    return products;
  } else {
    return "Invalid product id";
  }
}

// Add or update a product
// If product id == 0 then it is a new product
// Otherwise (if id > 0) then update 
async function addOrUpdateProduct(formProduct) {

  // declare variables
  let result;

  // Call the product validator - kept seperate to avoid clutter here
  let validatedProduct = productValidator.validateProduct(formProduct);

  // If validation returned a product object - save to database
  if (validatedProduct) {
    // insert or update?
    if (validatedProduct.id == 0) {
      // Insert
      result = await productData.createProduct(validatedProduct);
    } else {
      // update
      result = await productData.updateProduct(validatedProduct);
    }
  } else {
    // Product data failed validation
    result = { result: "error - invalid product" }; // log the result

    console.log("productService.createProduct(): form data validate failed");
  }

  return result;
}

// Function to delete product by id
//
async function deleteProduct(id) {
  // validate the id
  const delId = validate.validateId(id)
  if (delId) {
    // Call the repository function to get product matching id
    const result = await productData.deleteProductById(delId);

    // return the result
    return result;

  } else {
    return {"result" : "Error:Invalid product id"};
  }
}

// Module exports
// expose these functions
module.exports = {
  getProducts,
  getProductById,
  getProductsByCatId,
  addOrUpdateProduct,
  deleteProduct
};
