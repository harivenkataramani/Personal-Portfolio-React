const functions = require("firebase-functions");
const config = functions.config();
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });
admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: config.user.email,
    pass: config.user.pass,
  },
});

let mailOptions = {
  from: "hari.venkataramani18@gmail.com",
};

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.contactFormMail = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const { name, email, subject, message } = request.query;
    mailOptions = {
      from: "hari.venkataramani18@gmail.com",
      to: "venkata.hari18@gmail.com",
      subject: `Portfolio:-Contact${subject}`,
      html: `
                <p style="font-size:"16px">From: ${name}</p>
                <p style="font-size:"16px">Email: ${email}</p>
                <p style="font-size:"16px">Message: ${message}</p>
                `,
    };
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        response.send(error);
      } else {
        response.send("Mail Sent Successfully");
      }
    });

    mailOptions = {
      from: "hari.venkataramani18@gmail.com",
      to: email,
      subject: "We have received your message!",
      html: `
                  <p style="font-size:"16px">Hi ${name}, <br/>Thanks for contacting me, I will reach out to you very soon</p>
                  <br/>
                  <br/>
                  <p style="font-size:"16px">Regards, <br/>Harivenkataramani. S</p>
                  `,
    };

    transporter.sendMail(mailOptions);
  });
});
