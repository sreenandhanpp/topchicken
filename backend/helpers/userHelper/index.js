const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const crypto = require("crypto");
const Order = require("../../MongoDb/models/userModels/order");

module.exports = {
  /* Function to create a new order and save it to the database */
  createOrder: (orderData) => {
    return new Promise(async (resolve, reject) => {
      // Creating a Promise to handle asynchronous operation
      try {
        // Generate a unique code using crypto library
        const uniqueCode = crypto.randomBytes(16).toString("hex");

        // Generate an order ID starting from "FZ1"
        const orderId = `FZ1${uniqueCode}`;

        // Create a new Order instance with order data
        const order = new Order({
          orderId: orderId,
          orderCreationDate: new Date(),
          product: orderData.product,
          flavour: orderData.flavour,
          size: orderData.size,
          qty: orderData.qty,
          expectedDate: orderData.expectedDate,
          orderedBy: orderData.orderedBy,
          branch: orderData.branch,
        });

        // Save the order to the database
        order
          .save()
          .then((data) => {
            // Return order data after successful creation
            resolve("Order created successfully");
          })
          .catch((err) => {
            // Handle errors during order creation
            reject("Something went wrong on creating the order");
          });
      } catch (error) {
        // Handle exceptions
        reject("Something went wrong on creating the order");
      }
    });
  },
};
