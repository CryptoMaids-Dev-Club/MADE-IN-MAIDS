export const getBaseUrl = () =>
  process.env.VERCEL_URL ? `https://market.cryptomaids.tokyo` : `http://localhost:${process.env.PORT ?? 3000}`
