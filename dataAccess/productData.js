// Data access functions for products

// Import dependencies
const { PrismaClient } = require('@prisma/client');

// declare an instance of the client
const prisma = new PrismaClient();

// Get all products from DB
//
async function getProducts() {
    // define variable to store products
    let products;

    try {  
        // Get all products
        // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#findmany
        products = await prisma.product.findMany();

        // Alternative raw sql
        // prisma.$queryRaw`select * from product`;

    // Catch and log errors to server side console 
    } catch (err) {
        console.log('DB Error - get all products: ', err.message);
    } finally {

    }
    // return all products found
    return products;
}


// Get product by id from DB
//
async function getProductById(id) {

    // Define variable
    let product;

    try {
        // use where with findUnique
        product = await prisma.product.findUnique ({
            where: {id: id}
        });

    // Catch and log errors to server side console 
    } catch (err) {
        console.log('DB Error - get product by id: ', err.message);
    } finally {

    }
    // return a single product if found
    return product;
}

// Get products from DB by cat id
//
async function getProductsByCatId(catId) {

    // define variable to store products returned
    let products;

    // execute the query to find products
    try {
        // find all products
        products = await prisma.product.findMany ({
            // where category_id = catId
            where: {category_id: catId}
        });

    // Catch and log errors to server side console 
    } catch (err) {
        console.log('DB Error - get products by category: ', err.message);
    } finally {

    }
    // return all products found
    return products;
}

// Insert a new product into the database
// Return the result
//
async function createProduct(product) {
    let newProduct;

    // execute query using prisma.product.create
    // Note the data object
    try {
        // New product so no id
        newProduct = await prisma.product.create({
            data: {
                category_id: Number(product.category_id), 
                product_name: product.product_name, 
                product_description: product.product_description, 
                product_stock: Number(product.product_stock), 
                product_price: Number(product.product_price)
            }
        });

    // Catch and log errors to server side console 
    } catch (err) {
        console.log('DB Error - create product: ', err.message);
    } finally {

    }
    // return the new product
    return newProduct;
}

// Update a product and return it
//
async function updateProduct(product) {
    // var for result
    let result;

    // execute the update via prisma
    try {
        // set the sql paramaters and execute
        result = await prisma.product.update({
            // Update the product with matching id
            where: {id: Number(product.id)},

            // updated product data
            data: {
                category_id: Number(product.category_id), 
                product_name: product.product_name, 
                product_description: product.product_description, 
                product_stock: Number(product.product_stock), 
                product_price: Number(product.product_price)
            },
        });

    // Catch and log errors to server side console 
    } catch (err) {
        console.log('DB Error - update product: ', err.message);
    } finally {

    }
    // return the query result (updated product)
    return result;
}

// Delete product by id from DB
//
async function deleteProductById(id) {
    let result;
    try {
        // set id parameter value in where clause
        result = await prisma.product.delete({
            where: {id: Number(id)}
        });
        console.log('delete result: ', result);

    // Catch and log errors to server side console 
    } catch (err) {
        console.log('DB Error - delete: ', err.message);
    } finally {

    }
    // return the query result
    return result;
}

// Export 
module.exports = {
    getProducts,
    getProductById,
    getProductsByCatId,
    createProduct,
    updateProduct,
    deleteProductById
};
