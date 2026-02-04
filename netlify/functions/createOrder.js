const Razorpay = require("razorpay");

exports.handler = async function () {

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET
});

const options = {
  amount: 1000, // ₹10 = 1000 paise
  currency: "INR"
};

const order = await razorpay.orders.create(options);

return {
  statusCode: 200,
  body: JSON.stringify(order)
};

};
