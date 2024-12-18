const { verify } = require("jsonwebtoken");

require('dotenv').config();
// res.redirect('/');
module.exports = {
  checkAdminToken: (req, res, next) => {
    let token = req.cookies.admin;
    if(token){
      // token = token.slice(7);
      verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if(error){
          // res.json({
          //   success: 0,
          //   message: "Invalid token",
          //   validToken: false,
          //   token: token,
          //   error
          // });
          res.redirect('/admin_login');
        }else{
          next();
        }
      })
    }else{
      // res.json({
      //   success: 0,
      //   message: "Access denied! unauthorised user",
      //   validToken: false
      // })
      res.redirect('/admin_login');
    }
  }
}