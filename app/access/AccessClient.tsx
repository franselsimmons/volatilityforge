"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type GrantResult =
  | { ok: true; message?: string; inviteUrl?: string }
  | { ok: false; error: string; inviteUrl?: string };

export default function AccessClient() {
  const sp = useSearchParams();

  const payload = useMemo(() => {
    // Pas deze keys aan aan wat jij gebruikt in je payment flow:
    // bv: ?plan=buildup_bull&email=...&token=...&tx=...
    return {
      plan: sp.get("plan") || "",
      tx: sp.get("tx") || sp.get("payment_id") || "",
      token: sp.get("token") || "",
      email: sp.get("email") || "",
    };
  }, [sp]);

  const [state, setState] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [result, setResult] = useState<GrantResult | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setState("loading");

      try {
        const r = await fetch("/api/discord/grant", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });

        const j = (await r.json()) as GrantResult;

        if (cancelled) return;

        setResult(j);
        setState(j.ok ? "ok" : "err");

        // Als je automatisch wil doorsturen naar Discord invite:
        if (j.ok && j.inviteUrl) {
          window.location.href = j.inviteUrl;
        }
      } catch (e: any) {
        if (cancelled) return;
        setResult({ ok: false, error: String(e?.message || e) });
        setState("err");
      }
    }

    // alleen runnen als er echt iets staat om te verwerken
    const hasSomething = payload.plan || payload.tx || payload.token;
    if (hasSomething) run();
    else {
      setState("err");
      setResult({ ok: false, error: "Missing parameters in URL (plan/tx/token)." });
    }

    return () => {
      cancelled = true;
    };
  }, [payload]);

  if (state === "loading") {
    return (
      <div className="rounded-xl border p-5">
        <p className="text-sm opacity-80">Bezig met verwerken…</p>
      </div>
    );
  }

  if (state === "ok" && result?.ok) {
    return (
      <div className="rounded-xl border p-5">
        <p className="text-sm">
          ✅ Gelukt{result.message ? ` — ${result.message}` : ""}. Je wordt doorgestuurd naar Discord.
        </p>
        {result.inviteUrl ? (
          <a className="mt-4 inline-block underline" href={result.inviteUrl}>
            Klik hier als je niet automatisch wordt doorgestuurd
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <div className="rounded-xl border p-5">
      <p className="text-sm">
        ❌ {result && !result.ok ? result.error : "Onbekende fout."}
      </p>
    </div>
  );
}