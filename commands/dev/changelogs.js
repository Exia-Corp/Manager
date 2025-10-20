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
            
            await interaction.showModal(modal)
        }
    }
}