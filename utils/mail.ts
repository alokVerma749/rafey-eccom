import nodemailer from 'nodemailer';

export interface EmailConfigType {
  email: string,
  username: string,
  msg: string,
  subject: string,
  imageLink: string;
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
                font-family: Arial, sans-serif;
                background-color: #fbeff8;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
            }
            .container {
                width: 90%;
                max-width: 600px;
                background-color: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            }
            .header-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
            }
            .header {
                padding: 10px;
                font-weight: bold;
                width: 100%;
            }
            .image {
                max-width: 100%;
                border-radius: 8px;
                margin-left: 20px;
            }
            .content {
                padding: 20px;
            }
            .content h3 {
                font-size: 18px;
            }
            .content p {
                color: #333;
                line-height: 1.5;
            }
            .code-box {
                background-color: black;
                color: white;
                padding: 10px;
                text-align: center;
                font-weight: bold;
                margin: 20px 0;
            }
            .button{   background-color: #c2fbd7;   border-radius: 100px;   box-shadow: rgba(44, 187, 99, .2) 0 -25px 18px -14px inset,rgba(44, 187, 99, .15) 0 1px 2px,rgba(44, 187, 99, .15) 0 2px 4px,rgba(44, 187, 99, .15) 0 4px 8px,rgba(44, 187, 99, .15) 0 8px 16px,rgba(44, 187, 99, .15) 0 16px 32px;   color: green;   cursor: pointer;   display: inline-block;   font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;   padding: 7px 20px;   text-align: center;   text-decoration: none;   transition: all 250ms;   border: 0;   font-size: 16px;   user-select: none;   -webkit-user-select: none;   touch-action: manipulation; }  .button-33:hover {   box-shadow: rgba(44,187,99,.35) 0 -25px 18px -14px inset,rgba(44,187,99,.25) 0 1px 2px,rgba(44,187,99,.25) 0 2px 4px,rgba(44,187,99,.25) 0 4px 8px,rgba(44,187,99,.25) 0 8px 16px,rgba(44,187,99,.25) 0 16px 32px;   transform: scale(1.05) rotate(-1deg); }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #666;
                padding: 10px;
            }
            @media (min-width: 768px) {
                .header-container {
                    flex-direction: row;
                    justify-content: space-between;
                    gap: 20px;
                    align-items: center;
                    text-align: left;
                }
                .header {
                    flex: 1;
                    text-align: left;
                    padding: 15px;
                }
                .banner img {
                    flex: 1;
                    max-width: 50%;
                    padding: 10px;
                }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header-container">
              ${imageLink ? `<img src="${imageLink}" alt="Image" class="image">` : ""}
            </div>
            <div class="content">
              <h3>Hi ${username || ""},</h3>
              <p>${msg}</p>
              <div>Best Regards,</div>
              <p><strong>Team</strong></p>
              <a href="https://rafey-eccom.vercel.app/sales" class="button">Shop Now</a>
            </div>
            <div class="footer">This is an automated email. Please do not reply.</div>
          </div>
        </body>
      </html>
    `,
  };

  return transporter.sendMail(mailOptions);
};
