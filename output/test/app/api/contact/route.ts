import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // TODO: Implement your email sending logic here
    // Options:
    // 1. Resend: https://resend.com
    // 2. SendGrid: https://sendgrid.com
    // 3. Nodemailer with SMTP
    // 4. Store in database

    console.log("Contact form submission:", { name, email, subject, message });

    // Simulate a delay for demo purposes
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
