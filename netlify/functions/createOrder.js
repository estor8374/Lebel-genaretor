const Razorpay = require("razorpay");

exports.handler = async function (event) {

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  }

  try {

    const razorpay = new Razorpay({
      key_id: process.env.rzp_live_SBFRjqhpikBmjf,     // Set in Netlify ENV
      key_secret: process.env.lmcFoqSifoBUfTiM9sqbHS6Y // Set in Netlify ENV
    });

    const options = {
      amount: 1000, // 10 INR = 1000 paise
      currency: "INR",
      receipt: "order_" + Date.now()
    };

    const order = await razorpay.orders.create(options);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    };

  } catch (err) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Order Failed",
        message: err.message
      })
    };

  }
};
