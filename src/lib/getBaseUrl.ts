export const getBaseUrl = () =>
  process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://market.cryptomaids.tokyo`
    : `http://localhost:${process.env.PORT ?? 3000}`
