import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.EMAIL_FROM;
const toEmail = process.env.EMAIL_TO;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!resend || !fromEmail || !toEmail) {
      console.error('Email configuration is missing. Please check your environment variables.');
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `New message from ${name} via titancode.pl`,
      replyTo: email,
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    });

    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}