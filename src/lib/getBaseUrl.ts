export const getBaseUrl = () =>
  process.env.VERCEL_URL ? `https://made-in-maids.vercel.app` : `http://127.0.0.1:${process.env.PORT ?? 3000}`
