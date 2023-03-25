require('./src/console/watermark')
const { Client, Partials, Collection } = require('discord.js');
const colors = require('colors');
const config = require('./src/config/config.json')

const client = new Client({
    intents: [
        "Guilds",
        "GuildMessages",
        "GuildPresences",
        "GuildMessageReactions",
        "DirectMessages",
        "MessageContent",
        "GuildVoiceStates"
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
        Partials.Reaction
    ]
})

if (!config.TOKEN) {
    console.log("[WARN] Token for discord bot is required! put your token in config file".yellow.bold + "\n")
    return process.exit();
};

client.commands = new Collection()
client.events = new Collection()
client.slash = new Collection()
client.aliases = new Collection()
client.config = require("./src/config/config.json")

module.exports = client;

["event", "slash"].forEach(file => {
    require(`./src/handlers/${file}`)(client);
});

client.login(config.TOKEN)
    .catch((err) => {
        console.log("[CRUSH] Something went wrong while connecting to your bot" + "\n");
        console.log("[CRUSH] Error from DiscordAPI :" + err);
        process.exit();
    })

process.on("unhandledRejection", async (err) => {
    console.log(`[ANTI - CRUSH] Unhandled Rejection : ${err}`.red.bold)
})


// ©️ Copyright Project Razer LLC 2023 All Rights Reserved.
// Credits: @sandarutharuneth, @oelin
// License: MIT
