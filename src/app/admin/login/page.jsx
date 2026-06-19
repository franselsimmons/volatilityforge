// ================= FILE FROM ROOT: src/app/admin/login/page.jsx =================

export default function AdminLoginPage() {
  return (
    <main className="adminShell">
      <section className="loginCard">
        <div className="brand center">
          <span className="brandMark">VF</span>
          <span>VolatilityForge</span>
        </div>

        <h1>Admin login</h1>
        <p>
          Dit beheer is alleen voor de eigenaar. Publieke bezoekers horen hier
          niet te komen.
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

          <button type="submit">Login</button>
        </form>

        <p className="smallText">
          Login-verwerking komt via de server-actions. Deze route bestaat nu
          zodat Vercel geen 404 meer geeft.
        </p>
      </section>
    </main>
  );
}