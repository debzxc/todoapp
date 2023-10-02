const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      //   host: process.env.HOST,
      //   service: process.env.SERVICE,
      //   port: Number(process.env.EMAIL_PORT),
      //   secure: Boolean(process.env.SECURE),
      service: "Gmail",
      auth: {
        user: "deibeubeu@gmail.com",
        pass: "qnke jbtp vnde lykg",
      },
    });
    await transporter.sendMail({
      from: "deibeubeu@gmail.com",
      to: email,
      subject: subject,
      text: text,
    });
    console.log("Email sent Successfully");
  } catch (error) {
    console.log("Error sending");
    console.log(error);
  }
};
