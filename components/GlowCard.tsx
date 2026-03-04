export default function GlowCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-2xl border border-[rgb(var(--stroke))] bg-[rgb(var(--card))] shadow-luxe overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -left-24 h-64 w-64 rounded-full bg-[rgb(var(--brand))]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      <div className="relative p-6">{children}</div>
    </div>
  );
}