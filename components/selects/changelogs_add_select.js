const { Colors } = require("discord.js");
const { EmbedBuilder } = require("discord.js")

module.exports = {
    customId: "changelogs_add_select",
    async execute(interaction, client) {

        console.log({
            type: interaction.type,
            customId: interaction.customId,
            isStringSelectMenu: interaction.isStringSelectMenu?.(),
            values: interaction.values
        });
        
        const value = interaction.values[0]

        const embed = new EmbedBuilder()
            .setTitle('Création de changelogs pour ' + value)
            .setDescription(`Maintenant que vous avez choisi le processus ${value}, vous devez maintenenant compléter des informations supplémentaire. Pour ce faire, vous pouvez dès à présent cliquer sur le bouton ci-dessous qui vous ouvrira un formulaire pour compléter les information demander.`)
            .setColor(Colors.Grey)

        if (value === "api") {
        } else if (value === "app") {

        } else if (value === "dashboard") {

        } else (value === "docs")

        interaction.update({ embeds: [embed], components: [] })
    }
}