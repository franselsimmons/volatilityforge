"use client";

import { useMemo, useState } from "react";
import { plans } from "../lib/siteData";

const paymentMethods = [
  "USDT (TRC20)",
  "USDT (BEP20)",
  "USDT (ERC20)",
  "SOL",
];

export default function ManualOrderForm({ defaultPlanKey = "starter" }) {
  const [planKey, setPlanKey] = useState(defaultPlanKey);
  const [discordUsername, setDiscordUsername] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("USDT (TRC20)");
  const [txHash, setTxHash] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const selectedPlan = useMemo(() => {
    return plans.find((p) => p.key === planKey) || plans[0];
  }, [planKey]);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const r = await fetch("/api/manual-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planKey,
          discordUsername,
          email,
          paymentMethod,
          txHash,
          notes,
        }),
      });

      const j = await r.json();

      if (!r.ok) {
        throw new Error(j?.error || "Submit failed");
      }

      setMsg("Payment submitted. We will verify and add access manually.");
      setDiscordUsername("");
      setEmail("");
      setTxHash("");
      setNotes("");
    } catch (err) {
      setMsg(String(err?.message || err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="card formCard" onSubmit={onSubmit}>
      <h2>Submit your order</h2>
      <p className="muted">
        After payment, submit the transaction hash and your Discord username.
        You will be added manually after verification.
      </p>

      <label className="label">Plan</label>
      <select
        className="input"
        value={planKey}
        onChange={(e) => setPlanKey(e.target.value)}
      >
        {plans
          .filter((p) => p.key !== "free")
          .map((p) => (
            <option key={p.key} value={p.key}>
              {p.name} — €{p.euro} / {p.usdt} USDT
            </option>
          ))}
      </select>

      <label className="label">Discord username</label>
      <input
        className="input"
        value={discordUsername}
        onChange={(e) => setDiscordUsername(e.target.value)}
        placeholder="exampleuser or exampleuser#1234"
        required
      />

      <div className="muted small">
        Use the exact Discord name you want added to the private channels.
      </div>

      <label className="label">Email (optional)</label>
      <input
        className="input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
      />

      <label className="label">Payment method</label>
      <select
        className="input"
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        {paymentMethods.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <label className="label">Transaction hash</label>
      <textarea
        className="input textarea"
        value={txHash}
        onChange={(e) => setTxHash(e.target.value)}
        placeholder="Paste your transaction hash here"
        required
      />

      <label className="label">Notes (optional)</label>
      <textarea
        className="input textarea"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder={`Anything useful for verification.\nSelected plan: ${selectedPlan.name}`}
      />

      <button className="btn btnPrimary" disabled={loading}>
        {loading ? "Submitting..." : "Submit payment"}
      </button>

      {msg ? <div className="notice">{msg}</div> : null}
    </form>
  );
}
