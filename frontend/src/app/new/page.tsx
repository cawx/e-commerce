import React from "react";

function page() {
  return (
    <div>
      <ArrivalsSection />
    </div>
  );
}

const ArrivalsSection = () => {
  return (
    <section className="section-padding">
      <div>New arrivals</div>
    </section>
  );
};

export default page;
