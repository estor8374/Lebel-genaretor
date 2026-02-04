const Razorpay = require("razorpay");

exports.handler = async function (event) {

  // Allow GET + POST both
  if (event.httpMethod !== "GET" && event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  }

  try {

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET
    });

    const options = {
      amount: 1000, // ₹10
      currency: "INR"
    };

    const order = await razorpay.orders.create(options);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(order)
    };

  } catch (error) {

    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };

  }
};
