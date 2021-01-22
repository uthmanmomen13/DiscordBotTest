const Discord = require("discord.js");
require('@tensorflow/tfjs');
const toxicity = require('@tensorflow-models/toxicity');
const client = new Discord.Client();
require('dotenv').config();

client.on("message", function(message) { 
    const threshold = 0.9;
    
    const prefix = "!";                
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)){
        toxicity.load(threshold).then(model =>{
            const sentence = message.content;
            model.classify(sentence).then(predictions => {
                if(predictions[6].results[0].match) {
                    message.reply('This message contains possible toxicity. Please watch your language.')
                }
            });
        });
    } 

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
