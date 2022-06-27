
import nodemailer from 'nodemailer';
export const sendMail = async(email,title="Email from food app",body)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'samarthsingh890.ss@gmail.com',
          pass: 'eolhpypbrobqoubm'
        }
      });
      var mailOptions = {
        from: 'samarthsingh890.ss@gmail.com',
        to: email,
        subject: title,
        // text: 'That was easy!',
        html: body
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}