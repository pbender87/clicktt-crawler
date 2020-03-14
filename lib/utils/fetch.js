const fetch = require('node-fetch')

module.exports = async function ({ url }) {
  const resp = await fetch(url)
  return await resp.text()
}
