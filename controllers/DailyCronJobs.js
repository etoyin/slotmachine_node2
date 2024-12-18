const { sign } = require("jsonwebtoken");
const { scheduleJob } = require("node-schedule");
const nodemailer = require('nodemailer');
const { getAllUsers } = require("../models/user");
const ejs = require("ejs");

require('dotenv').config();






let base_url = process.env.BASE_URL;

async function sendVerificationEmail(email, id) {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false, // use TLS
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
    tls: {
      ciphers:'SSLv3'
    }
  });

  let url = base_url+'/three_spins_win?email='+email+"&id="+id;




  ejs.renderFile("./views/demo.ejs", {url}, async function(error, data){
    if(error){
      console.log(error);
    }
    else{
      const mailOptions = {
        from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`,
        to: email,
        subject: '🎉 Hurray!!! You won 3 Free Spins!',
        html: data
      };

      // console.log("html data ======================>", mailOptions.html);
      await transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent: ' + info.response);
        }
        
      });
    }
  })
}



// const token_email = sign({ email: body.email}, process.env.JWT_SECRET,{expiresIn: '1d'});





scheduleJob('0 9,18 * * *', ()=>{ //, '0 9,18 * * *' '* * * * *'
    getAllUsers((error, results) => {
        if(error){
            console.log(error);
            return res.status(500).json({
                success: 0,
                message: "There was an error, getting all!"
            });
        }
        // return res.status(200).json({
        //     success: 1,
        //     data: results,
        //     message: "Successfull!"
        // });

        console.log(results);
        results.forEach(element => {
            console.log(element);
            
            sendVerificationEmail(element.email, element.id);
        });
    })
});