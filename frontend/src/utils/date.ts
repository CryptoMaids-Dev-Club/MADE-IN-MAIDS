export const unixToDate = (unix: number) => {
  return {
    utcTime: new Date(unix * 1000).toLocaleString('en-US'),
    jstTime: new Date(unix * 1000).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }),
  }
}
