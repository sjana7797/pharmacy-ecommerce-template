import { Hono } from "hono";
import { transporter } from "../lib/email";

export const emailRoute = new Hono();

emailRoute.post("/customer/welcome", async (c) => {
  const email = c.req.query("email");
  const verificationToken = c.req.query("verificationToken");

  try {
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <sjana8797@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `<b>${email}</b>
    <br/>
    <b>${verificationToken}</b>
    `, // html body
    });
    return c.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    return c.json({ message: "Email sent failed" }, 500);
  }
});
