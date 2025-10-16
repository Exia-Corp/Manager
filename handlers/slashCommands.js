const { REST, Routes } = require("discord.js")
const buildCommand = require("../function/buildCommands")

module.exports = async (client) => {
    const commands = client.commands.map(command => {
        return buildCommand(command)
    }).filter(Boolean)

    const rest = new REST({ version: '10' }).setToken(client.config.token)
    try {
        await rest.put(Routes.applicationCommands(client.config.clientId), { body: commands })
        console.log(`(WK-${process.pid}) [✅] » [Slashcommands] Successfully registered ${commands.length} commands.`)
    } catch (error) {
        console.error('Error updating application commands:', error)
        return
    }
}