const { 
	ApplicationCommandOptionType,
	ChatInputCommandBuilder 
} = require('discord.js');
const addOptions = require('./addOptions');

/**
 * Build a slash command for Discord.js v15-dev
 * @param {Object} command 
 * @returns {Object} Command JSON ready to register
 */
function buildCommand(command) {
	const slashCommand = new ChatInputCommandBuilder()
		.setName(command.name)
		.setDescription(command.description)
		.setNSFW(command.nsfw ?? false);

	if (command.permissions && command.permissions !== 'Aucune')
		slashCommand.setDefaultMemberPermissions(command.permissions);

	// Ajout des options / sous-commandes
	if (command.options?.length > 0) {
		command.options.forEach(option => {
			switch (option.type) {
				case ApplicationCommandOptionType.Subcommand:
					slashCommand.addSubcommands(sub => {
						sub.setName(option.name)
							.setDescription(option.description ?? 'Aucune description.');
						if (option.options?.length)
							addOptions(sub, option.options);
						return sub;
					});
					break;

				case ApplicationCommandOptionType.SubcommandGroup:
					slashCommand.addSubcommandGroups(group => {
						group.setName(option.name)
							.setDescription(option.description ?? 'Aucune description.');
						if (option.options?.length) {
							option.options.forEach(subcommand => {
								group.addSubcommands(sub => {
									sub.setName(subcommand.name)
										.setDescription(subcommand.description ?? 'Aucune description.');
									if (subcommand.options?.length)
										addOptions(sub, subcommand.options);
									return sub;
								});
							});
						}
						return group;
					});
					break;

				default:
					addOptions(slashCommand, [option]);
					break;
			}
		});
	}

	return slashCommand.toJSON();
}

module.exports = buildCommand;