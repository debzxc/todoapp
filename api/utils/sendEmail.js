var nodemailer = require('nodemailer');

module.exports = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        service: process.env.SERVICE,
        port: Number(process.env.EMAIL_PORT),
        secure: Boolean(process.env.SECURE),
        auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
        });
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: "Account Verification",
            text: "Verify your Account"
        });
        console.log("Email sent Successfully")
    } catch (error) {
        console.log("Error sending")
        console.log(error)
     }
}
