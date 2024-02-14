
const nodemailer = require("nodemailer");
const {emailConfig} = require('../config/config')
async function sendmail(data) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      // host: "smtp.ethereal.email",
      // port: 587,
      // secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.GMAIL, // generated ethereal user
        pass: process.env.GMAIL_APP_PASSWORD, // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"ASU COURSE BOT 👻"', // sender address
      to: emailConfig.receivers, // list of receivers
      subject: ` ✔ [${data.seatsLeft}] seats available`, // Subject line
      text: `hey ${data.name}! \n ${data.seatsLeft} seats are now available for the course ${data.subjectNumber} ${data.subjectTitle} \n grab your course at ${data.url}`, // plain text body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

module.exports = sendmail