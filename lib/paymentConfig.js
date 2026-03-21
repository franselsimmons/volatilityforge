function env(name, fallback = "") {
  return process.env[name] || fallback;
}

export const paymentConfig = {
  wallets: {
    trc20: env("PAYMENT_WALLET_TRC20", ""),
    bep20: env("PAYMENT_WALLET_BEP20", ""),
    erc20: env("PAYMENT_WALLET_ERC20", ""),
    sol: env("PAYMENT_WALLET_SOL", ""),
  },
  support: {
    email: env("PAYMENT_SUPPORT_EMAIL", ""),
    discord: env("PAYMENT_SUPPORT_DISCORD", ""),
  },
};

export function getWalletByMethod(method) {
  const m = String(method || "").toLowerCase();

  if (m === "usdt (trc20)" || m === "trc20") return paymentConfig.wallets.trc20;
  if (m === "usdt (bep20)" || m === "bep20") return paymentConfig.wallets.bep20;
  if (m === "usdt (erc20)" || m === "erc20") return paymentConfig.wallets.erc20;
  if (m === "sol" || m === "solana") return paymentConfig.wallets.sol;

  return "";
}

export function walletsConfigured() {
  return Object.values(paymentConfig.wallets).some(Boolean);
}
