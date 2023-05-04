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
        const Replicate = (await import("replicate")).default

        const replicate = new Replicate({
            auth: config.API,
        });

        const output = await
        replicate.run("prompthero/openjourney:9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb", {
            input: {
                prompt: prompt
            }
        })
	
	if (interaction.channel.nsfw === true) {
        
        const row = new ActionRowBuilder()
			.addComponents(
                new ButtonBuilder()
                .setLabel(`Download`)
                .setStyle(ButtonStyle.Link)
                .setURL(output)
                .setEmoji('1083007659457912852'),
               new ButtonBuilder()
                .setLabel(`Support Us`)
                .setStyle(ButtonStyle.Link)
                .setURL('https://paypal.me/officialrazer')
                .setEmoji('1083016028369453199'))
            
        const embed = new EmbedBuilder()
        	.setTitle("**Your Prompt:**")
            .setDescription(`**${prompt}**`)
            .setImage(output)
        	.setColor('#2f3136')
        	.setFooter({ text: `Requested by: ${interaction.user.username} | ©️ Project Razer `,
                            iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
                          })

        await interaction.editReply({ embeds: [embed], components: [row] })
	    
	    }else {

            const nsfw = new EmbedBuilder()
	    	.setTitle('Warning')
            	.setDescription('\`\`\`fix\n[ Must be a Age Restricted channel to function ]\n\`\`\`')
        	.setColor('#2f3136')

          await interaction.editReply({ embeds: [nsfw] })
           }
    }
}
