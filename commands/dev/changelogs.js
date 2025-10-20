const { Colors } = require('discord.js')
const { StringSelectMenuOptionBuilder } = require('discord.js')
const { EmbedBuilder } = require('discord.js')
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
            const embed = new EmbedBuilder()
                .setTitle('Créer un changelogs')
                .setDescription('Pour ctéer un changelog, c\'est très simple. Tout d\'abort renseigne le type du processus pour lequel tu souhaite écrire une note de mise à jours.')
                .setColor(Colors.Grey)
                .setFooter({ text: "Powered by Exia Corp", iconURL: client.user.displayAvatarURL() })

            const select = new StringSelectMenuBuilder()
                .setCustomId("changelogs_add_select")
                .setPlaceholder('Choisi ici')
                .addOptions(
                    new StringSelectMenuOptionBuilder()
                        .setLabel('API')
                        .setDescription('Permet de crée un changelogs pour l\'API')
                        .setValue('api'),
                    new StringSelectMenuOptionBuilder()
                        .setLabel('Application')
                        .setDescription('Permet de crée un changelogs pour les applications')
                        .setValue('app'),
                    new StringSelectMenuOptionBuilder()
                        .setLabel('Dashboard')
                        .setDescription('Permet de crée un changelogs pour le dashboard')
                        .setValue('dashboard'),
                    new StringSelectMenuOptionBuilder()
                        .setLabel('Documentation')
                        .setDescription('Permet de crée un changelogs pour la documentation')
                        .setValue('docs')
                )

                const row = new ActionRowBuilder().addComponents(select)
            await interaction.reply({ embeds: [embed], components: [row] })
        }
    }
}