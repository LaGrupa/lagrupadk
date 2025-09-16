// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // Nodemailer requiere Node.js runtime

export async function POST(req: Request) {
  try {
    const { name, email, message, hp } = await req.json();

    // Honeypot anti-spam: si viene relleno, salimos sin error
    if (hp) return NextResponse.json({ ok: true });

    // Validaciones mínimas
    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing fields" },
        { status: 400 }
      );
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return NextResponse.json(
        { ok: false, error: "Email inválido" },
        { status: 400 }
      );
    }

    // Transporter Gmail (STARTTLS en 587)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 587),
      secure: false, // true para 465; false para 587 (STARTTLS)
      auth: {
        user: process.env.SMTP_USER!, // debe ser TU gmail (el que generó la app password)
        pass: process.env.SMTP_PASS!, // tu contraseña de aplicación (16 dígitos)
      },
    });

    const plain = `De: ${name} <${email}>\n\n${message}`;
    const html = `
      <p><strong>De:</strong> ${name} &lt;${email}&gt;</p>
      <div style="white-space:pre-wrap;line-height:1.5">${escapeHtml(
        message
      )}</div>
    `;

    await transporter.sendMail({
      from: `La Grupa <${process.env.SMTP_USER!}>`, // el FROM debe ser tu Gmail
      to: process.env.CONTACT_TO || process.env.SMTP_USER, // destinatario (fallback al remitente)
      replyTo: email, // para que puedas contestar al usuario
      subject: `Contacto web: ${name}`,
      text: plain,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error enviando email:", err);
    return NextResponse.json(
      { ok: false, error: "Error enviando correo" },
      { status: 500 }
    );
  }
}

/** Sanea contenido para HTML simple */
function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
