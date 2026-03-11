// app/access/page.tsx
import AccessClient from "./AccessClient";

export default function AccessPage({
  searchParams,
}: {
  searchParams: { orderId?: string };
}) {
  const orderId = searchParams?.orderId || "";

  if (!orderId) {
    return (
      <div className="mx-auto max-w-2xl p-6 text-white">
        Missing orderId.
      </div>
    );
  }

  return <AccessClient orderId={orderId} />;
}