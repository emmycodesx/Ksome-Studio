import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, amount, name, message } = await request.json();

    // Validate the donation details
    if (
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      typeof amount !== "number" ||
      !Number.isSafeInteger(amount) ||
      amount <= 0
    ) {
      return NextResponse.json(
        { message: "Please provide a valid email and donation amount." },
        { status: 400 }
      );
    }

    const secretKey = process.env.hello;

    if (!secretKey) {
      return NextResponse.json(
        { message: "Payment configuration is missing." },
        { status: 500 }
      );
    }

    // Paystack expects the amount in kobo, not naira.
    const amountInKobo = amount * 100;

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;

    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: amountInKobo,
          currency: "NGN",
          callback_url: `${baseUrl}/api/paystack/verify`,
          metadata: {
            name: typeof name === "string" ? name.slice(0, 80) : "",
            message:
              typeof message === "string" ? message.slice(0, 280) : "",
            amount_kobo: amountInKobo,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.status) {
      return NextResponse.json(
        { message: data.message || "Unable to initialize payment." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      authorizationUrl: data.data.authorization_url,
      reference: data.data.reference,
    });
  } catch (error) {
    console.error("Paystack initialization error:", error);

    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}