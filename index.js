const Discord = require("discord.js");
const client = new Discord.Client();
require('dotenv').config();

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
    else if (command === "sum") {
        const numArgs = args.map(x => parseFloat(x));
        const sum = numArgs.reduce((counter, x) => counter += x);
        message.reply(`The sum of all the arguments you provided is ${sum}!`);
      }
});

client.login(process.env.TOKEN);
