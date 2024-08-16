import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { email, subject, message } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Missing email' }), { status: 400 });
    }
    else if (!subject) {
      return new Response(JSON.stringify({ error: 'Missing subject' }), { status: 400 });
    }
    else if (!message) {
      return new Response(JSON.stringify({ error: 'Missing message' }), { status: 400 });
    };

    let transporter = nodemailer.createTransport({
      host: process.env.SECRET_EMAIL_HOST,
      port: parseInt(process.env.SECRET_EMAIL_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SECRET_EMAIL_USER,
        pass: process.env.SECRET_EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.SECRET_EMAIL_USER,
      to: email,
      subject: subject,
      text: message,
    });
    alert('Email sent successfully');
    return new Response(JSON.stringify({ message: 'Email sent successfully' }), { status: 200 });
  } 
  catch (error) {
    console.error('Error sending email:', error);
    alert('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
  }
}
