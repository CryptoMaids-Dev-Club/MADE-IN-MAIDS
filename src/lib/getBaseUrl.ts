export const getBaseUrl = () =>
  process.env.VERCEL_URL ? `https://market.cryptomaids.tokyo` : `http://127.0.0.1:${process.env.PORT ?? 3000}`
