const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail", // Or use `host` and `port` directly
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD, // Replace with the generated App Password
    },
});

const sendThankYouEmail = async (data) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: data.email,
        subject: 'Thank You for Your Inquiry',
        html: `
           <div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2;">
                <div style="margin: 50px auto; width: 70%; padding: 20px 0;">
                    <div style="border-bottom: 1px solid #eee;">
                        <a href="" style="font-size: 1.4em; color: #00466a; text-decoration: none; font-weight: 600;">Auto Junction</a>
                    </div>
                    <p style="font-size: 1.1em; text-transform: capitalize;">Hi ${data?.firstName} ${data?.lastName},</p>
                  <p style="font-size: 16px;">Thank you for your inquiry about our services. Our team will contact you shortly.</p>
                    <h2 style="color: #4CAF50;">Inquiry Details</h2>
                    <p><strong>Brand:</strong> ${data?.brand}</p>
                    <p><strong>Model:</strong> ${data?.model}</p>
                    <p><strong>Description:</strong> ${data?.description || 'N/A'}</p>
                    <p><strong>Contact Information:</strong></p>
                    <p><strong>Phone:</strong> ${data?.mobile}</p>
                    <p><strong>City:</strong> ${data?.city}</p>
                    <p><strong>State:</strong> ${data?.state}</p>
                    <p style="font-size: 0.9em;">Regards,<br />Auto Junction Team</p>
                    <hr style="border: none; border-top: 1px solid #eee;" />
                    <div style="float: right; padding: 8px 0; color: #aaa; font-size: 0.8em; line-height: 1; font-weight: 300;">
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

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Thank you email sent to ${data?.email}`);
    } catch (error) {
        console.error(`Failed to send email to ${data?.email}:`, error);
    }
};

module.exports = sendThankYouEmail;
