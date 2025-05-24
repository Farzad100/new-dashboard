export const convertUtcToLocalTime = utcTimestamp => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const utcDate = new Date(utcTimestamp)
  const options = { timeZone: userTimeZone, hour12: false }

  return utcDate
    .toLocaleString(undefined, options)
    .replace(/\s/g, '')
    .replace(',', ' - ')
}
