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

  // Function to update an order
  updateOrder: (orderId, updatedData) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Find the order by orderId and update its data
        const updatedOrder = await Order.updateOne(
          { orderId: orderId },
          { $set: updatedData }
        );

        // Check if the order was found and updated
        if (updatedOrder.nModified === 0) {
          reject("Order not found"); // Reject if the order with the given orderId doesn't exist
          return;
        }

        resolve("Order updated successfully"); // Resolve with the success message
      } catch (error) {
        // Handle exceptions
        reject("Something went wrong while updating the order");
      }
    });
  },

  // Function to delete an order
  deleteOrder: (orderId) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Find the order by orderId and delete it
        const deletedOrder = await Order.findOneAndDelete({ orderId: orderId });

        // Check if the order was found and deleted
        if (!deletedOrder) {
          reject("Order not found"); // Reject if the order with the given orderId doesn't exist
          return;
        }

        resolve("Order deleted successfully"); // Resolve with the success message
      } catch (error) {
        // Handle exceptions
        reject("Something went wrong while deleting the order");
      }
    });
  },

  // Function to fetch a single order by orderId
  getOrder: (orderId) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Find the order by orderId
        const order = await Order.findOne({ orderId: orderId });

        // Check if the order was found
        if (!order) {
          reject("Order not found"); // Reject if the order with the given orderId doesn't exist
          return;
        }

        resolve(order); // Resolve with the order data
      } catch (error) {
        // Handle exceptions
        reject("Something went wrong while fetching the order");
      }
    });
  },

  getAllOrders: () => {
    return new Promise(async (resolve, reject) => {
      try {
        // Fetch all orders from the database
        const orders = await Order.find();

        if (!orders || orders.length === 0) {
          reject("No orders found"); // Reject if no orders exist in the database
          return;
        }

        resolve(orders); // Resolve with the array of orders
      } catch (error) {
        // Handle exceptions
        reject("Something went wrong while fetching orders");
      }
    });
  },

  // Function to fetch all orders
  getAllOrders: () => {
    return new Promise(async (resolve, reject) => {
      try {
        // Fetch all orders from the database
        const orders = await Order.find();

        // Check if any orders were found
        if (!orders || orders.length === 0) {
          reject("No orders found"); // Reject if no orders exist in the database
          return;
        }

        resolve(orders); // Resolve with the array of orders
      } catch (error) {
        // Handle exceptions
        reject("Something went wrong while fetching orders");
      }
    });
  },
};
