// ================= FILE FROM ROOT: src/app/admin/login/page.jsx =================

export default function AdminLoginPage() {
  return (
    <main className="centerPage">
      <section className="smallPanel">
        <div className="brand brandCenter">
          <span className="brandMark">VF</span>
          <span>VolatilityForge</span>
        </div>

        <h1>Owner login</h1>
        <p>
          Protected area for publishing public notes, screenshots and membership
          updates. Visitors only need the public site and private Discord access.
        </p>

        <form className="formStack" action="/admin">
          <label>
            Email
            <input name="email" type="email" placeholder="you@example.com" />
          </label>
          <label>
            Password
            <input name="password" type="password" placeholder="••••••••••••" />
          </label>
          <button type="submit">Continue</button>
        </form>
      </section>
    </main>
  );
}