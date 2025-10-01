import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { name, email, message, hp } = await req.json();

    // Honeypot: if filled, silently succeed
    if (hp) return NextResponse.json({ ok: true });

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    const from = process.env.MAIL_FROM || "info@lagrupa.dk";
    const to = process.env.MAIL_TO || "info@lagrupa.dk";

    await sgMail.send({
      to,
      from, // must be your authenticated domain/sender
      subject: `📩 New contact form message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      replyTo: email, // replies go to the sender
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("SendGrid error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
