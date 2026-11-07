import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get("reference");
  const secretKey = process.env.pk_live_42bb308fafea8408a1277f46340a5978a92aaa97;

  const redirectTo = (status: string) =>
    NextResponse.redirect(
      new URL(`/?payment=${status}`, request.url)
    );

  if (!reference || !secretKey) {
    return redirectTo("failed");
  }

  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
        cache: "no-store",
      }
    );

    const result = await response.json();

    const transaction = result.data;

    const isValid =
      response.ok &&
      result.status === true &&
      transaction?.status === "success" &&
      transaction?.currency === "NGN" &&
      transaction?.amount === transaction?.metadata?.amount_kobo;

    if (!isValid) {
      return redirectTo("failed");
    }

    return redirectTo("success");
  } catch (error) {
    console.error("Paystack verification error:", error);
    return redirectTo("failed");
  }
}