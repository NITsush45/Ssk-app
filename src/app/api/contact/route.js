import pool from '@/lib/db';
import nodemailer from 'nodemailer';


export const runtime = 'nodejs';

export async function POST(req) {
  const requiredFields = ['name', 'email', 'subject', 'category', 'message'];
  
  try {
    const formData = await req.json();

    // Validation
    const errors = [];
    
    // Check required fields
    requiredFields.forEach(field => {
      if (!formData[field]?.trim()) {
        errors.push(`${field} is required`);
      }
    });

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push('Invalid email format');
    }

    // Validate category
    const validCategories = ['general', 'support', 'feedback', 'business', 'other'];
    if (!validCategories.includes(formData.category)) {
      errors.push('Invalid category selection');
    }

    if (errors.length > 0) {
      return new Response(
        JSON.stringify({ success: false, errors }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Insert into PostgreSQL
    const client = await pool.connect();
try {
  const result = await client.query(
      `INSERT INTO contact_submissions 
      (name, email, subject, category, message)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [
        formData.name,
        formData.email,
        formData.subject,
        formData.category,
        formData.message
      ]
    );
  } finally {
    client.release();
  }

    // Send email notification
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'sushiitantmi45@gmail.com',
      subject: `New Contact Form Submission: ${formData.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Category:</strong> ${formData.category}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message}</p>
        <hr>
        <p>Submitted at: ${new Date().toLocaleString()}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Your message has been submitted successfully!' 
      }),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type'
        } 
      }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Error submitting form. Please try again later.' 
      }),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        } 
      }
    );
  }
}