import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "aj@orcaenterprises.ca";
  const FROM_SENDER = process.env.RESEND_FROM ?? "ORCA Contact Form <onboarding@resend.dev>";
  const FROM_REPLY = process.env.RESEND_FROM_REPLY ?? "ORCA Enterprises <onboarding@resend.dev>";
  try {
    const { name, email, company, budget, message } = await req.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const budgetLabel: Record<string, string> = {
      "<5k": "Under $1,000",
      "5k-10k": "$1,000 - $2,500",
      "10k-25k": "$2,500 - $5,000",
      "25k+": "$5,000+",
    };

    // Notify ORCA team
    await resend.emails.send({
      from: FROM_SENDER,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `New project inquiry from ${name}`,
      html: `
        <div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#006B7D,#00C5D1);padding:28px 32px;">
            <h1 style="color:#fff;margin:0;font-size:22px;font-weight:700;">New Project Inquiry</h1>
            <p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:14px;">via orcaenterprises.ca</p>
          </div>
          <div style="padding:32px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr style="border-bottom:1px solid #f1f5f9;">
                <td style="padding:12px 0;color:#64748b;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;width:130px;">Name</td>
                <td style="padding:12px 0;color:#0f172a;font-weight:600;">${name}</td>
              </tr>
              <tr style="border-bottom:1px solid #f1f5f9;">
                <td style="padding:12px 0;color:#64748b;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Email</td>
                <td style="padding:12px 0;"><a href="mailto:${email}" style="color:#006B7D;text-decoration:none;">${email}</a></td>
              </tr>
              ${company ? `<tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:12px 0;color:#64748b;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Company</td><td style="padding:12px 0;color:#0f172a;">${company}</td></tr>` : ""}
              ${budget ? `<tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:12px 0;color:#64748b;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Budget</td><td style="padding:12px 0;color:#0f172a;">${budgetLabel[budget] ?? budget}</td></tr>` : ""}
              <tr>
                <td style="padding:12px 0;color:#64748b;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;vertical-align:top;">Message</td>
                <td style="padding:12px 0;color:#0f172a;line-height:1.6;">${message.replace(/\n/g, "<br>")}</td>
              </tr>
            </table>
            <div style="margin-top:28px;padding:16px;background:#f0fafa;border-radius:6px;border-left:4px solid #006B7D;">
              <p style="margin:0;font-size:13px;color:#006B7D;">Hit reply to respond directly to ${name}.</p>
            </div>
          </div>
        </div>
      `,
    });

    // Auto-reply to the person who submitted
    await resend.emails.send({
      from: FROM_REPLY,
      to: [email],
      subject: `Got your message, ${name} — we'll be in touch soon`,
      html: `
        <div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#006B7D,#00C5D1);padding:28px 32px;">
            <h1 style="color:#fff;margin:0;font-size:22px;font-weight:700;">Message received.</h1>
          </div>
          <div style="padding:32px;">
            <p style="color:#0f172a;font-size:16px;margin:0 0 16px;">Hey ${name},</p>
            <p style="color:#475569;line-height:1.7;margin:0 0 16px;">Thanks for reaching out. We received your message and will get back to you within 24 hours — usually much faster.</p>
            <p style="color:#475569;line-height:1.7;margin:0 0 28px;">If you want to skip the wait, you can book a free 30-minute consultation directly and we can talk through your project right away.</p>
            <a href="https://calendly.com/adhvait-jadav/30min" style="display:inline-block;padding:14px 28px;background:linear-gradient(135deg,#006B7D,#00C5D1);color:#fff;text-decoration:none;font-weight:600;font-size:14px;border-radius:6px;">Book a Free Call</a>
            <hr style="border:none;border-top:1px solid #e2e8f0;margin:32px 0;">
            <p style="color:#94a3b8;font-size:12px;margin:0;">ORCA Enterprises Inc. &mdash; Calgary, Alberta, Canada<br>orcaenterprises.ca</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[contact/route]", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
