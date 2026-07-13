export function AnalyticsTool() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        height: "100%",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <p style={{ maxWidth: "420px", color: "#6b7280" }}>
        Las estadísticas de visitas del sitio se ven en el panel de
        Cloudflare, no acá en Sanity.
      </p>
      <a
        href="https://dash.cloudflare.com/?to=/:account/analytics/web-analytics"
        target="_blank"
        rel="noreferrer"
        style={{
          padding: "0.9rem 1.5rem",
          borderRadius: "10px",
          background: "#111",
          color: "#fff",
          textDecoration: "none",
          fontWeight: 600,
          fontSize: "1.05rem",
        }}
      >
        Abrir Cloudflare Web Analytics ↗
      </a>
    </div>
  );
}
