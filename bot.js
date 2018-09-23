const Discord = require("discord.js");
const config = require("./config.json");
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
        if (client.user.id==="491592769588953088"){
            console.log("DeathReapers Beta is UP")
        } else {
            console.log("DeathReapers Prod is UP")
        }
        try {
            client.users.get("121522123910021120").send("I'm Back !");
            client.user.setActivity('!help pour me parler', { type: 'WATCHING' });
        }
        catch(error) {
            console.error(error);

        }
    });


    client.on("message", message => {
        if (message.author.bot) return;
        //TODO:review usage of this block
        const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
        if (message.content.match(prefixMention)) {
            return message.reply(`Utilise \`${config.prefix}\` pour me parler`);
        }
        // end of block
        if (message.content.indexOf(config.prefix) !== 0) return;

        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        console.log(message.author.username+" : "+message.content)

        const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
        if (!cmd) {
            message.author.send("Heu... je sens que tu veux me dire quelque chose mais tu galères... Tape : !help pour avoir un coup de main");
            return;
        }
        cmd.run(client, message, args);

    });
    client.on('error', console.error);

    client.login(process.env.BOT_TOKEN);
};

init();