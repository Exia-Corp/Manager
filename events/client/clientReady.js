const { Events, EmbedBuilder } = require('discord.js')
const WebSocket = require('ws')

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {

        const ws = new WebSocket(client.config.websocket)

        ws.on('message', async (msg) => {
            try {
                const { event, data } = JSON.parse(msg.toString())
                if (event === "newPrevname") {
                    console.log(`(WK-${process.pid}) [📥] » [WebSocket] Nouveau prevname reçus:`, data)
                    const embed = new EmbedBuilder()
                        .setTitle(`Nouveau prevname enregistrer`)
                        .addFields(
                            { name: 'Ancien nom d\'utilisateur', value: data.oldUsername || 'N/A', inline: true },
                            { name: 'Nouveau nom d\'utilisateur', value: data.newUsername || 'N/A', inline: true },
                            { name: '\u200B', value: '\u200B', inline: true },
                            { name: 'Ancien nom d\'affichage', value: data.oldDisplayName || 'N/A', inline: true },
                            { name: 'Nouveau nom d\'affichage', value: data.newDisplayName || 'N/A', inline: true },
                            { name: '\u200B', value: '\u200B', inline: true },
                            { name: 'Date', value: data.updateAt || 'N/A', inline: true },
                            { name: '\u200B', value: '\u200B', inline: true }
                        )
                        .setTimestamp()
                        .setFooter({ text: 'Exia France', iconURL: client.user.displayAvatarURL() })                    
                    const channel = client.channels.cache.get('1316821567153377361')
                    if (channel) {
                        await channel.send({ embeds: [embed] })
                    } else {
                        console.warn(`(WK-${process.pid}) [⚠️] » [WebSocket] Impossible de trouver le channel pour envoyer le prevname.`);
                    }
                }
            } catch (error) {
                console.warn(`(WK-${process.pid}) [❌] » [WebSocket] Erreur WS prevname:`, error);
            }
        })

        ws.on('close', () => console.log(`(WK-${process.pid}) [⚠️] » [WebSocket] Connexion fermée`))
        ws.on('error', (err) => console.log(`(WK-${process.pid}) [❌] » [WebSocket] Erreur websocket :`, err.stack))

        console.log(`(WK-${process.pid}) [✅] » [Ready] ${client.user.displayName} est connecter`)
    }
}