const User_Data = require('../models/Admin/User_Data');
const User_profile = require('../models/Admin/User_profile');
const Transaction = require('../models/Transaction');

require('dotenv').config();
const hyper = require("@juspay-tech/hyperswitch-node")(
    process.env.HYPERAPIKEY
);

let param = {};

exports.createTransactions = async (req, res) => {
    const body = req.body;
    
    const transaction = await Transaction.findAll({
        where:{
            user_id: body.user_id,
            transaction_id: body.paymentIntent.payment_id,
            amount: body.paymentIntent.amount,
        }
    })

    if(transaction.length){
        console.log(transaction.length);
        // console.log(Number(body.amount));
        return res.json({
            status: 400,
            message: "Transaction already processed!"
        });
        
    }
    else{
        try {
            // await sequelize.sync(); // Synchronize the database model
            const newTransaction = await Transaction.create({
                user_id: body.user_id,
                transaction_id: body.paymentIntent.payment_id,
                amount: body.paymentIntent.amount,
                status: body.paymentIntent.status,
            });
            // console.log('New Transaction created:', newTransaction.toJSON());

            const user_profile = await User_profile.findOne({
                where:{
                    user_id: body.user_id,
                }
            });
            // console.log(user_profile);
            // console.log(user_profile.balance);
            
            if(user_profile){
                user_profile.balance = Math.ceil((100/1.99) * Number(body.paymentIntent.amount)/100 + Number(user_profile.balance));
                // console.log(Number(body.amount));
                
                await user_profile.save();
            }
            return res.json({
                status: 200,
                message: "Number of Spins updated!"
            })
        } catch (error) {
            console.error('Error creating user:', error);
        }
    }

    
    // res.json({
    //     body
    // })
    
}

