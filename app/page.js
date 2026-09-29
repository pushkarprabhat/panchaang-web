import PlacePanel from "./place-panel";

export default function Home() {
  return (
    <>
      <p className="eyebrow">Daily panchang</p>
      <h1>Today, for this place.</h1>
      <p className="lead">
        Five limbs, sunrise, Rahu Kalam, and today’s vrat if the tithi is one.
      </p>
      <PlacePanel compact />
    </>
  );
}
