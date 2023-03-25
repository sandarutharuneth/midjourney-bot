const client = require('../../index');
const config = require("../config/config.json");
const { REST, Routes } = require('discord.js');
const fs = require('fs')
const colors = require('colors');

module.exports = async () => {
    console.log("----------------------------------------".yellow);

    const slash = [];

    fs.readdirSync('./src/slashCommands/').forEach(dir => {
        const commands = fs.readdirSync(`./src/slashCommands/${dir}`).filter(file => file.endsWith('.js'));
        for (let file of commands) {
            let pull = require(`../slashCommands/${dir}/${file}`);

            if (pull.name) {
                slash.push(pull)
                client.slash.set(pull.name, pull);
                console.log(`[HANDLER -  SLASH] Loaded a file : ${pull.name}`.green);

            } else {
                console.log(`[HANDLER - SLASH] Couldn't load the file ${file}, missing module name value.`.red)
                continue;
            }
        }
    });

    if (!config.CLIENTID) {
        console.log("[CRUSH] You have to provide your client ID in config file".red + "\n");
        return process.exit()
    };

    const rest = new REST({ version: '10' }).setToken(config.TOKEN);

    await rest.put(
        Routes.applicationCommands(config.CLIENTID),
        { body: slash }
    ).then(() => {
        console.log("----------------------------------------".magenta);
        console.log(`[HANDLER - SLASH] Slash commands has been registered successfully to all the guilds`.magenta.bold);
        console.log("----------------------------------------".magenta);
    })
}


// ©️ Copyright Project Razer LLC 2023 All Rights Reserved.
// Credits: @sandarutharuneth, @oelin
// License: MIT
