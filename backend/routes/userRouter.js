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


module.exports = router;
