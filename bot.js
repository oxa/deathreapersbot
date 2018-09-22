const Discord = require("discord.js");
const config = require("./authbeta.json");
const client = new Discord.Client();

client.on("ready", () => {
    console.log("DeathReapers Bot is up");
});


client.on("message", message => {
  if (message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    console.error(err);
    message.author.send("Heu... je sens que tu veux me dire quelque chose mais tu galères... Tapes : !help pour avoir un coups de mains");
  }
});

client.login(config.token);