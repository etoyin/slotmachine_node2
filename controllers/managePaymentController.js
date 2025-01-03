require('dotenv').config();
const hyper = require("@juspay-tech/hyperswitch-node")(
    process.env.HYPERAPIKEY
);

let param = {};

exports.getPaymentParam = async (req, res) => {
    const body = req.body;
    // param.currency = body.currency;
    // param.amount = body.amount;
    // param.first_name = body.first_name;
    // param.last_name = body.last_name;
    // console.log(body);
    
    // res.json({
    //     param
    // })
    res.setHeader('Content-Security-Policy', "frame-ancestors 'self' https://pay.google.com https://*.google.com");
    res.render('payment_page', {
        currency: body.currency,
        email: body.email,
        amount: Number(body.amount) * 100,
        first_name: body.first_name,
        last_name: body.last_name
    })
}

exports.paymentIntent = async (req, res) => {
    const body = req.body;

    const paymentIntent = await hyper.paymentIntents.create({
        amount: Number(body.amount),
        currency: body.currency,
        // merchant_id:"mca_wVeA0UkEz5ypupLZs5jU",
        // profile_id: "pro_3855a1iEwItCAITGl3Ed",
      });
    // console.log(body.amount);
      
    
      //return clientSecret to initiate payment flow at the client
      res.setHeader('Content-Security-Policy', "frame-ancestors 'self' https://pay.google.com https://*.google.com");
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    
}
  
exports.completion = (req, res) => {
    res.render("payment_complete");
}
