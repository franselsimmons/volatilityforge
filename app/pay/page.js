import ManualOrderForm from "../../components/ManualOrderForm";
import { plans } from "../../lib/siteData";
import { getWalletByMethod, walletsConfigured } from "../../lib/paymentConfig";

export default async function PayPage({ searchParams }) {
  const params = await searchParams;
  const planKey = String(params?.plan || "starter");
  const plan =
    plans.find((p) => p.key === planKey && p.key !== "free") ||
    plans.find((p) => p.key === "starter");

  const trc20 = getWalletByMethod("trc20");
  const bep20 = getWalletByMethod("bep20");
  const erc20 = getWalletByMethod("erc20");
  const sol = getWalletByMethod("sol");
  const configured = walletsConfigured();

  return (
    <section className="stack">
      <div className="card">
        <h1>Manual crypto payment</h1>
        <p className="lead">
          Fill in your details, choose your plan and send payment manually.
          Include your Discord username in the form so access can be assigned
          correctly after verification.
        </p>
      </div>

      <div className="grid2">
        <ManualOrderForm defaultPlanKey={plan.key} />

        <div className="card">
          <h2>Payment instructions</h2>
          <p className="muted">
            Send the exact amount for your chosen tier. Then submit the form on
            the left. Your Discord username is required.
          </p>

          <div className="subCard">
            <div className="muted">Selected plan</div>
            <div className="planStrong">{plan.name}</div>
            <div className="muted">
              €{plan.euro} or {plan.usdt} USDT per month
            </div>
          </div>

          {!configured ? (
            <div className="subCard">
              <div className="planStrong">Wallets not configured yet</div>
              <div className="muted">
                Add your payment addresses in environment variables before going
                live.
              </div>
            </div>
          ) : (
            <>
              {trc20 ? (
                <div className="subCard">
                  <div className="planStrong">USDT (TRC20)</div>
                  <div className="walletBox">{trc20}</div>
                </div>
              ) : null}

              {bep20 ? (
                <div className="subCard">
                  <div className="planStrong">USDT (BEP20)</div>
                  <div className="walletBox">{bep20}</div>
                </div>
              ) : null}

              {erc20 ? (
                <div className="subCard">
                  <div className="planStrong">USDT (ERC20)</div>
                  <div className="walletBox">{erc20}</div>
                </div>
              ) : null}

              {sol ? (
                <div className="subCard">
                  <div className="planStrong">SOL</div>
                  <div className="walletBox">{sol}</div>
                </div>
              ) : null}
            </>
          )}

          <div className="subCard">
            <div className="planStrong">Customer onboarding</div>
            <div className="muted">
              After verification, the user is added manually to the correct
              Discord channels for their plan.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
