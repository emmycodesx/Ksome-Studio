"use client";

import { useState, type FormEvent } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ArrowUpRight } from "lucide-react";

const amounts = [5000, 10000, 25000, 50000, 100000];

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(25000);
  const [customAmount, setCustomAmount] = useState("");

  const donationAmount = customAmount ? Number(customAmount) : selectedAmount;

  const formatAmount = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    const formData = new FormData(e.currentTarget);

    const email = String(formData.get("email") || "").trim();
    const name = String(formData.get("name") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (
      !email ||
      !Number.isSafeInteger(donationAmount) ||
      donationAmount <= 0
    ) {
      setPaymentError("Please enter a valid email and donation amount.");
      return;
    }

    try {
      setIsSubmitting(true);
      setPaymentError("");

      const response = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          message,
          amount: donationAmount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to start payment.");
      }

      window.location.assign(data.authorizationUrl);
    } catch (error) {
      setPaymentError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );

      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-black">
      <Navbar />

      <main className="w-full">
        {/* Donate Section */}
        <section className="min-h-screen w-full px-6 pb-24 pt-32 md:px-10">
          <div className="mx-auto w-full max-w-[724px]">
            {/* Heading */}
            <header className="mb-9">
              <span className="text-xs font-medium tracking-[0.08em] text-black">
                Donate
              </span>

              <h1 className="mt-2 text-[36px] font-medium leading-[1.15] tracking-[-0.055em] text-[#888] sm:text-[44px]">
                Help us build <em className="font-normal">Ksome Studio.</em>
              </h1>

              <p className="mt-4 max-w-[680px] text-[15px] leading-[1.7] text-black/50">
                If Ksome Studio is meaningful to you, you can support our work
                with a donation, or in ways that cost nothing.
              </p>
            </header>

            {/* Donation Card */}
            <form
              onSubmit={handleSubmit}
              className="relative w-full max-w-[672px] overflow-hidden rounded-[24px] border border-white/[0.08] bg-[linear-gradient(135deg,#303335_0%,#25292b_48%,#1c2021_100%)] px-6 py-9 shadow-[0_25px_80px_rgba(0,0,0,0.3)] sm:px-10 sm:py-10"
            >
              {/* Subtle Card Lighting */}
              <div className="pointer-events-none absolute -right-32 -top-36 h-[350px] w-[350px] rounded-full bg-white/[0.055] blur-[100px]" />

              <div className="relative z-10">
                {/* Card Heading */}
                <h2 className="text-[26px] font-medium tracking-[-0.045em] text-[#f3f3f1] sm:text-[30px]">
                  Support Ksome Studio
                </h2>

                <p className="mt-3 max-w-[540px] text-[14px] leading-[1.75] text-white/60">
                  Every contribution goes into bringing our creative projects to
                  life, producing meaningful films, and continuing to tell
                  stories that move humanity.
                </p>

                {paymentError && (
                  <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs text-red-300">
                    {paymentError}
                  </div>
                )}

                {/* Amount Selection */}
                <fieldset className="mt-6">
                  <legend className="mb-3 text-[12px] font-medium text-white/55">
                    Amount (NGN)
                  </legend>

                  <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-[repeat(5,minmax(0,1fr))]">
                    {amounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount("");
                        }}
                        className={`h-[45px] rounded-[13px] border text-[14px] font-medium transition-all duration-200 ${
                          selectedAmount === amount && !customAmount
                            ? "border-[#eeeeeb] bg-[#eeeeeb] text-[#17191a]"
                            : "border-white/[0.06] bg-black/20 text-white/85 hover:border-white/20 hover:bg-white/[0.07]"
                        }`}
                      >
                        {formatAmount(amount)}
                      </button>
                    ))}

                    {/* Custom Amount */}
                    <label
                      className={`col-span-3 flex h-[45px] min-w-0 items-center gap-2 rounded-[13px] border px-4 transition-all duration-200 sm:col-span-1 ${
                        customAmount
                          ? "border-white/40 bg-black/30"
                          : "border-white/[0.06] bg-black/20"
                      }`}
                    >
                      <span className="text-sm text-white/80">₦</span>

                      <input
                        type="number"
                        min="1"
                        placeholder="Other"
                        aria-label="Other donation amount"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                        }}
                        className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-white/40"
                      />
                    </label>
                  </div>
                </fieldset>

                {/* Name and Email */}
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <label className="block min-w-0">
                    <span className="mb-2.5 flex gap-2 text-[12px] text-white/65">
                      Name
                      <span className="text-white/35">optional</span>
                    </span>

                    <input
                      type="text"
                      name="name"
                      maxLength={80}
                      autoComplete="name"
                      placeholder="Your name"
                      className="h-[46px] w-full rounded-[13px] border border-white/[0.07] bg-black/25 px-4 text-[13px] text-white outline-none transition placeholder:text-white/35 focus:border-white/30"
                    />
                  </label>

                  <label className="block min-w-0">
                    <span className="mb-2.5 flex gap-2 text-[12px] text-white/65">
                      Email
                      <span className="text-white/35">for your receipt</span>
                    </span>

                    <input
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="h-[46px] w-full rounded-[13px] border border-white/[0.07] bg-black/25 px-4 text-[13px] text-white outline-none transition placeholder:text-white/35 focus:border-white/30"
                    />
                  </label>
                </div>

                {/* Note */}
                <label className="mt-5 block">
                  <span className="mb-2.5 flex gap-2 text-[12px] text-white/65">
                    A note to us
                    <span className="text-white/35">optional</span>
                  </span>

                  <textarea
                    name="message"
                    maxLength={280}
                    rows={2}
                    placeholder="What would you love to see us create next?"
                    className="min-h-[66px] w-full resize-y rounded-[13px] border border-white/[0.07] bg-black/25 px-4 py-3 text-[13px] leading-6 text-white outline-none transition placeholder:text-white/35 focus:border-white/30"
                  />
                </label>

                {/* Donate Button */}
                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !Number.isSafeInteger(donationAmount) ||
                    donationAmount <= 0
                  }
                  className="mt-5 flex h-[47px] w-full items-center justify-center gap-2 rounded-full bg-[#eeeeeb] text-[14px] font-medium text-[#17191a] transition-all duration-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting
                    ? "Redirecting to Paystack..."
                    : `Donate ${formatAmount(donationAmount || 0)}`}

                  {!isSubmitting && <ArrowUpRight size={16} />}
                </button>

                {/* Disclaimer */}
                <p className="mt-4 text-[11px] leading-[1.8] text-white/40">
                  Your contribution supports Ksome Studio&apos;s film production and
                  creative projects. Thank you for believing in our vision and
                  helping us tell stories that matter.
                </p>
              </div>
            </form>

            {/* Other Ways to Help */}
            <div className="mt-16 max-w-[672px] space-y-12">
              <section>
                <h2 className="text-[23px] font-medium tracking-tight text-black/50">
                  Other ways to help
                </h2>

                <ul className="mt-5 space-y-4 text-[14px] leading-7 text-black/55">
                  <li>
                    Watch and share our films. Every view helps our stories
                    reach a wider audience.
                  </li>
                  <li>Tell a friend about Ksome Studio and the work we do.</li>
                  <li>
                    Follow us on social media and engage with our projects.
                  </li>
                  <li>
                    Share your feedback and ideas. We love hearing from you.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-[23px] font-medium tracking-tight text-black">
                  About donations
                </h2>

                <p className="mt-5 text-[14px] leading-7 text-black/55">
                  Donations are voluntary contributions towards Ksome Studio&apos;s
                  creative and production activities. They help us develop
                  projects, tell meaningful stories, and continue delivering
                  quality film productions. For questions about supporting our
                  studio, please contact our team.
                </p>
              </section>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
