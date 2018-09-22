const Discord = require("discord.js");
const config = require("./authbeta.json");
const client = new Discord.Client();
const {promisify} = require('util');
const readdir = promisify(require("fs").readdir);

const Enmap = require("enmap");

client.commands = new Enmap();
client.aliases = new Enmap();

client.loadCommand = (commandName) => {
try {
  console.log(`Loading Command: ${commandName}`);
  const props = require(`./commands/${commandName}`);
  if (props.init) {
    props.init(client);
  }
  client.commands.set(props.conf.name, props);
  props.conf.aliases.forEach(alias => {
    client.aliases.set(alias, props.conf.name);
  });
  return false;
} catch (e) {
  return `Unable to load command ${commandName}: ${e}`;
}
};

const init = async () => {

    const cmdFiles = await readdir("./commands/");
    console.log(`Loading a total of ${cmdFiles.length} commands.`);
    cmdFiles.forEach(f => {
        if (!f.endsWith(".js")) return;
        const response = client.loadCommand(f);
        if (response) console.log(response);
    });


    client.on("ready", () => {
        console.log("DeathReapers Bot is up");
    });


    client.on("message", message => {
        if (message.author.bot) return;
        const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
        if (message.content.match(prefixMention)) {
            return message.reply(`Utilise \`${config.prefix}\` pour me parler`);
        }
        if (message.content.indexOf(config.prefix) !== 0) return;

        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
        console.log("cmd : "+command)
        if (!cmd) return;
        cmd.run(client, message, args);

    });

    client.login(config.token);
};

init();