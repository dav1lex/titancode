import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.EMAIL_FROM;
  const toEmail = process.env.EMAIL_TO;

  if (!apiKey || !fromEmail || !toEmail) {
    console.error("Missing environment variables for email configuration.");
    return NextResponse.json(
      { error: "Server configuration error. Please contact support." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Sanitize user input
    const sanitizedName = DOMPurify.sanitize(name);
    const sanitizedEmail = DOMPurify.sanitize(email);
    const sanitizedMessage = DOMPurify.sanitize(message);

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `New message from ${sanitizedName} via titancode.pl`,
      replyTo: sanitizedEmail,
      html: `<p>Name: ${sanitizedName}</p><p>Email: ${sanitizedEmail}</p><p>Message: ${sanitizedMessage}</p>`,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ error: "Error sending email." }, { status: 500 });
    }

    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}