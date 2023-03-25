const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const client = require('../../../index');

module.exports = {
    name: "interactionCreate"
};

client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;
    if (!interaction.type == 2) return;

    const command = client.slash.get(interaction.commandName);

    if (!command) return;

    try {
        if (command.ownerOnly) {
            if (!config.OWNER.includes(interaction.member.id)) {
                interaction.reply({
                    content: `**${interaction.member}** You can't access owner commands`,
                    ephemeral: true
                })
                return false;
            }
        }

        if (command.userPermissions) {
            if (!interaction.member.permissions.has(PermissionsBitField.resolve(command.userPermissions || []))) return interaction.reply({
                content: `${interaction.member} You don't have the required permissions to use this command -> \`${command.userPermissions || []}\``,
                ephemeral: true
            })
            return false;
        }

        if (command.botPermissions) {
            if (!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(command.botPermissions || []))) return interaction.reply({
                content: `${interaction.member} I don't have the required permissions to use this command -> \`${command.botPermissions || []}\``,
                ephemeral: true
            })
            return false;
        }

        await command.run(client, interaction, interaction.options)
    } catch (err) {
        console.log(err);
    }
})

// ©️ Copyright Project Razer LLC 2023 All Rights Reserved.
// Credits: @sandarutharuneth, @oelin
// License: MIT
