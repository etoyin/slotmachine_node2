const { sign } = require("jsonwebtoken");
const { scheduleJob } = require("node-schedule");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { getAllUsers } = require("../models/user");
const ejs = require("ejs");
const User_profile = require("../models/Admin/User_profile");
const Link = require("../models/Admin/Daily_Email_Link");
const Daily_Link = require("../models/Admin/Daily_Email_Link");
const { Op } = require("sequelize");

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

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24); // Link expires in 24 hours

  const newLink = await Link.create({
        user_id: id,
        token: token,
        expiresAt: expiresAt,
      });
  let url = base_url+'/three_spins_win?email='+email+"&id="+id+"&token="+token;




  ejs.renderFile("./views/daily_mail_cron.ejs", {url}, async function(error, data){
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
    getAllUsers(async (error, results) => {
        if(error){
            console.log(error);
            return res.status(500).json({
                success: 0,
                message: "There was an error, getting all!"
            });
        }

        console.log(results);
        results.forEach(async(element) => {
            console.log(element);
            sendVerificationEmail(element.email, element.id);
        });

        const now = new Date(); 
        let deletedLinks = await Daily_Link.destroy({
          where: {
            expiresAt: {
                [Op.lt]: now,
            },
          },
        });
        console.log(`Deleted ${deletedLinks} expired links`);
    })
});