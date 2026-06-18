// VolatilityForge logo — een hexagonaal keurmerk (echtheidsstempel op
// gesmeed metaal) met een getemperde V-trechter en een ember-vonk in de
// focus. De gloed komt via CSS (drop-shadow), zodat het logo veilig
// meerdere keren op één pagina kan staan zonder dubbele SVG-id's.

export default function Logo({ size = 34, showWordmark = true }) {
  return (
    <span className="logo">
      <svg
        className="logo__mark"
        width={size}
        height={size}
        viewBox="0 0 48 48"
        role="img"
        aria-label="VolatilityForge"
      >
        {/* Hexagonaal keurmerk — solide, symmetrisch, vertrouwenwekkend */}
        <polygon
          points="24,3 42.19,13.5 42.19,34.5 24,45 5.81,34.5 5.81,13.5"
          fill="none"
          stroke="var(--steel-600)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        {/* De getemperde V — ruwe volatiliteit gekanaliseerd tot één punt */}
        <path
          d="M15 15 L24 30 L33 15"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* De ember-vonk die zich verzamelt in de focus */}
        <path className="logo__ember" d="M24 29 l3 4 l-3 4 l-3 -4 z" fill="var(--ember)" />
      </svg>
      {showWordmark && (
        <span className="logo__word">
          <span className="logo__word-a">Volatility</span>
          <span className="logo__word-b">Forge</span>
        </span>
      )}
    </span>
  );
}
