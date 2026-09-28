import StartForm from "./start-form";

export default function StartPage({ searchParams }) {
  const plan = searchParams?.plan || "dainik";
  return (
    <>
      <h1>Start</h1>
      <p className="muted">
        Card payment opens after Razorpay keys. This form books your plan and email.
      </p>
      <StartForm initialPlan={plan} />
    </>
  );
}
