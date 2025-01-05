import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Parse JSON from the request body
    const { subject, text, html } = await request.json();

    // Create a Nodemailer transporter using your AWS SES SMTP credentials
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,                 // e.g. email-smtp.us-east-1.amazonaws.com
      port: Number(process.env.SMTP_PORT) || 587,  // e.g. 2587 or 587
      secure: false,                               // true if port is 465
      auth: {
        user: process.env.SMTP_USER,               // e.g. AKIAxxxxxx
        pass: process.env.SMTP_PASS                // e.g. Bxxxxxxx
      },
    });

    // IMPORTANT: The "from" address must be a verified email address (or domain) in SES
    const mailOptions = {
      from: `"Privee Contact Us" <no-reply@privee.world>`, // replace with your verified email
      to: process.env.RECEIVER_EMAIL,                     // or any verified recipient if still in sandbox
      subject: subject || 'No Subject',
      text: text || '',
      html: html || '',
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    // Return success response
    return NextResponse.json({ message: 'Email sent successfully', info });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
