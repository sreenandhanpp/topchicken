const express = require("express");
const userHelper = require("../helpers/userHelper");
const router = express.Router();

//Router to create order
router.post("/create-order", (req, res) => {
  try {
    // Call the createOrder function from the userHelper to create a new order with the data provided in the request body
    userHelper
      .createOrder(req.body)
      .then((message) => {
        // Respond with a success status and include the message from the order creation
        res.status(201).json({ message: message });
      })
      .catch((err) => {
        console.log(err);
        // Handle errors by responding with an appropriate status code and an error message
        res.status(400).json({ message: err });
      });
  } catch (error) {
    // Handle unexpected errors and respond with a generic error message and a status code of 500
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Router to handle updating orders
router.put("/update-order/:orderId", (req, res) => {
  try {
    // Extract orderId from request parameters
    const orderId = req.params.orderId;
    // Extract updateData from request body
    const updateData = req.body;

    // Call a function from the order helper or service to update the order
    userHelper
      .updateOrder(orderId, updateData)
      .then((message) => {
        // Respond with a success status code and a message
        res.status(200).json({ message: message });
      })
      .catch((err) => {
        // Log the error
        console.log(err);
        // Handle errors by responding with a status code indicating a bad request and an error message
        res.status(400).json({ message: err });
      });
  } catch (error) {
    // Handle unexpected errors and respond with a generic error message and a status code of 500
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Router to handle deleting orders
router.delete("/delete-order/:orderId", (req, res) => {
  try {
    // Extract orderId from request parameters
    const orderId = req.params.orderId;

    // Call a function from the order helper or service to delete the order
    userHelper
      .deleteOrder(orderId)
      .then((message) => {
        // Respond with a success status code and a message
        res.status(200).json({ message: message });
      })
      .catch((err) => {
        // Log the error
        console.log(err);
        // Handle errors by responding with a status code indicating a bad request and an error message
        res.status(400).json({ message: err });
      });
  } catch (error) {
    // Handle unexpected errors and respond with a generic error message and a status code of 500
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Router to handle fetching a single order
router.get("/get-order/:orderId", (req, res) => {
  try {
    // Extract orderId from request parameters
    const orderId = req.params.orderId;

    // Call a function from the order helper or service to fetch the order
    userHelper
      .getOrder(orderId)
      .then((order) => {
        // Respond with the fetched order data
        res.status(200).json({ order });
      })
      .catch((err) => {
        // Log the error
        console.log(err);
        // Handle errors by responding with a status code indicating the order was not found and an error message
        res.status(404).json({ message: "Order not found." });
      });
  } catch (error) {
    // Handle unexpected errors and respond with a generic error message and a status code of 500
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Router to handle fetching all orders
router.get("/get-all-orders", (req, res) => {
  try {
    // Call a function from the order helper or service to fetch all orders
    userHelper
      .getAllOrders()
      .then((orders) => {
        // Respond with the list of orders
        res.status(200).json({ orders });
      })
      .catch((err) => {
        // Log the error
        console.log(err);
        // Handle errors by responding with a status code indicating an internal server error and an error message
        res.status(500).json({ message: "Error fetching orders." });
      });
  } catch (error) {
    // Handle unexpected errors and respond with a generic error message and a status code of 500
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

module.exports = router;
