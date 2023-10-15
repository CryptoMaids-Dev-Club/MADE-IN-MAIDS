export const getBaseUrl = () => console.log(`https://${process.env.VERCEL_URL}`)
process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://localhost:${process.env.PORT ?? 3000}`
