// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // Nodemailer needs Node

export async function POST(req: Request) {
  const { name, email, message, hp } = await req.json();

  if (hp) return NextResponse.json({ ok: true }); // honeypot

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! }
  });

  await transporter.sendMail({
    from: `La Grupa <${process.env.SMTP_USER!}>`,
    to: process.env.CONTACT_TO!,
    replyTo: email,
    subject: `Contacto web: ${name}`,
    text: `De: ${name} <${email}>\n\n${message}`
  });

  return NextResponse.json({ ok: true });
}
