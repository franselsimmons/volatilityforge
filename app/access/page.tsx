"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function AccessPage() {
  const sp = useSearchParams();
  const ok = sp.get("ok");
  const msg = sp.get("msg") || "";
  const invite = sp.get("invite") || "";

  return (
    <div className="max-w-3xl mx-auto px-5 py-14">
      <h1 className="text-3xl font-semibold">Access</h1>

      {ok === "1" ? (
        <>
          <p className="mt-4 text-[rgb(var(--muted))]">
            Access granted. Your Discord role has been assigned.
          </p>
          {invite ? (
            <a
              className="mt-6 inline-block px-5 py-3 rounded-xl bg-[rgb(var(--brand))] text-black font-medium hover:opacity-90"
              href={invite}
              target="_blank"
              rel="noreferrer"
            >
              Open Discord
            </a>
          ) : (
            <p className="mt-6 text-sm text-[rgb(var(--muted))]">
              Open Discord to see your private channels.
            </p>
          )}
        </>
      ) : (
        <>
          <p className="mt-4 text-red-300">
            Could not grant access. {msg}
          </p>
          <Link className="mt-6 inline-block underline text-[rgb(var(--brand))]" href="/pricing">
            Back to pricing
          </Link>
        </>
      )}
    </div>
  );
}