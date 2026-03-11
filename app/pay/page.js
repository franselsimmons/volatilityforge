import SiteShell from "../../components/SiteShell";
import ManualOrderForm from "./ManualOrderForm";
import { plans, getPlanBySlug } from "../../lib/siteData";
import { paymentMethods } from "../../lib/paymentConfig";

export const dynamic = "force-dynamic";

export default function PayPage({ searchParams }) {
  const selectedPlan = getPlanBySlug(searchParams?.plan) || plans[0];

  const wallets = paymentMethods.map((m) => ({
    ...m,
    address: process.env[m.envKey] || "",
  })).filter((x) => x.address);

  return (
    <SiteShell>
      <section className="page-hero">
        <div className="container">
          <h1>Manual crypto payment</h1>
          <p>
            Fill in your details, choose your plan and send payment manually. Include your Discord username in the form so access can be assigned correctly after verification.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container form-shell">
          <div className="card form-card">
            <h2 className="section-title">Submit your order</h2>
            <p className="muted" style={{ marginTop: 0, marginBottom: 22 }}>
              After payment, submit the transaction hash and your Discord username. You will be added manually after verification.
            </p>

            <ManualOrderForm selectedPlan={selectedPlan.slug} />
          </div>

          <div className="card form-card">
            <h2 className="section-title">Payment instructions</h2>
            <p className="muted" style={{ marginTop: 0 }}>
              Send the exact amount for your chosen tier. Then submit the form on the left. Your Discord username is required.
            </p>

            <div className="wallet-box">
              <div className="wallet-row">
                <div className="wallet-label">Selected plan</div>
                <div><strong>{selectedPlan.name}</strong></div>
                <div className="help">€{selectedPlan.euro} or {selectedPlan.usdt} USDT per month</div>
              </div>

              {wallets.length > 0 ? wallets.map((wallet) => (
                <div className="wallet-row" key={wallet.key}>
                  <div className="wallet-label">{wallet.label}</div>
                  <div className="wallet-address">{wallet.address}</div>
                </div>
              )) : (
                <div className="wallet-row">
                  <div className="wallet-label">Wallets not configured yet</div>
                  <div className="help">
                    Add your payment addresses in environment variables before going live.
                  </div>
                </div>
              )}
            </div>

            <div className="note-box" style={{ marginTop: 20 }}>
              Customers should always enter the same Discord username they use inside your server. That lets you verify and assign the correct role manually.
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}