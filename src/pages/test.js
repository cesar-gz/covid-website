import React, { Suspense } from "react";
import {OCTable, OCChart} from "../components/OrangeCountyFigures";

export default function TestPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OCChart />
        <OCTable />
      </Suspense>
    </div>
  );
}
