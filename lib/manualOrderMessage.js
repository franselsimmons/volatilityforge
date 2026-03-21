export function buildManualOrderMessage({
  planKey,
  planLabel,
  euro,
  usdt,
  discordUsername,
  email,
  paymentMethod,
  txHash,
  notes,
}) {
  return [
    "New manual order submitted",
    "",
    `Plan key: ${planKey || "-"}`,
    `Plan label: ${planLabel || "-"}`,
    `Price EUR: ${euro ?? "-"}`,
    `Price USDT: ${usdt ?? "-"}`,
    `Discord username: ${discordUsername || "-"}`,
    `Email: ${email || "-"}`,
    `Payment method: ${paymentMethod || "-"}`,
    `Transaction hash: ${txHash || "-"}`,
    `Notes: ${notes || "-"}`,
  ].join("\n");
}
