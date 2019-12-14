module.exports = {
  sanitizeObjectQuotes: obj => Object.entries(obj)
    .reduce((acc, curr) => {
      const [key, value] = curr
      if (typeof value === 'string') {
        acc[key] = value.replace(/['"]+/g, '')
      } else {
        acc[key] = value
      }
      return { ...acc }
    }, {}),
  sanitizeLineBreaks: obj => Object.entries(obj)
    .reduce((acc, curr) => {
      const [key, value] = curr
      if (typeof value === 'string') {
        acc[key] = value.replace(/(\r\n|\n|\r)/gm, '')
      } else {
        acc[key] = value
      }
      return { ...acc }
    }, {}),
}
