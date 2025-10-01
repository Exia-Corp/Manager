const path = require('path')
const loadCommand = require('../function/loadCommands')

module.exports = (client) => {
    const commandDir = path.join(__dirname, '../commands')
    loadCommand(commandDir, client)
}