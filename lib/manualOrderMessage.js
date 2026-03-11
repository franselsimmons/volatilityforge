import { getPlanBySlug } from "./siteData.js";

export function formatManualOrderDiscordMessage(order) {
  const plan = getPlanBySlug(order.plan) || { name: order.plan };
  return [
    `💸 **New manual payment request**`,
    `Plan: ${plan.name}`,
    `Discord: ${order.discordUsername}`,
    `Email: ${order.email || "-"}`,
    `Payment method: ${order.paymentMethod}`,
    `Expected amount: ${order.expectedAmount}`,
    `Reference: ${order.reference}`,
    `TX Hash: ${order.txHash || "-"}`,
    `Notes: ${order.notes || "-"}`,
    `Created: ${new Date(order.createdAt).toISOString()}`,
  ].join("\n");
}