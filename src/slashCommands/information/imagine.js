const { SlashCommandBuilder, EmbedBuilder, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const config = require("../../config/config.json")


module.exports = {
    name: "imagine",
    description: "Generate art in your dreams!",
    options: [
        {
            name: "prompt",
            description: "Your prompt to generate the art",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: async (client, interaction, args) => {
        await interaction.deferReply()
        const prompt = interaction.options.getString("prompt")
        const Replicate = require('replicate')
        //const Replicate = (await import("replicate")).default

        const replicate = new Replicate({
            auth: config.API,
        });

        const output = await replicate.run("m1guelpf/safe-latent-diffusion:2d345271e84fecbe94f8d5ed19dc4a7af509a6b8c0c4a1d7f61c455f17cbf0c8", {
            input: {
                prompt: prompt
            }
        })

        console.log()
        
        const row = new ActionRowBuilder()
			.addComponents(
                new ButtonBuilder()
                .setLabel(`Download`)
                .setStyle(ButtonStyle.Link)
                .setURL(`${output}`),
               new ButtonBuilder()
                .setLabel(`Support Us`)
                .setStyle(ButtonStyle.Link)
                .setURL('https://paypal.me/officialrazer'))
            
        const embed = new EmbedBuilder()
        	.setTitle("**Your Prompt:**")
            .setDescription(`**${prompt}**`)
            .setImage(`${output}`)
        	.setColor('#2f3136')
        	.setFooter({ text: `Requested by: ${interaction.user.username} | ©️ Project Razer `,
                            iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
                          })

        await interaction.editReply({ embeds: [embed], components: [row] })
	    
    }
}
