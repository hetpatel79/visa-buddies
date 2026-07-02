/**
 * Netlify Function — send-email
 * Uses Gmail SMTP via Nodemailer.
 *
 * Required env vars (set in Netlify → Site → Environment Variables):
 *   GMAIL_USER  — your Gmail address e.g. hetpatel2130@gmail.com
 *   GMAIL_PASS  — Gmail App Password (16 chars, NOT your regular password)
 *                 Get it: Google Account → Security → 2-Step Verification → App passwords
 */

import nodemailer from "nodemailer";

const CORS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function respond(statusCode, body) {
  return {
    statusCode,
    headers: { ...CORS, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

function validatePayload(data) {
  const NAME_RE  = /^[A-Za-z\s.'-]{2,}$/;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_RE = /^[6-9]\d{9}$/;

  if (!data.name  || !NAME_RE.test(data.name.trim()))  return "Invalid name.";
  if (!data.phone || !PHONE_RE.test(data.phone.trim())) return "Invalid phone number.";
  if (!data.email || !EMAIL_RE.test(data.email.trim())) return "Invalid email.";
  if (!data.consultType)                                 return "Missing consultation type.";
  if (!data.visa)                                        return "Missing visa type.";
  if (!data.date)                                        return "Missing date.";
  if (!data.time)                                        return "Missing time.";
  const hasCountry = (data.countries && data.countries.length > 0) || data.otherCountry?.trim();
  if (!hasCountry)                                       return "At least one country is required.";
  return null;
}

function buildStaffEmail(d) {
  const countries = [...(d.countries || []), d.otherCountry].filter(Boolean).join(", ");
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><style>
  body{font-family:'Segoe UI',Arial,sans-serif;background:#f4f6fa;margin:0;padding:32px 0;}
  .wrap{max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.09);}
  .hdr{background:linear-gradient(135deg,#0B2D5C,#1a4080);padding:32px 36px;text-align:center;}
  .hdr h1{color:#C89B3C;margin:0;font-size:22px;letter-spacing:1px;}
  .hdr p{color:#E8C46A;margin:8px 0 0;font-size:13px;}
  .body{padding:32px 36px;}
  .badge{display:inline-block;padding:6px 16px;border-radius:99px;background:#C89B3C22;border:1px solid #C89B3C66;color:#9A7420;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:24px;}
  table{width:100%;border-collapse:collapse;margin-bottom:24px;}
  td{padding:12px 16px;font-size:14px;color:#2B2B2B;border-bottom:1px solid #E2E8F0;}
  td:first-child{width:36%;font-weight:700;color:#0B2D5C;background:#F5F7FA;}
  .ftr{background:#F5F7FA;padding:20px 36px;text-align:center;font-size:12px;color:#64748B;}
</style></head>
<body>
  <div class="wrap">
    <div class="hdr">
      <h1>✦ VISA BUDDIES</h1>
      <p>New Consultation Request</p>
    </div>
    <div class="body">
      <div class="badge">🔔 Action Required</div>
      <table>
        <tr><td>Name</td><td>${d.name}</td></tr>
        <tr><td>Phone</td><td>${d.phone}</td></tr>
        <tr><td>Email</td><td>${d.email}</td></tr>
        <tr><td>Type</td><td>${d.consultType === "call" ? "📞 Schedule a Call" : "📍 Schedule a Visit"}</td></tr>
        <tr><td>Date</td><td>${d.date}</td></tr>
        <tr><td>Time</td><td>${d.time}</td></tr>
        <tr><td>Visa Type</td><td>${d.visa}</td></tr>
        <tr><td>Countries</td><td>${countries}</td></tr>
      </table>
    </div>
    <div class="ftr">Visa Buddies • Gujarat, India • www.visa-buddies.com</div>
  </div>
</body>
</html>`;
}

function buildClientEmail(d) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><style>
  body{font-family:'Segoe UI',Arial,sans-serif;background:#f4f6fa;margin:0;padding:32px 0;}
  .wrap{max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.09);}
  .hdr{background:linear-gradient(135deg,#0B2D5C,#1a4080);padding:40px 36px;text-align:center;}
  .hdr h1{color:#C89B3C;margin:0;font-size:26px;letter-spacing:1px;}
  .hdr p{color:#E8C46A;margin:10px 0 0;font-size:14px;}
  .body{padding:36px;}
  h2{color:#0B2D5C;font-size:20px;margin:0 0 12px;}
  p{color:#475569;font-size:14px;line-height:1.7;margin:0 0 20px;}
  .card{background:#F5F7FA;border-radius:12px;padding:24px;border:1px solid #E2E8F0;margin:24px 0;}
  .card-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #E2E8F0;font-size:14px;}
  .card-row:last-child{border-bottom:none;}
  .label{font-weight:700;color:#0B2D5C;}
  .value{color:#475569;}
  .cta{display:block;text-align:center;padding:14px 28px;background:linear-gradient(135deg,#C89B3C,#E8C46A);color:#0B2D5C;font-weight:800;text-decoration:none;border-radius:10px;font-size:15px;margin:24px 0;}
  .ftr{background:#F5F7FA;padding:20px 36px;text-align:center;font-size:12px;color:#94A3B8;}
</style></head>
<body>
  <div class="wrap">
    <div class="hdr">
      <h1>✦ VISA BUDDIES</h1>
      <p>Your Dream. Our Plan. Better Future.</p>
    </div>
    <div class="body">
      <h2>Hi ${d.name}, your consultation is booked! 🎉</h2>
      <p>Thank you for choosing Visa Buddies. One of our visa experts will reach out to you within <strong>24 hours</strong> to confirm your appointment.</p>
      <div class="card">
        <div class="card-row"><span class="label">Consultation Type</span><span class="value">${d.consultType === "call" ? "📞 Phone Call" : "📍 Office Visit"}</span></div>
        <div class="card-row"><span class="label">Date</span><span class="value">${d.date}</span></div>
        <div class="card-row"><span class="label">Time</span><span class="value">${d.time}</span></div>
        <div class="card-row"><span class="label">Visa Type</span><span class="value">${d.visa}</span></div>
      </div>
      <p>In the meantime, feel free to WhatsApp us if you have any questions.</p>
      <a href="https://wa.me/918160050554" class="cta">💬 Chat on WhatsApp</a>
      <p style="font-size:13px;color:#94A3B8;">No spam. No hidden charges. 100% free consultation.</p>
    </div>
    <div class="ftr">© 2026 Visa Buddies • Gujarat, India<br>www.visa-buddies.com • +91 81600 50554</div>
  </div>
</body>
</html>`;
}

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: CORS, body: "" };
  }
  if (event.httpMethod !== "POST") {
    return respond(405, { error: "Method not allowed." });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_PASS;
  if (!gmailUser || !gmailPass) {
    console.error("GMAIL_USER or GMAIL_PASS env vars not set.");
    return respond(500, { error: "Server configuration error. Please contact us directly." });
  }

  let data;
  try {
    data = JSON.parse(event.body || "{}");
  } catch {
    return respond(400, { error: "Invalid request." });
  }

  // Honeypot — bots fill hidden company field
  if (data.company) return respond(200, { ok: true });

  const validationError = validatePayload(data);
  if (validationError) return respond(400, { error: validationError });

  // Create Gmail transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailPass },
  });

  try {
    // 1. Staff notification
    await transporter.sendMail({
      from: `"Visa Buddies" <${gmailUser}>`,
      to:   gmailUser,
      subject: `📋 New Consultation — ${data.name} (${data.visa})`,
      html: buildStaffEmail(data),
    });

    // 2. Client confirmation (best-effort — don't fail if client email bounces)
    transporter.sendMail({
      from:    `"Visa Buddies" <${gmailUser}>`,
      to:      data.email,
      replyTo: gmailUser,
      subject: "✅ Your Visa Consultation is Confirmed — Visa Buddies",
      html:    buildClientEmail(data),
    }).catch((e) => console.warn("Client confirmation failed (non-fatal):", e.message));

    return respond(200, { ok: true });
  } catch (err) {
    console.error("Gmail send error:", err.message);
    return respond(502, { error: "Failed to send email. Please try again or contact us on WhatsApp." });
  }
}
