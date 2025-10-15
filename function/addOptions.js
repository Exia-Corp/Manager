
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
                builder.addStringOptions(opt =>
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
                builder.addIntegerOptions(opt =>
                    opt.setName(option.name)
                        .setDescription(option.description ?? '')
                        .setRequired(option.required ?? false)
                );
                break;
            case ApplicationCommandOptionType.Boolean:
                builder.addBooleanOptions(opt =>
                    opt.setName(option.name)
                        .setDescription(option.description ?? '')
                        .setRequired(option.required ?? false)
                );
                break;
            case ApplicationCommandOptionType.User:
                builder.addUserOptions(opt =>
                    opt.setName(option.name)
                        .setDescription(option.description ?? '')
                        .setRequired(option.required ?? false)
                );
                break;
            case ApplicationCommandOptionType.Channel:
                builder.addChannelOptions(opt =>
                    opt.setName(option.name)
                        .setDescription(option.description ?? '')
                        .setRequired(option.required ?? false)
                );
                break;
            case ApplicationCommandOptionType.Role:
                builder.addRoleOptions(opt =>
                    opt.setName(option.name)
                        .setDescription(option.description ?? '')
                        .setRequired(option.required ?? false)
                );
                break;
            case ApplicationCommandOptionType.Mentionable:
                builder.addMentionableOptions(opt =>
                    opt.setName(option.name)
                        .setDescription(option.description ?? '')
                        .setRequired(option.required ?? false)
                );
                break;
            case ApplicationCommandOptionType.Attachment:
                builder.addAttachmentOptions(opt =>
                    opt.setName(option.name)
                        .setDescription(option.description ?? '')
                        .setRequired(option.required ?? false)
                );
                break;
            case ApplicationCommandOptionType.Number:
                builder.addNumberOptions(opt =>
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