import { NextResponse } from "next/server";
import sgMail, { MailDataRequired } from "@sendgrid/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

/** ---------- Typed API helpers ---------- */
type ApiSuccess<T = undefined> = T extends undefined
  ? { ok: true }
  : { ok: true; data: T };
type ApiError = { ok: false; error: string };
export type ApiResult<T = undefined> = ApiSuccess<T> | ApiError;

function jsonOk<T = undefined>(data?: T, init?: ResponseInit) {
  const body: any = data === undefined ? { ok: true } : { ok: true, data };
  return NextResponse.json<ApiSuccess<T>>(body, init);
}

function jsonError(message: string, status = 400) {
  return NextResponse.json<ApiError>({ ok: false, error: message }, { status });
}
/** -------------------------------------- */

// Define the expected body structure
interface ContactFormData {
  name: string;
  email: string;
  message: string;
  hp?: string; // honeypot
}

export async function POST(req: Request) {
  try {
    const { name, email, message, hp }: ContactFormData = await req.json();

    // Honeypot: if filled, silently succeed
    if (hp) return jsonOk();

    if (!name || !email || !message) {
      return jsonError("Missing fields", 400);
    }

    const from = process.env.MAIL_FROM as string | undefined;
    const to = process.env.MAIL_TO as string | undefined;

    if (!process.env.SENDGRID_API_KEY) {
      console.error("Missing SENDGRID_API_KEY");
      return jsonError("Server not configured (no API key)", 500);
    }
    if (!from || !to) {
      console.error("Missing MAIL_FROM or MAIL_TO");
      return jsonError("Server not configured (MAIL_FROM/MAIL_TO)", 500);
    }

    const msg: MailDataRequired = {
      to,
      from, // must be a verified sender/domain in SendGrid
      subject: `📩 New contact form message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      replyTo: email,
    };

    await sgMail.send(msg);

    return jsonOk();
  } catch (err: unknown) {
    const e = err as any; // SendGrid types can be loose
    const detail =
      e?.response?.body?.errors
        ?.map((x: { message: string }) => x.message)
        .join("; ") ||
      e?.message ||
      "Unknown error";
    console.error("Send error:", detail, e?.response?.body);
    return jsonError(`Email send failed: ${detail}`, 500);
  }
}

export async function GET() {
  return NextResponse.json({
    runtime: "nodejs",
    hasApiKey: Boolean(process.env.SENDGRID_API_KEY),
    hasMailFrom: Boolean(process.env.MAIL_FROM),
    hasMailTo: Boolean(process.env.MAIL_TO),
  });
}
