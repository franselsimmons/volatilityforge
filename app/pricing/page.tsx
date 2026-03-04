import PlanCard from "@/components/PlanCard";
import { PLANS } from "@/lib/plans";

export default function Pricing() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-14">
      <h1 className="text-3xl font-semibold">Pricing</h1>
      <p className="mt-3 text-[rgb(var(--muted))] max-w-2xl">
        Choose your tier. All plans include both BULL and BEAR signals. Payment in crypto. Access delivered via Discord.
      </p>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {PLANS.map(p => <PlanCard key={p.id} plan={p} />)}
      </div>

      <div className="mt-10 text-xs text-[rgb(var(--muted))]">
        Note: subscriptions are monthly. Renewals can be done by repurchasing. (You can add auto-renew later.)
      </div>
    </div>
  );
}