"use client";

import { useMemo, useState } from "react";
import { plans } from "../../lib/siteData";
import { paymentMethods } from "../../lib/paymentConfig";

export default function ManualOrderForm({ selectedPlan = "buildup" }) {
  const [form, setForm] = useState({
    plan: selectedPlan,
    discordUsername: "",
    email: "",
    paymentMethod: paymentMethods[0]?.key || "usdt_trc20",
    txHash: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const selected = useMemo(
    () => plans.find((p) => p.slug === form.plan) || plans[0],
    [form.plan]
  );

  function onChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/manual-order", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || "Could not submit order.");
      }

      setResult({
        ok: true,
        reference: json.reference,
        message: json.message,
      });

      setForm((s) => ({
        ...s,
        txHash: "",
        notes: "",
      }));
    } catch (err) {
      setResult({
        ok: false,
        message: String(err?.message || err),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="plan">Plan</label>
        <select id="plan" name="plan" value={form.plan} onChange={onChange}>
          {plans.map((plan) => (
            <option key={plan.slug} value={plan.slug}>
              {plan.name} — €{plan.euro} / {plan.usdt} USDT
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="discordUsername">Discord username</label>
        <input
          id="discordUsername"
          name="discordUsername"
          placeholder="exampleuser or exampleuser#1234"
          value={form.discordUsername}
          onChange={onChange}
          required
        />
        <div className="help">
          Use the exact Discord name you want added to the private channels.
        </div>
      </div>

      <div className="field">
        <label htmlFor="email">Email (optional)</label>
        <input
          id="email"
          name="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={onChange}
        />
      </div>

      <div className="field">
        <label htmlFor="paymentMethod">Payment method</label>
        <select id="paymentMethod" name="paymentMethod" value={form.paymentMethod} onChange={onChange}>
          {paymentMethods.map((method) => (
            <option key={method.key} value={method.key}>
              {method.label}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="txHash">Transaction hash</label>
        <input
          id="txHash"
          name="txHash"
          placeholder="Paste your transaction hash here"
          value={form.txHash}
          onChange={onChange}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="notes">Notes (optional)</label>
        <textarea
          id="notes"
          name="notes"
          placeholder={`Anything useful for verification. Selected plan: ${selected.name}`}
          value={form.notes}
          onChange={onChange}
        />
      </div>

      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit payment"}
      </button>

      {result?.ok && (
        <div className="success-box">
          <strong>Order received.</strong>
          <div style={{ marginTop: 8 }}>{result.message}</div>
          <div style={{ marginTop: 8 }}>
            Reference: <span className="inline-code">{result.reference}</span>
          </div>
        </div>
      )}

      {result && !result.ok && (
        <div className="error-box">
          <strong>Something went wrong.</strong>
          <div style={{ marginTop: 8 }}>{result.message}</div>
        </div>
      )}
    </form>
  );
}