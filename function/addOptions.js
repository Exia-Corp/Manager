
/**
 * 
 * @param {Object} builder
 * @param {Object} options
 */

const { ApplicationCommandOptionType } = require("discord.js");

function addOptions(builder, options) {
    options.forEach(option => {
        if (
            option.type === ApplicationCommandOptionType.Subcommand ||
            option.type === ApplicationCommandOptionType.SubcommandGroup
        ) return; 

        switch (option.type) {
            case ApplicationCommandOptionType.String:
                builder.addStringOption(opt =>
                    opt.setName(option.name)
                        .setDescription(option.description ?? '')
                        .setRequired(option.required ?? false)
                        .setAutocomplete(option.autocomplete ?? false)
                        .addChoices(option.choices?.map(choice => ({
                            name: choice.name,
                            value: choice.value
                        })) ?? [])
                );
                break;
            case ApplicationCommandOptionType.Integer:
                builder.addIntegerOption(opt =>
                    opt.setName(option.name)
                        .setDescription(option.description ?? '')
                        .setRequired(option.required ?? false)
                );
                break;
            case ApplicationCommandOptionType.Boolean:
                builder.addBooleanOption(opt =>
                    opt.setName(option.name)
                        .setDescription(option.description ?? '')
                        .setRequired(option.required ?? false)
                );
                break;
            case ApplicationCommandOptionType.User:
                builder.addUserOption(opt =>
                    opt.setName(option.name)
                        .setDescription(option.description ?? '')
                        .setRequired(option.required ?? false)
                );
                break;
            case ApplicationCommandOptionType.Channel:
                builder.addChannelOption(opt =>
                    opt.setName(option.name)
                        .setDescription(option.description ?? '')
                        .setRequired(option.required ?? false)
                );
                break;
            case ApplicationCommandOptionType.Role:
                builder.addRoleOption(opt =>
                    opt.setName(option.name)
                        .setDescription(option.description ?? '')
                        .setRequired(option.required ?? false)
                );
                break;
            case ApplicationCommandOptionType.Mentionable:
                builder.addMentionableOption(opt =>
                    opt.setName(option.name)
                        .setDescription(option.description ?? '')
                        .setRequired(option.required ?? false)
                );
                break;
            case ApplicationCommandOptionType.Attachment:
                builder.addAttachmentOption(opt =>
                    opt.setName(option.name)
                        .setDescription(option.description ?? '')
                        .setRequired(option.required ?? false)
                );
                break;
            case ApplicationCommandOptionType.Number:
                builder.addNumberOption(opt =>
                    opt.setName(option.name)
                        .setDescription(option.description ?? '')
                        .setRequired(option.required ?? false)
                );
                break;
            default:
                throw new Error(`Type d'option "${option.type}" non supporté pour l'option "${option.name}".`);
        }
    });
}

module.exports = addOptions