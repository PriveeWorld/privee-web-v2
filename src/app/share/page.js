import { Suspense } from "react";
import ParisPage from "./ParisPage";

export default function ParisPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ParisPage />
    </Suspense>
  );
}
