import { Suspense } from "react";
import AccessClient from "./AccessClient";

export default function AccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-semibold tracking-tight">Access</h1>
        <p className="mt-3 text-sm opacity-80">
          Deze pagina verwerkt je betaling en koppelt je automatisch aan de juiste Discord toegang.
        </p>

        <div className="mt-10">
          <Suspense
            fallback={
              <div className="rounded-xl border p-5">
                <p className="text-sm opacity-80">Even laden…</p>
              </div>
            }
          >
            <AccessClient />
          </Suspense>
        </div>
      </div>
    </main>
  );
}