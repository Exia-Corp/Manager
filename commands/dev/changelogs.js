const { 
    TextInputBuilder, 
    TextInputStyle, 
    StringSelectMenuBuilder, 
    ModalBuilder, 
    ActionRowBuilder 
} = require('discord.js')

module.exports = {
    name: 'changelogs',
    description: 'commande de changelogs',
    permissions: 'Aucune',
    dm: true,
    options: [
        {
            name: 'ajouter',
            description: 'Ajouter une note de mise à jour',
            type: 'subcommand',
            options: []
        }
    ],
    async execute(interaction, client) {
        const sub = interaction.options.getSubcommand(false)

        if (sub === "ajouter") {
            const modal = new ModalBuilder()
                .setCustomId('changelogs_modals')
                .setTitle('Ajouter un changelog')
            
            const title = new TextInputBuilder()
                .setStyle(TextInputStyle.Short)
                .setCustomId('changelogs_title')
                .setRequired(true)
                .setLabel('Titre de la mise à jour')

            const version = new TextInputBuilder()
                .setCustomId('changelogs_version')
                .setLabel('Version')
                .setRequired(true)
                .setStyle(TextInputStyle.Short)

            const type = new StringSelectMenuBuilder()
                .setCustomId('changelogs_type')
                .addOptions(
                    { label: 'Application', value: 'app' },
                    { label: 'API', value: 'api' },
                    { label: 'Documentation', value: 'doc' },
                    { label: 'Dashboard', value: 'dash' }
                )

            const level = new StringSelectMenuBuilder()
                .setCustomId('changelogs_level')
                .addOptions(
                    { label: 'Major', value: 'major' },
                    { label: 'Minor', value: 'minor' }
                )

            const text = new TextInputBuilder()
                .setCustomId('changelogs_text')
                .setRequired(true)
                .setStyle(TextInputStyle.Paragraph)
                .setLabel('Description de la mise à jour')

            modal.addComponents(
                new ActionRowBuilder().addComponents(title),
                new ActionRowBuilder().addComponents(version),
                new ActionRowBuilder().addComponents(type),
                new ActionRowBuilder().addComponents(level),
                new ActionRowBuilder().addComponents(text)
            )

            await interaction.showModal(modal)
        }
    }
}