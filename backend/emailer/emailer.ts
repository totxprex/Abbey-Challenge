import nodemailer from "nodemailer";

const sendMail = function (emailOBJ: any) {
  // const transport = nodemailer.createTransport({
  //   host: process.env.mailHost,
  //   port: process.env.mailPort,
  //   auth: {
  //     user: process.env.mailUser,
  //     pass: process.env.mailPass,
  //   },
  //   secure: false,
  // });

  // transport
  //   .sendMail(emailOBJ)
  //   .then(() => {
  //     console.log("Email sent");
  //   })
  //   .catch((err) => console.log(err));
};

module.exports = { sendMail };
