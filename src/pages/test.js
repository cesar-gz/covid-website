import React, { Suspense } from "react";
import OrangeCountyFigures from "../components/OrangeCountyFigures";

export default function TestPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OrangeCountyFigures />
      </Suspense>
    </div>
  );
}
