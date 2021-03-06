const getDatesFromFloorData = (floorData, isMonth) => {
  const dates = Object.values(floorData)[0].map(({ timestamp }) => {
    if (timestamp === 'LIVE') return timestamp

    const t = new Date(timestamp)
    const month = t.getMonth()
    const day = t.getDate()

    return `${month + 1}/${day}`
  })

  if (isMonth) {
    while (dates.length < 30) dates.unshift(0)
    while (dates.length > 30) dates.shift()
  } else {
    while (dates.length < 7) dates.unshift(0)
    while (dates.length > 7) dates.shift()
  }

  return dates
}

module.exports = getDatesFromFloorData
