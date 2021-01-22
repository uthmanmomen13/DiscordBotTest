const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();

client.on("message", function(message) { 
    const prefix = "!";                
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(1);
    const args = commandBody.split(' ');
    
    const command = args.shift().toLowerCase();
    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    }
});

client.login(config.BOT_TOKEN);