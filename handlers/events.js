const path = require('path')
const loadEvent = require('../function/loadEvent')

module.exports = async (client) => {
    const eventDir = path.join(__dirname, '../events')
    loadEvent(eventDir, client)
}