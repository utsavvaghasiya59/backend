const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const UserOTPVeification = require("../../models/userOtpVeificationModel");

const transporter = nodemailer.createTransport({
    service: "gmail", // Or use `host` and `port` directly
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD, // Replace with the generated App Password
    },
});
const sendOtpVerificationEmail = async ({ _id, email, name }) => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Your OTP for Car For You Account Verification",
            html: `
                <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                    <div style="margin:50px auto;width:70%;padding:20px 0">
                    <div style="border-bottom:1px solid #eee">
                        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Car For You</a>
                    </div>
                    <p style="font-size:1.1em; text-transform: capitalize;">Hi ${name},</p>
                    <p>Thank you for choosing Auto Junction. Use the following OTP to complete your Sign Up procedures. OTP is valid for 10 minutes</p>
                    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
                    <p style="font-size:0.9em;">Regards,<br />Car For You</p>
                    <hr style="border:none;border-top:1px solid #eee" />
                    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                        <p>Car For You Inc</p>
                        <p>Vrunda Vaghasiya</p>
                        <p>Utsav Vaghasiya</p>
                        <p>Neel Patel</p>
                        <p>Nensi Munjani</p>
                        <p>Surat</p>
                    </div>
                    </div>
                </div>
            `,
        };

        const saltRounds = 10;
        const hashedOtp = await bcrypt.hash(otp, saltRounds);
        const newOTPVerification = new UserOTPVeification({
            userId: _id,
            otp: hashedOtp,
            expiresAt: Date.now() + 3600000, // 1 hour from now
        });

        await newOTPVerification.save();
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending OTP email:", error);
        throw new Error("Failed to send OTP email.");
    }
};


module.exports = sendOtpVerificationEmail;
