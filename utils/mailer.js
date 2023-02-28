const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (email, subject, text, html, path) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: "Test@Test.com",
      to: email,
      subject: subject,
      text: text,
      html: html ? html : null,
      attachments: path
        ? [
            {
              filename: "invoice.pdf",
              path: path,
              cid: "invoice.png",
            },
          ]
        : null,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

module.exports = sendEmail;
