const axios = require('axios')
const { EmbedBuilder, MessageFlags, ApplicationCommandOptionType, InteractionContextType } = require('discord.js')

module.exports = {
    name: 'admin',
    description: 'Commande de bot',
    context: [
        InteractionContextType.BotDM,
        InteractionContextType.Guild,
        InteractionContextType.PrivateChannel
    ],
    permissions: 'Aucune',
    options: [
        {
            name: 'show',
            description: 'Affiche les bots',
            type: ApplicationCommandOptionType.SubcommandGroup,
            options: [
                {
                    name: 'info',
                    description: 'Affiche les info d\'un bot à partir de sont id',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "id",
                            description: 'Id du bot à afficher',
                            type: ApplicationCommandOptionType.String,
                            required: true
                        }
                    ]
                },
                {
                    name: 'list',
                    description: 'Affiche la liste des bots',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: []
                }
            ]
        },
        {
            name: 'create',
            description: 'Permet au admins de créer un bot',
            type: ApplicationCommandOptionType.Subcommand,
            options: []
        },
        {
            name: 'manage',
            description: 'Gére un bot perso',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'id',
                    description: 'Id du bot à gérer',
                    type: ApplicationCommandOptionType.User,
                    required: true
                }
            ]
        }
    ],
    async execute(interaction, client) {
        const sub = interaction.options.getSubcommand()
        const group = interaction.options.getSubcommandGroup()

        if (!client.config.devId.includes(interaction.user.id)) return interaction.reply(`:x:`)

        if (group === "show") {
            if (sub === "info") {
                const botId = interaction.options.getString('id')

                try {
                    const response = await axios.get(`${client.config.api.url}/bots/admin/info/${botId}`, {
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${client.config.api.key}`
                        }
                    })

                    if (response.status === 404) return interaction.reply(`Bot not found`) 
                    
                    const data = response.data
                    
                    const embed = new EmbedBuilder()
                        .setTitle(`Information sur le bot ${botId}`)
                        .setFields(
                            { name: "Nom", value: data.botName, inline: false },
                            { name: "Type", value: data.type.charAt(0).toUpperCase() + data.type.slice(1), inline: true },
                            { name: "Status", value: data.state == 1 ? "Allumer" : "Étein", inline: true },
                            { name: '\u200B', value: '\u200B', inline: true },
                            { name: "Identifiant", value: data.botId, inline: true },
                            { name: "Propriétaire", value: `<@${data.buyerId}>`, inline: true },
                            { name: '\u200B', value: '\u200B', inline: true },
                            { name: "Date de création", value: data.createdAt.replace('T', ' ').slice(0, 19), inline: true },
                            { name: "Date d'expiration", value: data.expiresAt.replace('T', ' ').slice(0, 19), inline: true },
                            { name: '\u200B', value: '\u200B', inline: true },
                        )
                        .setFooter({ text: 'Powered by Exia Corp', iconURL: client.user.displayAvatarURL() })
                        .setColor(data.state == 1 ? 0x00ff00 : 0xff0000)
                    return interaction.reply({ embeds: [embed] })
                } catch (error) {
                    console.error(error)
                }
                return interaction.reply('Regarde la console')
            } else if (sub === "list") {
                try {
                    const response = await axios.get(`${client.config.api.url}/bots/admin/list`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${client.config.api.key}`
                        }
                    });

                    const data = response.data;

                    const desc = data.map(i => 
                        `**Nom:** ${i.botName}\n**Id:** ${i.botId}\n**Proprio:** <@${i.buyerId}>\n**Type:** ${i.type.charAt(0).toUpperCase() + i.type.slice(1)}`
                    ).join('\n\n');

                    const embed = new EmbedBuilder()
                        .setTitle('📋 Liste des bots')
                        .setDescription(desc || "⚠️ Aucun bot à afficher")
                        .setColor(0x5865F2)
                        .setTimestamp()
                        .setFooter({ text: 'Powered by Exia Corp', iconURL: client.user.displayAvatarURL() });

                    return interaction.reply({ embeds: [embed] });
                } catch (error) {
                    console.error(error);
                    return interaction.reply({ content: "❌ Impossible de récupérer la liste des bots." });
                }
            }
        }
    }
}