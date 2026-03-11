"use client";

import { useEffect, useState } from "react";

type AccessStatus = {
  ok: boolean;
  order?: {
    orderId: string;
    plan: string;
    paymentStatus: string;
    discordUserId: string | null;
    discordUsername: string | null;
    guildMemberAdded: boolean;
    roleGranted: boolean;
    payAddress: string | null;
    payAmount: number | null;
    payCurrency: string | null;
  };
  error?: string;
};

export default function AccessClient({ orderId }: { orderId: string }) {
  const [data, setData] = useState<AccessStatus | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const r = await fetch(`/app/api/access/status?orderId=${encodeURIComponent(orderId)}`, {
        cache: "no-store",
      });
      const j = await r.json();
      setData(j);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
  }, [orderId]);

  if (loading && !data) return <div className="text-white">Loading access…</div>;
  if (!data?.ok || !data.order) return <div className="text-red-400">Order not found.</div>;

  const o = data.order;
  const canConnectDiscord =
    o.paymentStatus === "waiting_discord" ||
    o.paymentStatus === "paid" ||
    o.paymentStatus === "finished";

  return (
    <div className="mx-auto max-w-2xl p-6 text-white">
      <h1 className="mb-6 text-4xl font-semibold">Access</h1>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-3">
        <div><b>Order:</b> {o.orderId}</div>
        <div><b>Plan:</b> {o.plan}</div>
        <div><b>Status:</b> {o.paymentStatus}</div>

        {o.payAddress && (
          <>
            <div><b>Pay currency:</b> {o.payCurrency}</div>
            <div><b>Pay amount:</b> {o.payAmount}</div>
            <div className="break-all"><b>Pay address:</b> {o.payAddress}</div>
          </>
        )}

        {o.discordUsername && (
          <div><b>Discord:</b> {o.discordUsername}</div>
        )}

        {o.paymentStatus === "pending" && (
          <div className="text-amber-300">
            Waiting for payment confirmation.
          </div>
        )}

        {canConnectDiscord && (
          <a
            href={`/app/api/discord/login?orderId=${encodeURIComponent(o.orderId)}`}
            className="inline-flex rounded-xl bg-yellow-300 px-5 py-3 font-medium text-black"
          >
            Connect Discord
          </a>
        )}

        {o.paymentStatus === "access_granted" && o.roleGranted && (
          <div className="text-green-400">
            Access granted. Open Discord.
          </div>
        )}
      </div>
    </div>
  );
}