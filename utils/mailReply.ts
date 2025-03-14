import nodemailer from 'nodemailer';

export const sendEmailReply = async (
  email: string,
  subject: string,
  msg: string,
  heading1?: string,
  heading2?: string,
) => {
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
              font-family: 'Bellafair', sans-serif;
              background-color: #fff;
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
            }

            .container {
              width: 100%;
              max-width: 600px;
              background-color: white;
              padding: 0;
              margin: 0 auto;
            }

            .header {
              background-color: black;
              color: white;
              padding: 15px;
              text-align: left;
              font-size: 16px;
            }

            .hero-section {
              background-color: #fbeff8;
              padding: 40px 20px;
              text-align: left;
            }

            .hero-text {
              font-size: 32px;
              font-weight: bold;
              margin-bottom: 30px;
            }

            .hero-image {
              width: 100%;
              max-width: 500px;
              margin: 20px 0;
            }

            .content {
              padding: 20px;
              color: #333;
              line-height: 1.6;
            }

            .code-box {
              background-color: #f5f5f5;
              border: 1px solid #ddd;
              padding: 15px;
              text-align: center;
              font-weight: bold;
              margin: 20px 0;
              font-size: 18px;
            }

            .button {
              display: inline-block;
              background-color: black;
              color: white;
              padding: 12px 30px;
              text-decoration: none;
              border-radius: 4px;
              font-weight: bold;
              margin: 20px 0;
            }

            .footer {
              background-color: black;
              color: white;
              padding: 20px;
              text-align: center;
            }

            .social-icons {
              display: flex;
              justify-content: center;
              gap: 15px;
              margin-top: 15px;
            }

            .social-icons img {
              width: 24px;
              height: 24px;
              margin: 10px 5px;
            }

            .unsubscribe {
              margin-top: 20px;
              font-size: 12px;
              color: #bbb;
            }

            img {
              width: 550px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              Wonders Tapestry
            </div>

            <div class="hero-section">
              <div class="hero-text">${heading1 || ''}</div>
              <div class="content">${heading2 || ''}</div>
              <div class="content">${msg}</div>
            </div>

            <div class="footer">
              <div>${"Wonders Tapestry"}</div>

              <div class="social-icons">
                <a href="https://facebook.com" target="_blank">
                  <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook">
                </a>
                <a href="https://twitter.com" target="_blank">
                  <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter">
                </a>
                <a href="https://instagram.com" target="_blank">
                  <img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Instagram">
                </a>
              </div>

              <div class="unsubscribe">
                continue shopping, <a href=${process.env.DOMAIN} style="color: #fbeff8; text-decoration: underline;">here</a>.
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  return transporter.sendMail(mailOptions);
};
