import { channelGroups } from "../../lib/siteData";

export default function HowItWorksPage() {
  return (
    <section className="stack">
      <div className="card">
        <h1>How it works</h1>
        <p className="lead">
          Lower tiers get earlier setup visibility. Higher tiers get tighter
          filtering and stronger execution-grade access. Members do not buy the
          engine itself. They buy the result and the delivery.
        </p>
      </div>

      <div className="grid2">
        <div className="card">
          <h2>Tiered delivery</h2>
          <p className="muted">
            BUILDUP, ALMOST, scanner-grade entry and full execution-flow are
            split across Discord roles and channels.
          </p>
        </div>

        <div className="card">
          <h2>Main + Moon</h2>
          <p className="muted">
            Lower plans see earlier structure. Higher plans unlock stronger MAIN
            and MOON funnels plus execution-style delivery.
          </p>
        </div>

        <div className="card">
          <h2>Execution bias</h2>
          <p className="muted">
            The system is built to reduce noise and surface setups that are more
            actionable, not just interesting.
          </p>
        </div>

        <div className="card">
          <h2>Manual crypto onboarding</h2>
          <p className="muted">
            Customer pays manually, submits transaction details and Discord
            username, then gets added after verification.
          </p>
        </div>
      </div>

      <div className="card">
        <h2>Signal quality by channel group</h2>
        <div className="planGrid">
          {channelGroups.map((g) => (
            <div key={g.name} className="planCard">
              <div className="badgePill">{g.quality}</div>
              <h3>{g.name}</h3>
              <p className="muted">{g.summary}</p>
              <ul className="list">
                {g.channels.map((ch) => (
                  <li key={ch}>{ch}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
