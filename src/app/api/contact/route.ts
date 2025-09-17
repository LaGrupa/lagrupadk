// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // Nodemailer necesita Node runtime

export async function POST(req: Request) {
  try {
    const { name, email, message, hp } = await req.json();

    // Honeypot para bots
    if (hp) return NextResponse.json({ ok: true });

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    // Configuración del transporter
    const port = Number(process.env.SMTP_PORT || 587);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port,
      secure: port === 465, // true para 465 (SSL), false para 587 (STARTTLS)
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    });

    // Verificación de credenciales y conexión
    await transporter.verify();
    console.log("✅ SMTP listo como", process.env.SMTP_USER);

    // Envío del correo
    await transporter.sendMail({
      from: `La Grupa <${process.env.SMTP_USER!}>`, // siempre debe coincidir con SMTP_USER
      to: process.env.CONTACT_TO || process.env.SMTP_USER,
      replyTo: email,
      subject: `Contacto web: ${name}`,
      text: `De: ${name} <${email}>\n\n${message}`,
      html: `
        <p><strong>De:</strong> ${name} &lt;${email}&gt;</p>
        <p style="white-space: pre-line">${message}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("❌ Error SMTP:", err);
    return NextResponse.json(
      { ok: false, error: "Error enviando correo" },
      { status: 500 }
    );
  }
}
