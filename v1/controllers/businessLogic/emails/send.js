require('dotenv').config();
const { NODEMAILER_HOST, NODEMAILER_USER, NODEMAILER_PASS, NODEMAILER_PORT } = process.env;
const nodemailer = require('nodemailer');

async function sendMail(email, subject, content) {
    try {
        let transporter = nodemailer.createTransport({
            host: NODEMAILER_HOST,
            port: NODEMAILER_PORT,
            secure: true,
            auth: {
                user: NODEMAILER_USER,
                pass: NODEMAILER_PASS,
            },
        });


        let info = await transporter.sendMail({
            from: NODEMAILER_USER,
            to: email,
            subject: subject,
            text: content
        });

        return info;
    }
    catch (e) {
        res.status(500).json({
            status: 500,
            message: "An error server try occurred, Please again or check the message error !",
            data: e.message
        })
    }


}

module.exports = sendMail;