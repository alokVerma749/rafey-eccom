import nodemailer from 'nodemailer';

export interface EmailConfigType {
  email: string,
  username: string,
  msg: string,
  subject: string,
  imageLink: string
}

export const sendEmail = async (email: string, username: string, subject: string, msg: string, imageLink?: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    html: `
      <html>
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Bellafair&display=swap" rel="stylesheet">
          <style>
            body {
              font-family: 'Bellafair', serif;
              color: #333;
              background-color: #f8f9fa;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              background: white;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .content {
              font-size: 16px;
              line-height: 1.5;
            }
            .image {
              display: block;
              margin: 20px auto;
              width: auto;
              height: 200px;
              border-radius: 8px;
            }
            .footer {
              margin-top: 20px;
              font-size: 14px;
              color: #666;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <p>Dear <strong>${username}</strong>,</p>
            <p class="content">${msg}</p>
            ${imageLink ? `<img src="${imageLink}" alt="Image" class="image" />` : ""}
            <p>Best regards,</p>
            <p><strong>Team</strong></p>
            <div class="footer">This is an automated email. Please do not reply.</div>
          </div>
        </body>
      </html>
    `,
  };

  return transporter.sendMail(mailOptions);
};
