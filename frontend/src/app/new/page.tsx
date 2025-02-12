import { Suspense } from "react";
import NewProducts from "../components/NewProducts";

function page() {
  return (
    <div>
      <Suspense
        fallback={<div className="section-padding text-base">Loading...</div>}
      >
        <NewProducts />
      </Suspense>
    </div>
  );
}

export default page;
