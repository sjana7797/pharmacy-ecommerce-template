import { createTransport } from "nodemailer";

console.log(Bun.env.EMAIL, Bun.env.EMAIL_PASSWORD);

export const transporter = createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: Bun.env.EMAIL,
    pass: Bun.env.EMAIL_PASSWORD,
  },
});
